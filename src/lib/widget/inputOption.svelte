<!--
Option selection

@events
- input: whenever the user changes the value
-->

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: string; // bind this to get the input value
	export let label: string | null = null; // this is displayed if not null
	export let labelSize: number = 50.0; // only applicable if label is not null. input is 100, so 50 is 1/3
	export let options: string[] | string[][]; // a list of possible values with either a simple array or a tabular layout. for tabular the first column of each row is the actual value
	export let blank: string = ''; // the value to display if the actual value is ''
	export let col: boolean = false; // show values in a column rather than next to each other
	export let disabled: boolean = false; // disable the input
	export let space: boolean = false; // add some padding around the input

	const dispatch = createEventDispatcher();
	const click = (option: string) => {
		value = option;
		setTimeout(() => dispatch('input'), 1);
	};

	let windowWidth: number = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div
	class="w-full flex flex-col sm:flex-row items-start {space ? 'p-1' : ''} {col
		? ''
		: 'sm:items-center'}"
>
	{#if label}
		<div style="width: {windowWidth < 640 ? 100 : labelSize}%" class="pt-1 sm:pr-1 sm:pb-1">
			{label}
		</div>
	{/if}
	<div class="w-full flex {col ? 'flex-col' : ''}">
		{#each options ?? [] as o, i}
			<button
				on:click|preventDefault={() => click(typeof o == 'string' ? o : o[0])}
				class="p-1 w-full transition-colors
					{col ? 'border-x border-t' : 'border-y border-l'}
          {i == 0 ? (col ? 'rounded-t' : 'rounded-l') : ''}
					{i == options.length - 1 ? (col ? 'rounded-b border-b' : 'rounded-r border-r') : ''}
          {disabled
					? 'border-stone-400 dark:border-stone-700'
					: 'border-stone-900 dark:border-stone-200'}
          {value == (typeof o == 'string' ? o : o[0])
					? disabled
						? 'bg-stone-500 dark:bg-stone-600 text-white dark:text-stone-300'
						: 'bg-teal-700 text-white hover:bg-teal-500'
					: disabled
					? 'bg-transparent text-stone-600 dark:text-stone-400'
					: 'bg-white dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-black dark:text-white'}
        "
				type="button"
				{disabled}
			>
				{#if typeof o == 'string'}
					{o == '' ? blank : o}
				{:else}
					<div class="flex w-full">
						{#each o as col, i}
							<div
								class="w-full text-left
										{i == 0 ? 'font-bold' : ''}
									"
							>
								{col || (i == 0 ? blank : '-')}
							</div>
						{/each}
					</div>
				{/if}
			</button>
		{:else}
			<div>No options available</div>
		{/each}
	</div>
</div>
