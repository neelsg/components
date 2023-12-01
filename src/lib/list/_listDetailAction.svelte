<script lang="ts" context="module">
	import type { iconPaths } from '../widget/icon.svelte';
	import type { colorBasic } from '../util/color';

	export type listDetailAction = {
		icon: keyof typeof iconPaths;
		color?: (typeof colorBasic)[number];
		click: (meta: unknown, item: { [key: string]: any }) => void;
		hide?: (meta: unknown, item: { [key: string]: any }) => boolean;
	};
</script>

<script lang="ts">
	import Button from '../widget/button.svelte';
	import Icon from '../widget/icon.svelte';

	export let definition: listDetailAction;
	export let meta: unknown;
	export let item: { [key: string]: any };
	export let disabled: boolean;
</script>

<div class="border-l border-transparent">
	<Button
		color={definition.color}
		on:click={() => {
			if (definition.click) definition.click(meta, item);
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
