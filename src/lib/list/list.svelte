<script lang="ts" context="module">
	import type { listField } from './_listField.svelte';
	import type { listAction } from './_listAction.svelte';
	import type { listDetailAction } from './_listDetailAction.svelte';

	export type list = {
		fields: listField[];
		actions?: listAction[];
		detailActions?: listDetailAction[];
		cancelled?: (meta: unknown, item: { [key: string]: any }) => boolean;
		completed?: (meta: unknown, item: { [key: string]: any }) => boolean;
	};
</script>

<script lang="ts">
	import { toast } from '../util/toast.svelte';
	import ListField, { listFieldValue } from './_listField.svelte';
	import ListAction from './_listAction.svelte';
	import ListDetailAction from './_listDetailAction.svelte';
	import Button from '../widget/button.svelte';
	import ButtonText from '../widget/buttonText.svelte';
	import Icon from '../widget/icon.svelte';

	export let definition: list;
	export let meta: unknown = null;
	export let items: { [key: string]: any }[];
	export let pageSize: number = 50;
	export let disabled: boolean = false;

	let pageCurrent: number = 0;
	let showAll: boolean = false; // show completed and cancelled items
	let filter: boolean = false;
	let filterText: string = '';
	let filterItems: { [key: string]: any }[] = [];
	let filterInput: HTMLInputElement | null = null;
	let currentItems: { [key: string]: any }[] = [];

	$: currentUpdate(pageCurrent, pageSize);
	const currentUpdate = (pageCurrent: number, pageSize: number): void => {
		currentItems = filterItems.slice(pageCurrent * pageSize, pageCurrent * pageSize + pageSize);
	};

	$: filterUpdate(items, filterText, showAll);
	const filterUpdate = (
		items: { [key: string]: any }[],
		filterText: string,
		showAll: boolean
	): void => {
		pageCurrent = 0;
		filterItems = items;

		// filter based on showAll
		if (!showAll) {
			if (definition.completed) {
				filterItems = filterItems.filter((x) => {
					if (!definition.completed) return true;
					return !definition.completed(meta, x);
				});
			}
			if (definition.cancelled) {
				filterItems = filterItems.filter((x) => {
					if (!definition.cancelled) return true;
					return !definition.cancelled(meta, x);
				});
			}
		}

		// filter based on filterText
		const s = filterText.toLocaleLowerCase().trim();
		if (s) {
			filterItems = filterItems.filter((x) => {
				for (const h of definition.fields) {
					const v = listFieldValue(h, meta, x).toLocaleLowerCase();
					if (v.indexOf(s) > -1) return true;
				}
				return false;
			});
		}

		currentUpdate(pageCurrent, pageSize);
	};

	const copyToClipboard = () => {
		let data = filterText ? `Filter Text: "${filterText}"\n` : '';
		data +=
			definition.fields.map((x) => x.label).join('\t') +
			(showAll && definition.cancelled ? '\tCancelled' : '') +
			(showAll && definition.completed ? '\tCompleted' : '') +
			'\n';
		for (const i of filterItems) {
			let first = true;
			for (const f of definition.fields) {
				if (!first) data += '\t';
				first = false;
				data += listFieldValue(f, meta, i);
			}
			if (showAll && definition.cancelled) {
				data += '\t' + (definition.cancelled(meta, i) ? 'Y' : '');
			}
			if (showAll && definition.completed) {
				data += '\t' + (definition.completed(meta, i) ? 'Y' : '');
			}
			data += '\n';
		}
		navigator.clipboard.writeText(data);
		toast.add('Copied list to clipboard', 'blue');
	};

	$: visibleFields = definition.fields.filter((x) => !x.hide || !x.hide(meta));
	$: visibleActions = (definition.actions ?? []).filter((x) => !x.hide || !x.hide(meta));
</script>

