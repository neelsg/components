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

	let windowWidth: number = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<label class="w-full flex items-start">
	{#if label}
		<div style="width: {windowWidth < 640 ? 100 : labelSize}%" class="py-1 pr-1">
			{label}
		</div>
	{/if}
	<div
		class="sm:w-full flex {align == 'center'
			? 'justify-center'
			: align == 'right'
			? 'justify-end'
			: 'justify-start'}"
	>
		<button
			on:click|preventDefault|stopPropagation={click}
			class="border rounded w-8 py-1 flex justify-center transition-colors
        {disabled
				? 'border-stone-400 dark:border-stone-700'
				: 'border-stone-900 dark:border-stone-200'}
        {value
				? disabled
					? 'bg-stone-500 dark:bg-stone-800 text-white dark:text-stone-400'
					: 'bg-teal-700 text-white hover:bg-teal-500'
				: disabled
				? 'bg-transparent text-stone-600 dark:text-stone-400'
				: 'bg-white dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-black dark:text-white'}
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
