<!--
A button presented as text with no background or border unless hovered

@events
- click: whenever the button is clicked
-->

<script lang="ts">
	import type { colorBasic } from '../util/color.js';
	import { createEventDispatcher } from 'svelte';

	export let color: (typeof colorBasic)[number] = null; // set the color of the button
	export let type: 'button' | 'reset' | 'submit' | null = 'button'; // any type that a typical html button can be
	export let form: string | null = null; // the form if any that is associated with this button
	export let square: true | 'right' | 'left' | false = false; // make the button corners sharp instead of the default rounded
	export let full: boolean = false; // set w-full for the button
	export let compact: boolean = false; // remove any padding from the button
	export let disabled: boolean = false; // disable the button
	export let upper: boolean = true; // make button text uppercase. true by default
	export let space: boolean = false; // add some padding around the button

	const dispatch = createEventDispatcher();
	const click = (e: Event) => {
		if (type != 'reset' && type != 'submit') e.preventDefault();
		dispatch('click', {});
	};
</script>

<div class="{full ? 'w-full' : ''} {space ? 'p-1' : ''}">
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
