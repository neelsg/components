<script lang="ts">
	import type { navNode } from './nav.js';
	import Icon from '../widget/icon.svelte';

	export let node: navNode;
	export let heading: boolean = false;

	let width: number = 0;
</script>

<svelte:window bind:innerWidth={width} />

<div
	class="
		p-0.5 flex space-x-1 items-center
		{heading ? 'text-lg font-semibold' : 'text-sm'}
	"
>
	{#if node.icon && (width > 800 || (!node.label && !node.labelShort))}
		<Icon key={node.icon} />
	{/if}
	{#if node.labelShort && width <= 800}
		<div>{node.labelShort}</div>
	{:else if node.label}
		<div>{node.label}</div>
	{/if}
</div>
