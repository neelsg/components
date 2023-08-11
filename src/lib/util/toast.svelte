<script lang="ts" context="module">
	import { writable, get, type Writable } from 'svelte/store';

	export const toastColors = [null, 'blue', 'green', 'yellow', 'red'] as const;

	export const toast = (() => {
		const store: Writable<
			{
				message: string;
				color: (typeof toastColors)[number];
				id: number;
			}[]
		> = writable([]);
		return {
			subscribe: store.subscribe,
			add: (
				message: string,
				color: (typeof toastColors)[number] = null,
				delay: number = 4000
			): void => {
				const current = get(store);
				let id = 0;
				let found: any = true;
				while (found) {
					id += 1;
					found = current.find((e) => e.id == id);
				}
				store.update((n) => [...n, { message, color, id }]);
				setTimeout(() => {
					toast.close(id);
				}, delay);
			},
			close: (id: number) => {
				store.update((n) => {
					return n.filter((i) => i.id != id);
				});
			}
		};
	})();
</script>

<script lang="ts">
	import { fly } from 'svelte/transition';
	import Icon from '../widget/icon.svelte';
	import ButtonText from '../widget/buttonText.svelte';
</script>

<div class="fixed bg-transparent -ml-64 min-w-[512px] left-1/2 bottom-2">
	{#each $toast as t (t.id)}
		<div
			transition:fly={{ y: 32, duration: 160 }}
			class="
        flex items-center justify-between p-3 m-1
        rounded bg-opacity-90
        text-white shadow shadow-black
        border border-black border-opacity-40
				{t.color == 'yellow'
				? 'bg-amber-700'
				: t.color == 'blue'
				? 'bg-blue-700'
				: t.color == 'green'
				? 'bg-lime-700'
				: t.color == 'red'
				? 'bg-red-700'
				: 'bg-stone-800'}
      "
		>
			<div>{t.message}</div>
			<ButtonText
				compact
				on:click={() => {
					toast.close(t.id);
				}}
			>
				<div class="text-white p-2">
					<Icon key="x-mark" size={16} />
				</div>
			</ButtonText>
		</div>
	{/each}
</div>
