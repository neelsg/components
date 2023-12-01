<script lang="ts" context="module">
	import type { iconPaths } from '../widget/icon.svelte';
	import type { formAction } from './_formAction.svelte';
	import type { formBlock } from './_formBlock.svelte';
	import type { formDetail } from './_formDetail.svelte';

	export type form = {
		title: string;
		icon?: keyof typeof iconPaths;
		cancelled?: (meta: unknown, doc: unknown) => boolean;
		sections: (formBlock | formDetail)[];
		actions?: formAction[];
	};
</script>

<script lang="ts">
	import FormAction from './_formAction.svelte';
	import FormBlock from './_formBlock.svelte';
	import FormDetail from './_formDetail.svelte';
	import Icon from '../widget/icon.svelte';

	export let definition: form;
	export let meta: unknown = null;
	export let doc: { [key: string]: any };
	export let disabled: boolean = false;

	$: cancelled = (definition.cancelled && definition.cancelled(meta, doc)) ?? false;
</script>

<div class="flex flex-col p-0.5">
	<div class="w-full font-semibold">
		<div
			class="
        flex w-full justify-between items-center border-y
        {cancelled ? 'text-red-700 dark:text-red-500 border-red-500' : 'border-transparent'}
      "
		>
			<div class="flex p-0.5">
				{#if definition.icon}<div class="pr-2 py-0.5"><Icon key={definition.icon} /></div>{/if}
				<div class="text-lg">{definition.title}</div>
			</div>
			{#if cancelled}
				<div>CANCELLED</div>
			{/if}
			<div class="flex">
				{#each definition.actions ?? [] as a}
					{#if !disabled || a.no_disable}
						{#if !a.hide || !a.hide(meta, doc)}
							<FormAction definition={a} />
						{/if}
					{/if}
				{/each}
			</div>
		</div>
	</div>

	{#each definition.sections as s}
		{#if !s.hide || !s.hide(meta, doc)}
			{#if s.type == 'block'}
				<FormBlock definition={s} {meta} {disabled} bind:doc />
			{:else if s.type == 'detail'}
				<FormDetail definition={s} {meta} {disabled} bind:doc />
			{:else}
				<div class="text-red-600">UNKNOWN SECTION TYPE</div>
			{/if}
		{/if}
	{/each}
</div>
