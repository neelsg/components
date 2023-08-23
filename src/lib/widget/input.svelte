<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: string;
	export let label: string | null = null;
	export let name: string | null = null;
	export let type: 'text' | 'email' | 'date' | 'password' | 'search' | 'tel' | 'time' | 'url' =
		'text';
	export let align: 'left' | 'center' | 'right' = 'left';
	export let labelSize: number = 50.0;
	export let placeholder: string | null = null;
	export let pattern: string | null = null;
	export let form: string | null = null;
	export let disabled: boolean = false;
	export let required: boolean = false;
	export let used: string[] = [];
	export let upper: boolean = false;

	let element: HTMLInputElement | null = null;
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

<label class="w-full flex flex-col sm:flex-row items-start sm:items-center">
	{#if label}
		<div style="width: {windowWidth < 640 ? 100 : labelSize}%" class="pt-1 sm:pr-1 sm:pb-1">
			{label}
		</div>
	{/if}
	<input
		class="p-1 w-full rounded border transition-colors
      {align == 'center' ? 'text-center' : align == 'right' ? 'text-right' : 'text-left'}
      {disabled
			? 'border-stone-400 dark:border-stone-700 text-stone-600 dark:text-stone-400'
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
