<script lang="ts" context="module">
	import { writable, type Writable } from 'svelte/store';
	import { wait } from '../util/wait.svelte';
	import { dbConnect } from '../util/db';
	import { browser } from '$app/environment';
	import ShortcutNode from './_shortcutNode.svelte';

	export const shortcuts = (() => {
		const store: Writable<string[]> = writable([]);
		return {
			init: async (): Promise<void> => {
				if (!browser) return;
				if (!('indexedDB' in window)) return;

				const db = await dbConnect();
				let rec = await db.get('setting', 'shortcuts');
				if (!rec) {
					const local = JSON.parse(localStorage.shortcuts || '[]');
					await db.put('setting', { key: 'shortcuts', value: local });
					rec = { value: local };
				}
				store.set(rec.value);
			},
			add: async (url: string): Promise<void> => {
				if (!browser) return;
				if (!('indexedDB' in window)) return;
				localStorage.removeItem('shortcuts');

				const db = await dbConnect();
				store.update((n: string[]) => {
					n = n.filter((v) => v);
					if (n.includes(url)) return n;
					n.push(url);
					db.put('setting', { key: 'shortcuts', value: n });
					return n;
				});
			},
			remove: async (url: string): Promise<void> => {
				if (!browser) return;
				if (!('indexedDB' in window)) return;
				localStorage.removeItem('shortcuts');

				const db = await dbConnect();
				store.update((n: string[]) => {
					n = n.filter((n) => n && n != url);
					db.put('setting', { key: 'shortcuts', value: n });
					return n;
				});
			},
			navigate: async (url: string): Promise<void> => {
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
