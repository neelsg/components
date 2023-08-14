<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { nav, type navNode } from './nav.js';
	import MenuNode from './_menuNode.svelte';
	import Icon from '../widget/icon.svelte';
	import ButtonText from '../widget/buttonText.svelte';

	export let collapsible: boolean = false;
	export let nodes: navNode[];
	export let context: unknown = false;
	export const open = () => {
		opened = true;
	};

	let opened: boolean = false;

	let childExpand: { [key: string]: boolean } = {};
	const childExpanded = (index: number) => {
		for (const i in childExpand) {
			if (i != String(index)) childExpand[i] = false;
		}
	};
</script>

{#if opened}
	<div class="w-0 h-0 p-0 m-0">
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			on:click={() => {
				opened = false;
			}}
			transition:fade={{ duration: 150 }}
			class="
        fixed inset-0 z-30 bg-black bg-opacity-20 dark:bg-opacity-50
      "
		>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				on:click|stopPropagation
				transition:fly={{ duration: 150, x: -300 }}
				class="
          flex flex-col fixed top-0 bottom-0 shadow shadow-stone-500 bg-stone-50 dark:bg-stone-950 border-r border-stone-500 w-5/6 sm:w-2/3 md:w-1/2 lg:w-1/3
          overflow-y-scroll justify-between
        "
			>
				<div class="flex flex-col">
					<ButtonText
						square
						on:click={() => {
							opened = false;
						}}
					>
						<div class="flex space-x-2 w-full justify-between pl-4 pr-3">
							<Icon key="bars-3" />
							<div class="w-64">Navigation</div>
							<Icon key="x-mark" />
						</div>
					</ButtonText>
					{#each nav.getVisible(nodes, context) as n, i}
						<MenuNode
							node={n}
							{context}
							{collapsible}
							bind:expanded={childExpand[String(i)]}
							on:expand={() => childExpanded(i)}
							on:click={() => {
								opened = false;
							}}
						/>
					{/each}
				</div>
				<footer class="mt-2 p-1 text-xs text-stone-700 dark:text-stone-500">
					<slot name="footer" />
				</footer>
			</div>
		</div>
	</div>
{/if}
