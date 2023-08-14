<script lang="ts">
	import type { navNode } from './nav.js';
	import Icon from '../widget/icon.svelte';

	export let node: navNode;
</script>

{#if node.label}
	<div class="p-0.5 text-sm">{node.label}</div>
{:else}
	<div class="p-0.5">
		<Icon key={node.icon ?? 'x-circle'} />
	</div>
{/if}
