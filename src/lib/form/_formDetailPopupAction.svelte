<script lang="ts">
	import Button from '../widget/button.svelte';
	import Icon from '../widget/icon.svelte';
	import type { formDetailAction } from './_formDetailAction.svelte';

	export let definition: formDetailAction;
	export let meta: unknown;
	export let doc: { [key: string]: any };
	export let item: any;
	export let disabled: boolean;

	const onClick = () => {
		definition.click(item);
		item = item;
	};
</script>

<div class="p-0.5">
	<Button
		color={definition.color}
		on:click={onClick}
		disabled={(disabled && !definition.no_disable) ||
			(definition.disable && definition.disable(meta, doc, item))}
	>
		<div class="flex space-x-1 justify-center">
			{#if definition.icon}<div><Icon key={definition.icon} /></div>{/if}
			{#if definition.label}<div>{definition.label}</div>{/if}
		</div>
	</Button>
</div>
