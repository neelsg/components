<!--
A simple button with relevant styling applied

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
	export let upper: boolean = true; // make button text uppercase
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
			{compact ? '' : 'p-2'}
			{full ? 'w-full' : ''}
			{square == 'right' ? 'rounded-l' : square == 'left' ? 'rounded-r' : square ? '' : 'rounded'}
			{disabled ? 'text-stone-500' : 'text-white active:text-stone-300'}
			{disabled
			? 'bg-stone-500 bg-opacity-20'
			: color == 'blue'
			? 'bg-blue-700 hover:bg-blue-500 active:bg-blue-800'
			: color == 'green'
			? 'bg-lime-700 hover:bg-lime-500 active:bg-lime-800'
			: color == 'yellow'
			? 'bg-amber-700 hover:bg-amber-500 active:bg-amber-800'
			: color == 'red'
			? 'bg-red-700 hover:bg-red-500 active:bg-red-800'
			: 'bg-stone-600 hover:bg-stone-400 active:bg-stone-700'}
		"
		{disabled}
		{type}
		{form}
	>
		<slot />
	</button>
</div>
