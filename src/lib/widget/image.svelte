<!--
Display an image that the user can click and zoom to view more details
-->

<script lang="ts">
	import { fade } from 'svelte/transition';
	import ButtonText from './buttonText.svelte';
	import Icon from './icon.svelte';
	import Zoomable from './zoomable.svelte';

	export let src: string; // the path to the actual image
	export let alt: string; // alt text
	export let width: number = 320; // image width in px
	export let height: number = 180; // image height in px
	export let cover: boolean = false; // fit the image using object-cover instead of object-contain

	let opened: boolean = false;
	let windowWidth: number;
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
			bind:clientWidth={windowWidth}
			bind:clientHeight={windowHeight}
			bind:this={outlineDiv}
			on:click={() => (opened = false)}
			transition:fade={{ duration: 150 }}
			class="fixed inset-0 z-10 bg-black bg-opacity-60 p-2
        {windowHeight < outlineDiv?.scrollHeight ? 'overflow-y-scroll' : ''}
      "
		>
			<div
				class="relative
          flex justify-center
        "
			>
				<div class="bg-white dark:bg-black rounded">
					<Zoomable home={false}>
						<div slot="top-right">
							<ButtonText compact on:click={() => (opened = false)}>
								<Icon size={20} key="x-mark" />
							</ButtonText>
						</div>
						<div style="width:{windowWidth - 48}px; height:{windowHeight - 48}px">
							<img style="min-width: 50%" class="mx-auto object-contain max-w-full" {src} {alt} />
						</div>
					</Zoomable>
				</div>
			</div>
		</div>
	</div>
{/if}
