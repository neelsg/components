<script lang="ts">
	import Button from '../widget/button.svelte';
	import Icon from '../widget/icon.svelte';
	import type { formDetailAction } from './_formDetailAction.svelte';

	export let definition: formDetailAction;
	export let item: any;
</script>

<div class="p-0.5">
	<Button
		color={definition.color}
		on:click={() => {
			if (definition.click) definition.click(item);
		}}
	>
		<div class="flex space-x-1 justify-center">
			{#if definition.icon}<div><Icon key={definition.icon} /></div>{/if}
			{#if definition.label}<div>{definition.label}</div>{/if}
		</div>
	</Button>
</div>
