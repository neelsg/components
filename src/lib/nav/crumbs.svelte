<script lang="ts">
	import { page } from '$app/stores';
	import { nav, type navNode } from './nav.js';
	import Link from '../widget/link.svelte';
	import CrumbText from './_crumbText.svelte';

	export let nodes: navNode[];
	export let node: string | null = null;
	export let prepend: navNode[] = [];
	export let append: navNode[] = [];
	export let context: unknown = false;

	$: nodes = [
		...prepend,
		...(nav.getAncestors(node || $page.route.id, nodes, context) ?? []),
		...append
	];
</script>

{#each nodes as n, i}
	{#if i == nodes.length - 1}
		<CrumbText node={n} heading />
	{:else}
		<div class="flex items-center">
			{#if n.url}
				<Link href={n.url} color="blue" upper={false} compact>
					<CrumbText node={n} />
				</Link>
			{:else}
				<CrumbText node={n} />
			{/if}
			<div class="p-1 text-stone-500">/</div>
		</div>
	{/if}
{/each}
