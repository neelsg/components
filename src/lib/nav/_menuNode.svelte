<script lang="ts">
	import { slide } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { nav, type navNode } from './nav.js';
	import Link from '../widget/link.svelte';
	import ButtonText from '../widget/buttonText.svelte';
	import Icon from '../widget/icon.svelte';

	export let node: navNode;
	export let context: unknown = false;
	export let collapsible: boolean;
	export let expanded: boolean = false;

	$: children = nav.getVisible(node.children ?? [], context);
	let childExpand: { [key: string]: boolean } = {};
	const childExpanded = (index: number) => {
		for (const i in childExpand) {
			if (i != String(index)) childExpand[i] = false;
		}
	};
	$: parentCollapse(expanded);
	const parentCollapse = (expanded: boolean) => {
		if (expanded) return;
		for (const i in childExpand) {
			childExpand[i] = false;
		}
	};

	const dispatch = createEventDispatcher();
	const click = (url: string) => {
		dispatch('click', { url });
	};
	const expand = () => {
		expanded = !expanded;
		if (expanded) dispatch('expand');
	};
</script>

{#if node.url || children.length > 0}
	<div
		class="
    w-full border-l-4 flex
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
			: 'border-transparent'}
  "
	>
		{#if node.url}
			<Link href={node.url} square full on:click={() => click(node.url ?? '')}>
				<div class="flex w-full">
					<div class="w-12 flex justify-center">
						{#if node.icon}
							<Icon key={node.icon} />
						{/if}
					</div>
					<div>{node.label}</div>
				</div>
			</Link>
			{#if children.filter((c) => !c.iconOnly).length > 0 && collapsible}
				<ButtonText square on:click={expand}>
					<div class="w-12 flex justify-center">
						<Icon key={expanded ? 'chevron-up' : 'chevron-down'} />
					</div>
				</ButtonText>
			{/if}
		{:else if collapsible && children.filter((c) => !c.iconOnly).length > 0}
			<ButtonText square full on:click={expand}>
				<div class="flex justify-between w-full">
					<div class="flex">
						<div class="w-12 flex justify-center">
							{#if node.icon}
								<Icon key={node.icon} />
							{/if}
						</div>
						<div>{node.label}</div>
					</div>
					<div class="w-12 flex justify-center">
						<Icon key={expanded ? 'chevron-up' : 'chevron-down'} />
					</div>
				</div>
			</ButtonText>
		{:else}
			<div
				class="uppercase font-semibold text-black dark:text-white flex justify-between w-full p-2"
			>
				<div class="flex">
					<div class="w-12 flex justify-center">
						{#if node.icon}
							<Icon key={node.icon} />
						{/if}
					</div>
					<div>{node.label}</div>
				</div>
			</div>
		{/if}
		{#each children.filter((c) => c.iconOnly) as c}
			<Link href={c.url ?? ''} square on:click={() => click(c.url ?? '')}>
				<div class="w-12 flex justify-center" title={c.label}>
					<Icon key={c.icon ?? 'no-symbol'} />
				</div>
			</Link>
		{/each}
	</div>
{/if}

{#if children.filter((c) => !c.iconOnly).length > 0 && (expanded || !collapsible)}
	<div
		transition:slide={{ duration: 150 }}
		class="
      border-t border-b border-stone-500 bg-stone-500 bg-opacity-10 flex flex-col
    "
	>
		{#each children.filter((c) => !c.iconOnly) as c, i}
			<svelte:self
				node={c}
				{context}
				bind:expanded={childExpand[String(i)]}
				on:click={(e) => {
					click(e.detail.url);
				}}
				on:expand={() => childExpanded(i)}
				{collapsible}
			/>
		{/each}
	</div>
{/if}
