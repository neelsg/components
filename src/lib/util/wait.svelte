<script lang="ts" context="module">
	import { writable, get, type Writable } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { json } from '@sveltejs/kit';
	import { page } from '$app/stores';

	export const wait = (() => {
		const store: Writable<number> = writable(0);
		return {
			subscribe: store.subscribe,
			clear: (): void => {
				store.update(() => 0);
			},
			resolve: async (promise: Promise<unknown>): Promise<void> => {
				store.update((n) => (n += 1));
				await promise;
				store.update((n) => (n > 0 ? (n -= 1) : 0));
			},
			fetch: async (url: URL | RequestInfo, init?: RequestInit | undefined): Promise<Response> => {
				if (navigator.onLine) {
					const req = fetch(url, init);
					wait.resolve(req);
					return req;
				}
				return json({ message: "Can't fetch / submit data while offline" }, { status: 503 });
			},
			navigate: async (url: string): Promise<void> => {
				if (url[0] != '/' && url[0] != '#') {
					window.location.href = url;
					return;
				}
				if (url[0] == '#') {
					document.body.scrollTop = 0;
					document.documentElement.scrollTop = 0;
					if (get(page).url.toString().indexOf('#') == -1) {
						window.location.replace('#');
					}
				}
				const current = get(page).url.pathname + (get(page).url.hash || '#');
				const target =
					url[0] == '#' ? get(page).url.pathname + url : url + (url.indexOf('#') == -1) ? '#' : '';
				if (current == target) return;
				store.update((n) => (n += 1));
				await goto(url);
				store.update((n) => (n > 0 ? (n -= 1) : 0));
			},
			delay: (ms: number): void => {
				store.update((n) => (n += 1));
				setTimeout(() => {
					store.update((n) => (n > 0 ? (n -= 1) : 0));
				}, ms);
			}
		};
	})();
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import Icon from '../widget/icon.svelte';
	import ButtonText from '../widget/buttonText.svelte';

	const maxState = 5;
	let state: number = 0;

	$: updateState($wait);
	const updateState = (waitCount: number) => {
		if (waitCount <= 0) {
			state = 0;
			return;
		}
		setTimeout(() => {
			state += 1;
			if (state == maxState) state = 0;
			updateState($wait);
		}, 500);
	};
</script>

{#if $wait > 0}
	<div
		transition:fade={{ duration: 150 }}
		class="
      fixed top-0 right-0 bottom-0 left-0
			bg-opacity-20 dark:bg-opacity-40
			bg-black flex justify-center p-2
    "
	>
		<div class="w-full flex justify-center p-2">
			{#each [...Array(maxState).keys()] as k (k)}
				<div
					class="
					border w-2 h-2 m-1 rounded-full transition-colors
					border-black dark:border-white
					{state == k ? 'bg-stone-300' : 'bg-stone-800'}
				"
				/>
			{/each}
			<div class="w-8">
				<ButtonText
					compact
					on:click={() => {
						wait.clear();
					}}
				>
					<Icon key="x-mark" size={16} />
				</ButtonText>
			</div>
		</div>
	</div>
{/if}
