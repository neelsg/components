<script lang="ts">
	import type { navNode } from './nav.js';
	import Icon from '../widget/icon.svelte';

	export let node: navNode;

	let width: number = 0;
</script>

<svelte:window bind:innerWidth={width} />

<div class="p-0.5 text-sm flex space-x-1 items-center">
	{#if node.icon && (width > 640 || (!node.label && !node.labelShort))}
		<Icon key={node.icon} />
	{/if}
	{#if node.labelShort && width <= 640}
		<div>{node.labelShort}</div>
	{:else if node.label}
		<div>{node.label}</div>
	{/if}
</div>
