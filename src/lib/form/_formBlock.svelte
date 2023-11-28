<script lang="ts" context="module">
	import type { formBlockField } from './_formBlockField.svelte';
	import type { formAction } from './_formAction.svelte';

	export type formBlock = {
		type: 'block';
		title?: string;
		fields: formBlockField[][];
		actions?: formAction[];
		hide?: (meta: unknown, doc: unknown) => boolean;
	};
</script>

<script lang="ts">
	import FormAction from './_formAction.svelte';
	import FormBlockField from './_formBlockField.svelte';

	export let definition: formBlock;
	export let meta: unknown;
	export let doc: { [key: string]: any };
	export let disabled: boolean;
</script>

<div class="flex justify-between w-full border-t border-stone-500">
	<div class="text-lg font-semibold p-1">{definition.title || ''}</div>
	<div class="flex">
		{#each definition.actions ?? [] as a}
			{#if !disabled || a.no_disable}
				{#if !(a.hide && a.hide(meta, doc))}
					<FormAction definition={a} />
				{/if}
			{/if}
		{/each}
	</div>
</div>
<div class="flex flex-wrap lg:flex-nowrap">
	{#each definition.fields as c}
		<div class="flex flex-col p-1 w-full space-y-1">
			{#each c as f}
				{#if !(f.hide && f.hide(meta, doc))}
					<FormBlockField definition={f} {meta} {disabled} bind:doc />
				{/if}
			{/each}
		</div>
	{/each}
</div>
