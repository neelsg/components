<script lang="ts">
	import type { colorFull } from '../util/color.js';
	import { wait } from '../util/wait.svelte';
	import { createEventDispatcher } from 'svelte';

	export let href: string;
	export let color: (typeof colorFull)[number] = null;

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
		transition-all w-full flex rounded p-0.5 bg-opacity-60 hover:bg-opacity-100
		shadow shadow-stone-600
		hover:shadow-md hover:shadow-black dark:hover:shadow-md dark:hover:shadow-stone-400
		{color == 'slate'
		? 'bg-slate-500'
		: color == 'gray'
		? 'bg-gray-500'
		: color == 'zinc'
		? 'bg-zinc-500'
		: color == 'neutral'
		? 'bg-neutral-500'
		: color == 'stone'
		? 'bg-stone-500'
		: color == 'red'
		? 'bg-red-500'
		: color == 'orange'
		? 'bg-orange-500'
		: color == 'amber'
		? 'bg-amber-500'
		: color == 'yellow'
		? 'bg-yellow-500'
		: color == 'lime'
		? 'bg-lime-500'
		: color == 'green'
		? 'bg-green-500'
		: color == 'emerald'
		? 'bg-emerald-500'
		: color == 'teal'
		? 'bg-teal-500'
		: color == 'cyan'
		? 'bg-cyan-500'
		: color == 'sky'
		? 'bg-sky-500'
		: color == 'blue'
		? 'bg-blue-500'
		: color == 'indigo'
		? 'bg-indigo-500'
		: color == 'violet'
		? 'bg-violet-500'
		: color == 'purple'
		? 'bg-purple-500'
		: color == 'fuchsia'
		? 'bg-fuchsia-500'
		: color == 'pink'
		? 'bg-pink-500'
		: color == 'rose'
		? 'bg-rose-500'
		: 'bg-stone-500'}
	"
>
	<div
		class="
		rounded w-full flex bg-white dark:bg-black
	"
	>
		<slot />
	</div>
</a>