<div class="w-full">
	<table class="w-full">
		<tr class="bg-stone-200 dark:bg-stone-800">
			{#each visibleFields as f}
				<td class="font-semibold px-1 w-screen border border-stone-300 dark:border-stone-700">
					<div
						class="w-full
              {f.align == 'center'
							? 'text-center'
							: f.align == 'right'
							? 'text-right'
							: 'text-left'}
            "
					>
						{f.label}
					</div>
				</td>
			{/each}
			<td class="border border-stone-300 dark:border-stone-700">
				<div class="flex justify-end">
					{#each visibleActions as a}
						<ListAction definition={a} {meta} {disabled} />
					{/each}
					{#if definition.cancelled || definition.completed}
						<div class="border-l border-transparent">
							<Button on:click={() => (showAll = !showAll)} {disabled} compact square>
								<div class="py-0.5 px-1">
									<Icon key={showAll ? 'eye-slash' : 'eye'} />
								</div>
							</Button>
						</div>
					{/if}
					<div class="relative border-l border-transparent">
						<Button
							on:click={() => {
								filter = !filter;
								if (filter) {
									setTimeout(() => {
										filterInput?.focus();
									}, 2);
								} else {
									filterText = '';
								}
							}}
							{disabled}
							square
							compact
						>
							<div class="py-0.5 px-1">
								<Icon key="funnel" />
							</div>
						</Button>
						<div
							class="absolute -right-1 bottom-7 flex items-center p-0.5
                {filter && !disabled ? 'block' : 'hidden'}
                rounded border bg-white dark:bg-stone-800 border-stone-500
              "
						>
							<label class="flex items-center">
								<Icon key="funnel" />
								<input
									class="mx-0.5 p-0.5 w-32 bg-white dark:bg-stone-800
                    border-stone-600 dark:border-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700
                    invalid:border-red-600 dark:invalid:border-red-400
                  "
									type="text"
									placeholder="Filter..."
									bind:value={filterText}
									bind:this={filterInput}
								/>
							</label>
							<ButtonText
								on:click={() => {
									filter = false;
									filterText = '';
								}}
								compact
								square="left"
							>
								<div class="py-1">
									<Icon key="x-mark" />
								</div>
							</ButtonText>
						</div>
					</div>
					<div class="border-l border-transparent">
						<Button on:click={copyToClipboard} color="blue" {disabled} compact square>
							<div class="py-0.5 px-1">
								<Icon key="clipboard" />
							</div>
						</Button>
					</div>
				</div>
			</td>
		</tr>
		{#each currentItems as i, idx}
			<tr
				class="
          {idx % 2 == 0 ? 'bg-white dark:bg-black' : 'bg-stone-100 dark:bg-stone-950'}
          {definition.completed && definition.completed(meta, i)
					? 'text-lime-600 dark:text-lime-400'
					: ''}
          {definition.cancelled && definition.cancelled(meta, i)
					? 'text-red-600 dark:text-red-400 line-through'
					: ''}
        "
			>
				{#each visibleFields as f}
					<td class="px-1 border border-stone-300 dark:border-stone-700">
						<div
							class="flex w-full
                {f.align == 'center'
								? 'justify-center'
								: f.align == 'right'
								? 'justify-end'
								: 'justify-start'}
              "
						>
							<ListField definition={f} {meta} item={i} />
						</div>
					</td>
				{/each}
				<td class="border border-stone-300 dark:border-stone-700">
					<div class="flex justify-end">
						{#each definition.detailActions ?? [] as a}
							{#if !a.hide || !a.hide(meta, i)}
								<ListDetailAction definition={a} {meta} item={i} {disabled} />
							{/if}
						{/each}
					</div>
				</td>
			</tr>
		{:else}
			<tr>
				<td
					colspan={visibleFields.length + 1}
					class="border border-stone-300 dark:border-stone-700 text-stone-500 text-center"
				>
					No items to display
				</td>
			</tr>
		{/each}
	</table>
	<div
		class="
    flex flex-wrap justify-center items-center p-0.5 text-sm rounded-b bg-stone-200 dark:bg-stone-800
    border-x border-b border-stone-300 dark:border-stone-700
  "
	>
		<div class="px-0.5">
			<ButtonText
				on:click={() => (pageCurrent -= 1)}
				disabled={pageCurrent == 0}
				color="blue"
				compact
			>
				<Icon key="chevron-left" />
			</ButtonText>
		</div>
		<div class="px-1">Page</div>
		{#each [...Array(Math.ceil(filterItems.length / pageSize)).keys()] as p}
			<div class="px-0.5">
				{#if pageCurrent == p}
					<div
						class="px-1.5 py-0.5 font-semibold rounded
              bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10
            "
					>
						{p + 1}
					</div>
				{:else}
					<ButtonText on:click={() => (pageCurrent = p)} color="blue" compact>
						<div class="px-1.5 py-0.5">{p + 1}</div>
					</ButtonText>
				{/if}
			</div>
		{/each}
		<div class="px-0.5">
			<ButtonText
				on:click={() => (pageCurrent += 1)}
				disabled={pageCurrent > filterItems.length / pageSize - 1}
				color="blue"
				compact
			>
				<Icon key="chevron-right" />
			</ButtonText>
		</div>
	</div>
</div>
