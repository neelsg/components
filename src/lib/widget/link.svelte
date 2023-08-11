<script lang="ts" context="module">
	export const linkColors = [null, 'blue', 'green', 'yellow', 'red'] as const;
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { wait } from '../util/wait.svelte';

	export let color: (typeof linkColors)[number] = null;
	export let href: string;
	export let square: true | 'right' | 'left' | false = false;
	export let compact: boolean = false;
	export let disabled: boolean = false;

	const dispatch = createEventDispatcher();
	const click = () => {
		if (disabled) return;
		wait.navigate(href);
		dispatch('click', {});
	};
</script>

<a
	{href}
	on:click|preventDefault|stopPropagation={click}
	class="
    uppercase font-semibold flex items-center transition-colors
    bg-black dark:bg-white
		{compact ? '' : 'p-2'}
		{square == 'right' ? 'rounded-l' : square == 'left' ? 'rounded-r' : square ? '' : 'rounded'}
		{$page.route.id == href || disabled
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
    {$page.route.id == href || disabled
		? 'bg-opacity-5 dark:bg-opacity-5'
		: 'bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-20 active:bg-opacity-40 dark:hover:bg-opacity-20 dark:active:bg-opacity-40'}    
  "
>
	<slot />
</a>