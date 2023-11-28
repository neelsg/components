<!--
An input checkbox

@events
- input: whenever the user changes the value
-->

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './icon.svelte';

	export let value: boolean; // bind this to get the value
	export let label: string | null = null; // display a label for the checkbox
	export let name: string | null = null; // set the name of the input element
	export let align: 'left' | 'center' | 'right' = 'left'; // align the checkbox in the available area
	export let labelSize: number = 50.0; // only applicable if label is not null
	export let disabled: boolean = false; // disable input
	export let space: boolean = false; // add some padding around the checkbox
	export let affix: string = ''; // any text to the right of the field

	const dispatch = createEventDispatcher();
	const click = () => {
		value = !value;
		setTimeout(() => dispatch('input'), 1);
	};

	let windowWidth: number = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<label class="w-full flex items-start {space ? 'p-1' : ''}">
	{#if label}
		<div style="width: {windowWidth < 640 ? 100 : labelSize}%" class="py-1 pr-1">
			{label}
		</div>
	{/if}
	<div class="w-full flex flex-wrap sm:flex-nowrap">
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
					{disabled ? 'border-stone-400 dark:border-stone-700' : 'border-stone-900 dark:border-stone-200'}
					{value
					? disabled
						? 'bg-stone-500 dark:bg-stone-800 text-white dark:text-stone-300'
						: 'bg-teal-700 text-white hover:bg-teal-500'
					: disabled
					? 'bg-transparent text-stone-700 dark:text-stone-300'
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
		{#if affix}
			<div class="w-full p-1 font-semibold">{affix}</div>
		{/if}
	</div>
</label>
