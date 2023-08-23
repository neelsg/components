<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './icon.svelte';
	import Popup from './popup.svelte';
	import Input from './input.svelte';

	export let value: string = '';
	export let label: string | null = null;
	export let name: string | null = null;
	export let align: 'left' | 'center' | 'right' = 'left';
	export let labelSize: number = 50.0;
	export let placeholder: string | null = null;
	export let options: string[] | string[][];
	export let validate: boolean = true;
	export let form: string | null = null;
	export let required: boolean = false;
	export let disabled: boolean = false;
	export let used: string[] = [];
	export let upper: boolean = false;

	const dispatch = createEventDispatcher();

	let listOpen: () => void;
	let listClose: () => void;

	const click = (option: string | string[]) => {
		value = typeof option == 'string' ? option : option[0];
		listClose();
		setTimeout(() => dispatch('input'), 1);
	};

	$: datalistId = 'dl_' + (Math.random() * 1000000000).toFixed(0);

	let element: HTMLInputElement;

	$: updated(value);
	const updated = (value: string) => {
		if (!value || !validate) {
			element?.setCustomValidity('');
			return;
		}
		if (options.map((x) => x[0]).includes(value)) {
			if (used.includes(value)) {
				element?.setCustomValidity('This value was already used elsewhere.');
				return;
			}
			element?.setCustomValidity('');
			return;
		}
		element?.setCustomValidity('Please select a valid entry from the list.');
	};

	const input = () => {
		setTimeout(() => {
			if (upper) {
				value = value.toLocaleUpperCase();
			}
			dispatch('input');
		}, 1);
	};

	let filterText = '';
	const filter = (option: string | string[], filter: string): boolean => {
		if (typeof option == 'string') {
			if (used.includes(option)) return false;
		} else if (used.includes(option[0])) {
			return false;
		}
		const s = filter.toLocaleLowerCase();
		if (!s) return true;
		if (typeof option == 'string') {
			return option.toLocaleLowerCase().includes(s);
		}
		for (const col of option) {
			if (col.toLocaleLowerCase().indexOf(s) > -1) return true;
		}
		return false;
	};

	let windowWidth: number = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<label class="w-full flex flex-col sm:flex-row items-start sm:items-center">
	{#if label}
		<div style="width: {windowWidth < 640 ? 100 : labelSize}%" class="pt-1 sm:pr-1 sm:pb-1">
			{label}
		</div>
	{/if}
	<fieldset
		class="flex w-full rounded border transition-colors
    {disabled
			? 'border-stone-400 dark:border-stone-700 text-stone-600 dark:text-stone-400'
			: 'border-stone-900 dark:border-stone-200 text-black dark:text-white'}
    {disabled ? 'bg-transparent' : 'bg-white dark:bg-stone-800'}
    invalid:border-red-600 dark:invalid:border-red-400
  "
	>
		<input
			on:input={input}
			class="p-1 w-full rounded-l
        {align == 'center' ? 'text-center' : align == 'right' ? 'text-right' : 'text-left'}
        {disabled
				? 'bg-transparent'
				: 'bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700'}
      "
			type="text"
			id={name}
			{name}
			{required}
			{disabled}
			{placeholder}
			{form}
			list={datalistId}
			bind:value
			bind:this={element}
		/>
		{#if !disabled}
			<button
				on:click|preventDefault={listOpen}
				class="p-1 pl-2 rounded-r bg-transparent transition-colors
          hover:bg-stone-200 dark:hover:bg-stone-600
          text-stone-600 dark:text-stone-400 hover:text-black dark:hover:text-white
        "
			>
				<Icon key="magnifying-glass" />
			</button>
		{/if}
	</fieldset>
	<Popup
		bind:open={listOpen}
		bind:close={listClose}
		on:closed={() => {
			filterText = '';
		}}
	>
		<div slot="top" class="flex">
			{#if label}
				<div class="p-1 text-lg font-semibold">{label}</div>
			{/if}
			<div class="flex p-1">
				<div class="p-1">
					<Icon key="funnel" />
				</div>
				<Input type="search" bind:value={filterText} placeholder="Filter..." />
			</div>
		</div>
		<div class="flex flex-col w-full">
			{#each options ?? [] as o}
				{#if filter(o, filterText)}
					<button
						type="button"
						on:click|preventDefault|stopPropagation={() => click(o)}
						class="flex text-left w-full hover:bg-stone-200 dark:hover:bg-stone-700"
					>
						{#if typeof o == 'string'}
							<div class="p-2 w-full">
								{o || '-'}
							</div>
						{:else}
							{#each o as col, i}
								<div
									class="p-2 w-full
										{i == 0 ? 'font-bold' : 'text-stone-600 dark:text-stone-400'}
									"
								>
									{col || '-'}
								</div>
							{/each}
						{/if}
					</button>
				{/if}
			{:else}
				<tr><td> No items in selection </td></tr>
			{/each}
		</div>
	</Popup>
</label>

<datalist id={datalistId}>
	{#each options ?? [] as l}
		<option value={l[0]} />
	{/each}
</datalist>
