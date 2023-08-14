<script lang="ts">
	import type { colorFull } from '../util/color.js';
	import { wait } from '../util/wait.svelte';
	import { createEventDispatcher } from 'svelte';

	export let href: string;
	export let color: (typeof colorFull)[number] = null;
	export let col: boolean = false;
	export let compact: boolean = false;

	const dispatch = createEventDispatcher();
	const click = () => {
		wait.navigate(href);
		dispatch('click', {});
	};

	$: addTrailingSlash(href);
	const addTrailingSlash = (h: string) => {
		if (h[0] != '/') return;
		if (h.indexOf('#') > -1) return;
		if (h[h.length - 1] != '/') href += '/';
	};
</script>

<a
	{href}
	on:click|preventDefault|stopPropagation={click}
	class="
		text-stone-800 hover:text-black dark:text-stone-300 dark:hover:text-white
		transition-all w-full rounded border-opacity-60 hover:border-opacity-100
		shadow shadow-stone-600 bg-white dark:bg-black border-2 flex justify-between
		hover:shadow-md hover:shadow-black dark:hover:shadow dark:hover:shadow-stone-300
		{compact ? '' : 'p-2'}
		{col ? 'flex-col' : ''}
		{color == 'slate'
		? 'border-slate-500'
		: color == 'gray'
		? 'border-gray-500'
		: color == 'zinc'
		? 'border-zinc-500'
		: color == 'neutral'
		? 'border-neutral-500'
		: color == 'stone'
		? 'border-stone-500'
		: color == 'red'
		? 'border-red-500'
		: color == 'orange'
		? 'border-orange-500'
		: color == 'amber'
		? 'border-amber-500'
		: color == 'yellow'
		? 'border-yellow-500'
		: color == 'lime'
		? 'border-lime-500'
		: color == 'green'
		? 'border-green-500'
		: color == 'emerald'
		? 'border-emerald-500'
		: color == 'teal'
		? 'border-teal-500'
		: color == 'cyan'
		? 'border-cyan-500'
		: color == 'sky'
		? 'border-sky-500'
		: color == 'blue'
		? 'border-blue-500'
		: color == 'indigo'
		? 'border-indigo-500'
		: color == 'violet'
		? 'border-violet-500'
		: color == 'purple'
		? 'border-purple-500'
		: color == 'fuchsia'
		? 'border-fuchsia-500'
		: color == 'pink'
		? 'border-pink-500'
		: color == 'rose'
		? 'border-rose-500'
		: 'border-stone-500'}
	"
>
	<slot />
</a>
