<script lang="ts" context="module">
	import type { iconPaths } from '../widget/icon.svelte';
	import type { colorBasic } from '../util/color';

	export type formAction = {
		label?: string;
		icon?: keyof typeof iconPaths;
		color?: (typeof colorBasic)[number];
		click?: () => void;
		hide?: (meta: unknown, doc: unknown) => boolean;
		submit?: boolean;
		no_disable?: boolean;
		min_width?: number;
	};
</script>

<script lang="ts">
	import Button from '../widget/button.svelte';
	import Icon from '../widget/icon.svelte';

	export let definition: formAction;
</script>

<div class="p-0.5">
	<Button
		type={definition.submit ? 'submit' : 'button'}
		color={definition.color}
		on:click={() => {
			if (definition.click) definition.click();
		}}
	>
		<div
			class="flex space-x-1 justify-center"
			style="min-width: {(definition.min_width || 0) * 4}px;"
		>
			{#if definition.icon}<div><Icon key={definition.icon} /></div>{/if}
			{#if definition.label}<div>{definition.label}</div>{/if}
		</div>
	</Button>
</div>
