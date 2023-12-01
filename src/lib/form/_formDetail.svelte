<script lang="ts" context="module">
	import type { formDetailField } from './_formDetailField.svelte';
	import type { formAction } from './_formAction.svelte';
	import type { formDetailAction } from './_formDetailAction.svelte';

	export type formDetail = {
		type: 'detail';
		key: string;
		title?: string;
		fields: formDetailField[];
		totals?: {
			[key: string]: (meta: unknown, doc: unknown) => unknown;
		}[];
		actions?: formAction[];
		detail_actions?: formDetailAction[];
		fixed?: (meta: unknown, doc: unknown) => boolean;
		hide?: (meta: unknown, doc: unknown) => boolean;
	};
</script>

<script lang="ts">
	import { toast } from '../util/toast.svelte';
	import FormAction from './_formAction.svelte';
	import FormDetailAction from './_formDetailAction.svelte';
	import FormDetailField from './_formDetailField.svelte';
	import ButtonText from '../widget/buttonText.svelte';
	import Icon from '../widget/icon.svelte';

	export let definition: formDetail;
	export let meta: unknown;
	export let doc: { [key: string]: any };
	export let disabled: boolean;

	$: init(definition);
	const init = (def: formDetail) => {
		if (def.type == 'detail') {
			if (!doc[def.key]) doc[def.key] = [];
			if (!disabled && (!def.fixed || !def.fixed(meta, doc))) {
				if (!Array.isArray(doc[def.key])) {
					toast.add('Form definition error', 'red');
				} else {
					if (doc[def.key].length == 0) doc[def.key].push({});
					const lastRow = doc[def.key][doc[def.key].length - 1];
					let empty = true;
					for (const i in lastRow) {
						if (lastRow[i]) empty = false;
					}
					if (!empty) doc[def.key].push({});
				}
			}
		}
		doc = doc;
	};

	$: fixed = disabled || (definition.fixed && definition.fixed(meta, doc));
	$: fields = definition.fields.filter((x) => !x.hide || !x.hide(meta, doc));
	$: detailActions = (definition.detail_actions ?? []).filter((x) => !x.hide || !x.hide(meta, doc));

	const removeItem = (index: number) => {
		doc[definition.key].splice(index, 1);
		doc = doc;
	};
</script>

<div class="flex justify-between w-full border-t border-stone-500">
	<div class="text-lg font-semibold p-1">{definition.title || ''}</div>
	<div class="flex">
		{#each definition.actions ?? [] as a}
			{#if !disabled || a.no_disable}
				{#if !(a.hide && a.hide(meta, doc))}
					<FormAction definition={a} />
				{/if}
			{/if}
		{/each}
	</div>
</div>
<table class="w-full">
	<tr>
		{#if !fixed}
			<td class="w-7">&nbsp;</td>
		{/if}
		{#each detailActions as a}
			<td class="w-7">&nbsp;</td>
		{/each}
		{#each fields as f}
			<td class="px-1">
				<div
					class="flex font-semibold
            {f.align == 'center'
						? 'justify-center'
						: f.align == 'right'
						? 'justify-end'
						: 'justify-start'}
          "
				>
					{f.label}
					{#if !f.label}&nbsp;{/if}
				</div>
			</td>
		{/each}
	</tr>
	{#each doc[definition.key] ?? [] as r, i}
		<tr>
			{#if !fixed}
				<td>
					{#if i == doc[definition.key].length - 1 || disabled}
						&nbsp;
					{:else}
						<div class="flex justify-center">
							<ButtonText compact on:click={() => removeItem(i)} color="red" {disabled}>
								<div class="py-1 rounded border border-stone-500">
									<Icon key="minus" />
								</div>
							</ButtonText>
						</div>
					{/if}
				</td>
			{/if}
			{#each detailActions as a}
				<td>
					<FormDetailAction definition={a} {meta} bind:doc bind:item={r} {disabled} />
				</td>
			{/each}
			{#each fields as f}
				<td>
					<FormDetailField
						definition={f}
						sectionKey={definition.key}
						index={i}
						{meta}
						{disabled}
						{fixed}
						bind:doc
						bind:item={r}
					/>
				</td>
			{/each}
		</tr>
	{/each}
	{#each definition.totals ?? [] as r}
		<tr>
			{#if !fixed}
				<td class="w-7">&nbsp;</td>
			{/if}
			{#each detailActions as a}
				<td class="w-7">&nbsp;</td>
			{/each}
			{#each fields as f}
				<td>
					<div
						class="px-1 font-semibold
              {f.align == 'right'
							? 'text-right'
							: f.align == 'center'
							? 'text-center'
							: 'text-left'}
          "
					>
						{#if r[f.key]}
							{r[f.key](meta, doc)}
						{:else}
							&nbsp;
						{/if}
					</div>
				</td>
			{/each}
		</tr>
	{/each}
</table>