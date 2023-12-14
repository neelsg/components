<!--
Numeric input

@events
- input: whenever the user changes the value
-->

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: number; // bind this to get the input value
	export let label: string | null = null; // this is displayed if not null
	export let name: string | null = null; // can use to associate an external label to this input
	export let align: 'left' | 'center' | 'right' = 'left'; // alignment of the value in the input
	export let labelSize: number = 50.0; // only applicable if label is not null. input is 100, so 50 is 1/3
	export let placeholder: string | null = null; // placeholder if value is empty
	export let step: number = 0.0001; // minimum step size between values
	export let min: number | null = null; // minimum value allowed
	export let max: number | null = null; // maximum value allowed
	export let form: string | null = null; // associate this input with a form if not nested under it
	export let disabled: boolean = false; // disable the input
	export let required: boolean = false; // make the input required
	export let space: boolean = false; // add some padding around the input

	const dispatch = createEventDispatcher();
	const input = () => {
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
			{align == 'center' ? 'text-center' : align == 'right' ? 'text-right' : ''}
			{disabled
			? 'border-stone-400 dark:border-stone-700 text-stone-700 dark:text-stone-300'
			: 'border-stone-900 dark:border-stone-200 text-black dark:text-white'}
			{disabled
			? 'bg-transparent'
			: 'bg-white hover:bg-stone-100 dark:bg-stone-800 dark:hover:bg-stone-700'}
			invalid:border-red-600 dark:invalid:border-red-400
			[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
		"
		on:input={input}
		{name}
		id={name}
		{step}
		type="number"
		{required}
		{disabled}
		{placeholder}
		{form}
		{min}
		{max}
		bind:value
	/>
</label>
