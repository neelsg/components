<script lang="ts">
	import type { navNode } from '../nav/nav.js';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { theme } from '../util/theme.svelte';
	import { shortcuts } from '../nav/shortcuts.svelte';
	import Toast from '../util/toast.svelte';
	import Wait from '../util/wait.svelte';
	import Header from './header.svelte';

	if (browser) {
		theme.init();
		shortcuts.init();
	}

	export let title: string;
	export let navNodes: navNode[];
	export let navContext: unknown = false;

	let headerHeight: number = 0;
</script>

<svelte:head>
	<title>{title} | Aansit</title>
</svelte:head>

<div class="min-h-screen flex flex-col font-sans text-black dark:text-stone-300">
	<Header bind:height={headerHeight} {title} {navNodes} {navContext} navCurrent={$page.route.id}>
		<div class="flex" slot="right">
			<slot name="header-right" />
		</div>
		<div slot="menu-footer">
			<slot name="menu-footer" />
		</div>
	</Header>
	<div class="z-50">
		<Toast />
		<Wait />
	</div>
	<main style="padding-top: {headerHeight}px" class="flex-grow">
		<slot />
	</main>
</div>
