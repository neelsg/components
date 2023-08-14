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

	const dispatch = createEventDispatcher();
	const input = (e: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
		value = (e.target as HTMLInputElement).value;
		setTimeout(() => dispatch('input'), 1);
	};
</script>

<label class="w-full flex items-center">
	{#if label}
		<div style="width: {labelSize}%">{label}</div>
	{/if}
	<input
		class="p-1 w-full rounded border transition-colors
      {align == 'center' ? 'text-center' : align == 'right' ? 'text-right' : ''}
      {disabled
			? 'bg-transparent border-stone-400 dark:border-stone-600 text-stone-700 dark:text-stone-500'
			: 'bg-white dark:bg-stone-800 border-stone-800 dark:border-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700'}
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
		{value}
	/>
</label>
