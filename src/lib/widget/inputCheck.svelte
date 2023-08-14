<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './icon.svelte';

	export let value: boolean;
	export let label: string | null = null;
	export let name: string | null = null;
	export let align: 'left' | 'center' | 'right' = 'left';
	export let labelSize: number = 50.0;
	export let disabled: boolean = false;

	const dispatch = createEventDispatcher();
	const click = () => {
		value = !value;
		setTimeout(() => dispatch('input'), 1);
	};
</script>

<label class="w-full flex items-center">
	{#if label}
		<div style="width: {labelSize}%">{label}</div>
	{/if}
	<div
		class="w-full {align == 'center'
			? 'flex justify-center'
			: align == 'right'
			? 'flex justify-end'
			: ''}"
	>
		<button
			on:click|preventDefault|stopPropagation={click}
			class="border rounded w-8 py-1 flex justify-center transition-colors
        {disabled
				? 'border-stone-400 dark:border-stone-600 bg-transparent'
				: 'bg-white dark:bg-stone-800 border-stone-800 dark:border-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700'}
        {!value
				? 'text-stone-300 dark:text-stone-600'
				: disabled
				? 'text-stone-500 dark:text-stone-500'
				: 'text-black dark:text-white'}
      "
			type="button"
			id={name}
			{name}
			{disabled}
		>
			<Icon key={value ? 'check' : 'x-mark'} />
		</button>
	</div>
</label>
