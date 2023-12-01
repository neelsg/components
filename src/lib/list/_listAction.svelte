<script lang="ts" context="module">
	import type { iconPaths } from '../widget/icon.svelte';
	import type { colorBasic } from '../util/color';

	export type listAction = {
		icon: keyof typeof iconPaths;
		color?: (typeof colorBasic)[number];
		click: (meta: unknown) => void;
		hide?: (meta: unknown) => boolean;
	};
</script>

<script lang="ts">
	import Button from '../widget/button.svelte';
	import Icon from '../widget/icon.svelte';

	export let definition: listAction;
	export let meta: unknown;
	export let disabled: boolean;
</script>

<div class="border-l border-transparent">
	<Button
		color={definition.color}
		on:click={() => {
			if (definition.click) definition.click(meta);
		}}
		{disabled}
		square
		compact
	>
		<div class="py-0.5 px-1">
			<Icon key={definition.icon} />
		</div>
	</Button>
</div>
