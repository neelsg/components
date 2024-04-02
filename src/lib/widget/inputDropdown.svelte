<!--
An input box with a popup that will display the available values

@events
- input: whenever the user changes the value
-->

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './icon.svelte';
	import Popup from './popup.svelte';
	import Input from './input.svelte';
	import ButtonText from './buttonText.svelte';

	export let value: string = ''; // bind this to get the current value
	export let label: string | null = null; // display a label for the input
	export let name: string | null = null; // set the name attribute on the input element
	export let align: 'left' | 'center' | 'right' = 'left'; // set the alignment of the value within the input
	export let labelSize: number = 50.0; // only applicable if label is not null
	export let placeholder: string | null = null; // set a placeholder if the value is empty
	export let options: string[] | string[][]; // a list of possible values with a tabular layout. the first column of each row is the actual value
	export let validate: boolean = true; // limit the possible values to the options list
	export let form: string | null = null; // associate the input with a form if not nested under it
	export let required: boolean = false; // make the input required
	export let disabled: boolean = false; // disable input
	export let used: string[] = []; // use to validate that you don't have duplicates
	export let upper: boolean = false; // automatically make input value uppercase
	export let space: boolean = false; // add some padding around the input
	export let pageSize: number = 50;

	const dispatch = createEventDispatcher();

	let listOpen: () => void;
	let listClose: () => void;

	const click = (option: string | string[]) => {
		value = typeof option == 'string' ? option : option[0];
		listClose();
		setTimeout(() => dispatch('input'), 1);
	};

	let element: HTMLInputElement;

	$: updated(value);
	const updated = (value: string) => {
		if (!value) {
			element?.setCustomValidity('');
			return;
		}
		if (used.includes(value)) {
			element?.setCustomValidity('This value was already used elsewhere.');
			return;
		}
		if (!validate || options.map((x) => x[0]).includes(value)) {
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
	$: filterOptions = options.filter((v) => filter(v, filterText));
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
	let pageCurrent: number = 0;
	let currentOptions: (string | string[])[] = [];
	$: currentUpdate(filterOptions, pageCurrent, pageSize, filterText);
	const currentUpdate = (
		filterOptions: (string | string[])[],
		pageCurrent: number,
		pageSize: number,
		filterText: string
	) => {
		currentOptions = filterOptions.slice(pageCurrent * pageSize, pageCurrent * pageSize + pageSize);
	};
	$: pageUpdate(pageCurrent, filterOptions);
	const pageUpdate = (pageCurrent: number, filterOptions: (string | string[])[]) => {
		if (pageCurrent > filterOptions.length / pageSize) pageCurrent = 0;
		currentUpdate(filterOptions, pageCurrent, pageSize, filterText);
	};

	const keyDown = (e: KeyboardEvent) => {
		if (e.key == 'ArrowUp') {
			e.preventDefault();
			listOpen();
			setTimeout(() => {
				filterInput.focus();
			}, 1);
		}
	};

	let filterInput: HTMLInputElement;
	let windowWidth: number = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<label class="w-full flex flex-col sm:flex-row items-start sm:items-center {space ? 'p-1' : ''}">
	{#if label}
		<div style="width: {windowWidth < 640 ? 100 : labelSize}%" class="pt-1 sm:pr-1 sm:pb-1">
			{label}
		</div>
	{/if}
	<fieldset
		class="flex w-full rounded border transition-colors
		{disabled
			? 'border-stone-400 dark:border-stone-700 text-stone-700 dark:text-stone-300'
			: 'border-stone-900 dark:border-stone-200 text-black dark:text-white'}
		{disabled ? 'bg-transparent' : 'bg-white dark:bg-stone-800'}
		invalid:border-red-600 dark:invalid:border-red-400
	"
	>
		<input
			on:input={input}
			on:keydown={keyDown}
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
			bind:value
			bind:this={element}
		/>
		{#if !disabled}
			<button
				tabindex="-1"
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
			element.focus();
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
				<Input
					bind:element={filterInput}
					type="search"
					bind:value={filterText}
					placeholder="Filter..."
				/>
			</div>
		</div>
		<div class="flex flex-col w-full">
			{#each currentOptions ?? [] as o}
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
			{:else}
				<tr><td> No items in selection </td></tr>
			{/each}
		</div>
		<div class="flex flex-wrap justify-center items-center p-0.5 text-sm">
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
			{#each [...Array(Math.ceil(filterOptions.length / pageSize)).keys()] as p}
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
					disabled={pageCurrent > filterOptions.length / pageSize - 1}
					color="blue"
					compact
				>
					<Icon key="chevron-right" />
				</ButtonText>
			</div>
		</div>
	</Popup>
</label>
