<script lang="ts">
	import type { navNode } from './nav.js';
	import Icon from '../widget/icon.svelte';

	export let node: navNode;
	export let heading: boolean = false;

	let width: number = 0;
</script>

<svelte:window bind:innerWidth={width} />

<div
	class="{heading
		? 'text-xl pb-1 px-0.5'
		: 'p-0.5 text-sm'} font-semibold flex space-x-1 items-center"
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
