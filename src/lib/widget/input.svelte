<!--
Text input

@events
- input: whenever the user changes the value
-->

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: string; // bind this to get the input value
	export let label: string | null = null; // this is displayed if not null
	export let name: string | null = null; // can use to associate an external label to this input
	export let type: 'text' | 'email' | 'date' | 'password' | 'search' | 'tel' | 'time' | 'url' =
		'text'; // browsers may have different behaviours and validations based on input type
	export let align: 'left' | 'center' | 'right' = 'left'; // alignment of the value in the input
	export let labelSize: number = 50.0; // only applicable if label is not null. input is 100, so 50 is 1/3
	export let placeholder: string | null = null; // placeholder if value is empty
	export let pattern: string | null = null; // regex for validation
	export let form: string | null = null; // associate this input with a form if not nested under it
	export let disabled: boolean = false; // disable the input
	export let required: boolean = false; // make the input required
	export let used: string[] = []; // use to validate that you don't have duplicates
	export let upper: boolean = false; // automatically make input value uppercase
	export let space: boolean = false; // add some padding around the input
	export let element: HTMLInputElement | null = null;

	const dispatch = createEventDispatcher();
	const updateValidity = (value: string): void => {
		if (!value) {
			element?.setCustomValidity('');
			return;
		}
		if (used.includes(value)) {
			element?.setCustomValidity('This value was also used elsewhere.');
			return;
		}
		element?.setCustomValidity('');
	};
	const input = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		value = (e.target as HTMLInputElement).value;
		if (upper) {
			value = value.toLocaleUpperCase();
		}
		updateValidity(value);
		setTimeout(() => dispatch('input'), 1);
	};

	let windowWidth: number = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<label class="w-full flex flex-col sm:flex-row items-start sm:items-center {space ? 'p-1' : ''}">
	{#if label}
		<div style="width: {windowWidth < 640 ? 100 : labelSize}%" class="pt-1 sm:pr-1 sm:pb-1">
			{label}
		</div>
	{/if}
	<input
		class="p-1 w-full rounded border transition-colors
			{align == 'center' ? 'text-center' : align == 'right' ? 'text-right' : 'text-left'}
			{disabled
			? 'border-stone-400 dark:border-stone-700 text-stone-700 dark:text-stone-300'
			: 'border-stone-900 dark:border-stone-200 text-black dark:text-white'}
			{disabled
			? 'bg-transparent'
			: 'bg-white hover:bg-stone-100 dark:bg-stone-800 dark:hover:bg-stone-700'}
			invalid:border-red-600 dark:invalid:border-red-400
		"
		on:input={input}
		{type}
		{name}
		id={name}
		{required}
		{disabled}
		{placeholder}
		{form}
		{pattern}
		value={value ?? ''}
		bind:this={element}
	/>
</label>
