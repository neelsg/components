<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: string;
	export let label: string | null = null;
	export let name: string | null = null;
	export let labelSize: number = 50.0;
	export let placeholder: string | null = null;
	export let form: string | null = null;
	export let rows: number = 5;
	export let disabled: boolean = false;
	export let required: boolean = false;

	const dispatch = createEventDispatcher();
	const input = () => {
		setTimeout(() => dispatch('input'), 1);
	};

	let windowWidth: number = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<label class="w-full flex flex-col sm:flex-row items-start">
	{#if label}
		<div style="width: {windowWidth < 640 ? 100 : labelSize}%" class="pt-1 sm:pr-1 sm:pb-1">
			{label}
		</div>
	{/if}
	<textarea
		class="p-1 w-full rounded border transition-colors
			{disabled
			? 'bg-transparent border-stone-400 dark:border-stone-600 text-stone-700 dark:text-stone-500'
			: 'bg-white dark:bg-stone-800 border-stone-800 dark:border-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700'}
			invalid:border-red-600 dark:invalid:border-red-400
		"
		on:input={input}
		{name}
		id={name}
		{required}
		{form}
		{disabled}
		{rows}
		{placeholder}
		bind:value
	/>
</label>
