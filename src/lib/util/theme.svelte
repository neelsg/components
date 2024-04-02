<script lang="ts" context="module">
	import { dbConnect } from './db';
	import { writable, get, type Writable } from 'svelte/store';
	import { browser } from '$app/environment';

	export const theme = (() => {
		const store: Writable<null | 'light' | 'dark'> = writable(null);
		return {
			init: async (): Promise<void> => {
				if (!browser) return;
				if (!('indexedDB' in window)) return;

				const db = await dbConnect();
				let theme = await db.get('setting', 'theme');
				if (!theme) {
					const local = localStorage.theme;
					if (local) await db.put('setting', { key: 'theme', value: local });
					theme = { value: local };
				}
				if (
					(!theme && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
					theme.value === 'dark'
				) {
					window.document.body.classList.add('dark');
					window.document.body.classList.add('bg-stone-950');
					window.document.body.classList.remove('bg-stone-50');
					store.set('dark');
				} else {
					window.document.body.classList.remove('dark');
					window.document.body.classList.add('bg-stone-50');
					window.document.body.classList.remove('bg-stone-950');
					store.set('light');
				}
			},
			set: store.set,
			subscribe: store.subscribe,
			toggle: async (): Promise<void> => {
				if (!browser) return;
				if (!('indexedDB' in window)) return;
				localStorage.removeItem('theme');

				const db = await dbConnect();
				const goDark = get(store) != 'dark';
				await db.put('setting', { key: 'theme', value: goDark ? 'dark' : 'light' });

				if (goDark) {
					window.document.body.classList.add('dark');
				} else {
					window.document.body.classList.remove('dark');
				}
				window.document.body.classList.toggle('bg-stone-950');
				window.document.body.classList.toggle('bg-stone-50');
				store.set(goDark ? 'dark' : 'light');
			}
		};
	})();
</script>

<script lang="ts">
	import ButtonText from '../widget/buttonText.svelte';
	import Icon from '../widget/icon.svelte';

	export let square: true | false | 'right' | 'left' = true;
</script>

<ButtonText {square} on:click={theme.toggle}>
	<Icon key={$theme == 'dark' ? 'moon' : 'sun'} />
</ButtonText>
