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

	const dispatch = createEventDispatcher();
	const click = (e: Event) => {
		if (type != 'reset' && type != 'submit') e.preventDefault();
		dispatch('click', {});
	};
</script>

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
