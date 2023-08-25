<script lang="ts">
	import type { colorBasic } from '../util/color.js';
	import { createEventDispatcher } from 'svelte';

	export let color: (typeof colorBasic)[number] = null;
	export let type: 'button' | 'reset' | 'submit' | null = 'button';
	export let form: string | null = null;
	export let square: true | 'right' | 'left' | false = false;
	export let full: boolean = false;
	export let compact: boolean = false;
	export let disabled: boolean = false;
	export let upper: boolean = true;
	export let space: boolean = false;

	const dispatch = createEventDispatcher();
	const click = (e: Event) => {
		if (type != 'reset' && type != 'submit') e.preventDefault();
		dispatch('click', {});
	};
</script>

<div class={space ? 'p-1' : ''}>
	<button
		on:click|stopPropagation={click}
		class="
			font-semibold flex items-center transition-colors
			{upper ? 'uppercase' : ''}
			bg-black dark:bg-white
			{compact ? '' : 'p-2'}
			{full ? 'w-full' : ''}
			{square == 'right' ? 'rounded-l' : square == 'left' ? 'rounded-r' : square ? '' : 'rounded'}
			{disabled
			? 'text-stone-500'
			: color == 'blue'
			? 'text-blue-700 dark:text-blue-400'
			: color == 'green'
			? 'text-lime-700 dark:text-lime-400'
			: color == 'yellow'
			? 'text-amber-700 dark:text-amber-400'
			: color == 'red'
			? 'text-red-700 dark:text-red-400'
			: 'text-black dark:text-white'}
			{disabled
			? 'bg-opacity-5 dark:bg-opacity-5'
			: 'bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-20 active:bg-opacity-40 dark:hover:bg-opacity-20 dark:active:bg-opacity-40'}
		"
		{disabled}
		{type}
		{form}
	>
		<slot />
	</button>
</div>
