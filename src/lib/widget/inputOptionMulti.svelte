<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: string[] = [];
	export let label: string | null = null;
	export let labelSize: number = 50.0;
	export let options: string[] | string[][];
	export let blank: string = '';
	export let col: boolean = false;
	export let disabled: boolean = false;

	const dispatch = createEventDispatcher();
	const click = (option: string) => {
		const i = value.indexOf(option);
		if (i < 0) {
			value.push(option);
		} else {
			value.splice(i, 1);
		}
		value = value.sort();
		setTimeout(() => dispatch('input'), 1);
	};

	let windowWidth: number = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div class="w-full flex flex-col sm:flex-row items-start {col ? '' : 'sm:items-center'}">
	{#if label}
		<div style="width: {windowWidth < 640 ? 100 : labelSize}%" class="pt-1 sm:pr-1 sm:pb-1">
			{label}
		</div>
	{/if}
	<div class="flex w-full {col ? 'flex-col' : ''}">
		{#each options ?? [] as o, i}
			<button
				on:click|preventDefault={() => {
					click(typeof o == 'string' ? o : o[0]);
				}}
				class="p-1 w-full transition-colors
					{col ? 'border-x border-t' : 'border-y border-l'}
          {i == 0 ? (col ? 'rounded-t' : 'rounded-l') : ''}
					{i == options.length - 1 ? (col ? 'rounded-b border-b' : 'rounded-r border-r') : ''}
          {disabled
					? 'border-stone-400 dark:border-stone-700'
					: 'border-stone-900 dark:border-stone-200'}
          {value.includes(typeof o == 'string' ? o : o[0])
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
