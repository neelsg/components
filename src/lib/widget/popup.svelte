<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import Icon from './icon.svelte';
	import ButtonText from './buttonText.svelte';

	export const open = () => {
		opened = true;
	};

	export const close = () => {
		opened = false;
		dispatch('closed', {});
	};

	const dispatch = createEventDispatcher();

	let opened: boolean = false;
	let windowHeight: number;
	let outlineDiv: HTMLDivElement;
</script>

{#if opened}
	<div class="w-0 h-0 p-0 m-0">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			bind:clientHeight={windowHeight}
			bind:this={outlineDiv}
			on:click={close}
			transition:fade={{ duration: 150 }}
			class="fixed inset-0 z-10 bg-black bg-opacity-20 dark:bg-opacity-50
        p-4 sm:py-8 sm:px-12 md:px-20 lg:px-40
        {windowHeight < outlineDiv?.scrollHeight ? 'overflow-y-scroll' : ''}
      "
		>
			<div
				on:click|stopPropagation
				class="relative rounded bg-stone-100 dark:bg-stone-900
          shadow shadow-black dark:shadow-black dark:shadow-xl
          border border-stone-500
        "
			>
				<div class="flex justify-between p-1">
					<div>
						<slot name="top" />
					</div>
					<div>
						<ButtonText on:click={close}>
							<Icon size={20} key="x-mark" />
						</ButtonText>
					</div>
				</div>
				<div class="p-1">
					<slot />
				</div>
			</div>
		</div>
	</div>
{/if}
