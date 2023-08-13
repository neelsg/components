<script lang="ts">
	import { fade } from 'svelte/transition';
	import Icon from './icon.svelte';

	export let src: string;
	export let alt: string;
	export let width: number = 320;
	export let height: number = 180;
	export let cover: boolean = false;

	let opened: boolean = false;
	let windowHeight: number;
	let outlineDiv: HTMLDivElement;
</script>

<button
	type="button"
	class="rounded cursor-zoom-in"
	on:click|stopPropagation={() => (opened = true)}
>
	<img
		style="max-width: {width}px; max-height: {height}px"
		class="rounded {cover ? 'object-cover' : 'object-contain'}"
		{src}
		{alt}
	/>
</button>

{#if opened}
	<div class="absolute w-0 h-0 p-0 m-0">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			bind:clientHeight={windowHeight}
			bind:this={outlineDiv}
			on:click={() => (opened = false)}
			transition:fade={{ duration: 150 }}
			class="fixed inset-0 z-10 bg-black bg-opacity-60 p-1
        {windowHeight < outlineDiv?.scrollHeight ? 'overflow-y-scroll' : ''}
      "
		>
			<div
				class="relative
          flex justify-center
        "
			>
				<button
					on:click|preventDefault
					class="p-1 rounded-full transition-opacity
            text-white text-opacity-50 hover:text-opacity-70 active:text-opacity-100
            bg-black bg-opacity-40 hover:bg-opacity-60 active:bg-opacity-90
            absolute top-1 right-1
          "
				>
					<Icon key="x-mark" />
				</button>
				<img class="rounded object-contain max-w-full" {src} {alt} />
			</div>
		</div>
	</div>
{/if}
