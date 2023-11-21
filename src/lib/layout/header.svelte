<script lang="ts">
	import type { navNode } from '../nav/nav.js';
	import { shortcuts } from '../nav/shortcuts.svelte';
	import Crumbs from '../nav/crumbs.svelte';
	import Theme from '../util/theme.svelte';
	import Icon from '../widget/icon.svelte';
	import Menu from '../nav/menu.svelte';
	import ButtonText from '../widget/buttonText.svelte';
	import Link from '../widget/link.svelte';

	export let title: string;
	export let height: number = 0;
	export let navNodes: navNode[];
	export let navContext: unknown = false;
	export let navCurrent: string | null = null;

	let openMenu: () => void;
	let width: number;
</script>

<svelte:window bind:innerWidth={width} />

<header
	bind:clientHeight={height}
	class="fixed top-0 flex flex-wrap justify-between w-full
  shadow shadow-stone-300 dark:shadow-stone-800 border-b border-stone-400
  dark:border-stone-700 bg-stone-100 dark:bg-stone-800
"
>
	<div class="flex items-center">
		<ButtonText square on:click={openMenu}>
			<Icon key="bars-3" />
		</ButtonText>
		<ButtonText
			square
			color="blue"
			on:click={() => {
				window.history.back();
			}}
		>
			<Icon key="chevron-left" />
		</ButtonText>
		<Crumbs
			prepend={[{ label: title, url: '/' }]}
			nodes={navNodes}
			node={navCurrent}
			context={navContext}
		/>
	</div>
	<div class="flex space-x-2">
		<slot name="right" />
		<Theme />
	</div>
</header>

<Menu
	bind:open={openMenu}
	collapsible
	nodes={navNodes}
	context={navContext}
	on:click={(e) => shortcuts.add(e.detail.url)}
>
	<footer slot="footer">
		<slot name="menu-footer" />
	</footer>
</Menu>
