<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: string;
	export let label: string | null = null;
	export let labelSize: number = 50.0;
	export let options: string[];
	export let blank: string = '';
	export let disabled: boolean = false;

	const dispatch = createEventDispatcher();
	const input = (option: string) => {
		value = option;
		setTimeout(() => dispatch('input'), 1);
	};
</script>

<div class="w-full flex items-center">
	{#if label}
		<div style="width: {labelSize}%">{label}</div>
	{/if}
	<div class="w-full flex">
		{#each options ?? [] as o, i}
			<button
				on:click|preventDefault={() => input(o)}
				class="p-1 border-y border-l w-full transition-colors
          {i == 0 ? 'rounded-l' : ''} {i == options.length - 1 ? 'rounded-r border-r' : ''}
          {disabled
					? 'border-stone-400 dark:border-stone-700'
					: 'border-stone-900 dark:border-stone-200'}
          {value == o
					? disabled
						? 'bg-stone-500 dark:bg-stone-800 text-white dark:text-stone-400'
						: 'bg-teal-700 text-white hover:bg-teal-500'
					: disabled
					? 'bg-transparent text-stone-600 dark:text-stone-400'
					: 'bg-white dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-black dark:text-white'}
        "
				type="button"
				{disabled}
			>
				{o == '' ? blank : o}
			</button>
		{:else}
			<div>No options available</div>
		{/each}
	</div>
</div>
