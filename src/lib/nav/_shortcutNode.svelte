<script lang="ts">
	import type { navNode } from './nav.js';
	import { shortcuts } from './shortcuts.svelte';
	import Link from '../widget/link.svelte';
	import ButtonText from '../widget/buttonText.svelte';
	import Icon from '../widget/icon.svelte';
	import Card from '../widget/card.svelte';

	export let node: navNode;
</script>

{#if (node.children ?? []).filter((n) => !n.iconOnly).length > 0}
	<div
		class="w-full rounded-tl border-t border-l mb-1
      {node.color == 'slate'
			? 'border-slate-500'
			: node.color == 'gray'
			? 'border-gray-500'
			: node.color == 'zinc'
			? 'border-zinc-500'
			: node.color == 'neutral'
			? 'border-neutral-500'
			: node.color == 'stone'
			? 'border-stone-500'
			: node.color == 'red'
			? 'border-red-500'
			: node.color == 'orange'
			? 'border-orange-500'
			: node.color == 'amber'
			? 'border-amber-500'
			: node.color == 'yellow'
			? 'border-yellow-500'
			: node.color == 'lime'
			? 'border-lime-500'
			: node.color == 'green'
			? 'border-green-500'
			: node.color == 'emerald'
			? 'border-emerald-500'
			: node.color == 'teal'
			? 'border-teal-500'
			: node.color == 'cyan'
			? 'border-cyan-500'
			: node.color == 'sky'
			? 'border-sky-500'
			: node.color == 'blue'
			? 'border-blue-500'
			: node.color == 'indigo'
			? 'border-indigo-500'
			: node.color == 'violet'
			? 'border-violet-500'
			: node.color == 'purple'
			? 'border-purple-500'
			: node.color == 'fuchsia'
			? 'border-fuchsia-500'
			: node.color == 'pink'
			? 'border-pink-500'
			: node.color == 'rose'
			? 'border-rose-500'
			: 'border-stone-500'}
    "
	>
		{#if node.url}
			<div class="w-full flex">
				<Link href={node.url} full upper={false}>
					<div class="text-lg flex items-center">
						<div class="w-10 flex">
							{#if node.icon}<Icon key={node.icon} />{/if}
						</div>
						<div>{node.label}</div>
					</div>
				</Link>
				<div class="flex flex-col justify-center">
					<ButtonText compact on:click={() => shortcuts.remove(node.url ?? '')}>
						<Icon key="x-mark" size={22} />
					</ButtonText>
				</div>
			</div>
		{:else}
			<div class="w-full text-lg flex items-center p-2">
				<div class="w-10 flex">
					{#if node.icon}<Icon key={node.icon} />{/if}
				</div>
				<div>{node.label}</div>
			</div>
		{/if}
		<div class="pl-3 w-full flex flex-wrap">
			{#each node.children ?? [] as c}
				<svelte:self node={c} />
			{/each}
		</div>
	</div>
{:else}
	{#if node.url}
		<div class="w-80 p-1">
			<Card color={node.color ?? null} href={node.url} compact>
				<div class="w-full flex items-center py-1">
					<div class="w-10 flex justify-end">
						{#if node.icon}<Icon key={node.icon} />{/if}
					</div>
					<div class="w-full p-2 font-semibold">
						{node.label}
					</div>
					<div class="pr-0.5">
						<ButtonText compact on:click={() => shortcuts.remove(node.url ?? '')}>
							<Icon key="x-mark" size={20} />
						</ButtonText>
					</div>
				</div>
			</Card>
		</div>
	{/if}
	{#each node.children ?? [] as c}
		<svelte:self node={c} />
	{/each}
{/if}
