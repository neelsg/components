<script lang="ts" context="module">
	import { writable, get, type Writable } from 'svelte/store';
	import { wait } from '../util/wait.svelte';
	import ShortcutNode from './_shortcutNode.svelte';

	export const shortcuts = (() => {
		const store: Writable<string[]> = writable([]);
		return {
			init: () => {
				shortcuts.set(JSON.parse(localStorage.shortcuts || '[]'));
			},
			add: (url: string): void => {
				store.update((n: string[]) => {
					if (n.includes(url)) return n;
					n.push(url);
					localStorage.shortcuts = JSON.stringify(n);
					return n;
				});
			},
			remove: (url: string): void => {
				store.update((n: string[]) => {
					n = n.filter((n) => n != url);
					localStorage.shortcuts = JSON.stringify(n);
					return n;
				});
			},
			navigate: (url: string): void => {
				shortcuts.add(url);
				wait.navigate(url);
			},
			subscribe: store.subscribe,
			set: store.set
		};
	})();
</script>

<script lang="ts">
	import { nav, type navNode } from './nav.js';

	export let nodes: navNode[];
	export let context: unknown = false;

	$: list = nav.getFromUrls($shortcuts, nodes ?? [], context);
</script>

{#each list as n}
	<ShortcutNode node={n} />
{:else}
	<slot name="empty" />
{/each}
