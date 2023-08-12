<script lang="ts" context="module">
	import { writable, get, type Writable } from 'svelte/store';
	import { browser } from '$app/environment';

	export const theme = (() => {
		const store: Writable<null | 'light' | 'dark'> = writable(null);
		return {
			set: store.set,
			subscribe: store.subscribe,
			toggle: (): void => {
				const goDark = get(store) != 'dark';
				localStorage.theme = goDark ? 'dark' : 'light';
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

	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			window.document.body.classList.add('dark');
			window.document.body.classList.add('bg-stone-950');
			window.document.body.classList.remove('bg-stone-50');
			theme.set('dark');
		} else {
			window.document.body.classList.remove('dark');
			window.document.body.classList.add('bg-stone-50');
			window.document.body.classList.remove('bg-stone-950');
			theme.set('light');
		}
	}
</script>

<script lang="ts">
	import ButtonText from '../widget/buttonText.svelte';
	import Icon from '../widget/icon.svelte';

	export let square: true | 'right' | 'left' | false = true;
</script>

<ButtonText {square} on:click={theme.toggle}>
	<Icon key={$theme == 'dark' ? 'moon' : 'sun'} />
</ButtonText>
