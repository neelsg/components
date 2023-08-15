<script lang="ts">
	import type { colorBasic } from '../util/color.js';
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { wait } from '../util/wait.svelte';

	export let color: (typeof colorBasic)[number] = null;
	export let href: string;
	export let square: true | 'right' | 'left' | false = false;
	export let full: boolean = false;
	export let compact: boolean = false;
	export let disabled: boolean = false;
	export let upper: boolean = true;

	const dispatch = createEventDispatcher();
	const click = () => {
		if (disabled) return;
		wait.navigate(href);
		dispatch('click', {});
	};

	const noHash = (hash: string, href: string): boolean => {
		if (hash) return false;
		const idx = href.indexOf('#');
		if (idx > -1 && idx != href.length - 1) return false;
		return true;
	};
</script>

<a
	{href}
	on:click|preventDefault|stopPropagation={click}
	class="
    font-semibold flex items-center transition-colors
    bg-black dark:bg-white
		{upper ? 'uppercase' : ''}
		{compact ? '' : 'p-2'}
		{full ? 'w-full' : ''}
		{square == 'right' ? 'rounded-l' : square == 'left' ? 'rounded-r' : square ? '' : 'rounded'}
		{($page.route.id == href && noHash($page.url.hash, href)) || disabled
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
    {($page.route.id == href && noHash($page.url.hash, href)) || disabled
		? 'bg-opacity-5 dark:bg-opacity-5'
		: 'bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-20 active:bg-opacity-40 dark:hover:bg-opacity-20 dark:active:bg-opacity-40'}    
  "
>
	<slot />
</a>
