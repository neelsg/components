<script lang="ts" context="module">
	import type { iconPaths } from '../widget/icon.svelte';
	import type { colorBasic } from '../util/color';

	export type formDetailAction = {
		label?: string;
		icon: keyof typeof iconPaths;
		color?: (typeof colorBasic)[number];
		click: (item: unknown) => void;
		hide?: (meta: unknown, doc: unknown) => boolean;
		disable?: (meta: unknown, doc: unknown, item: unknown) => boolean;
		no_disable?: boolean;
	};
</script>

<script lang="ts">
	import ButtonText from '../widget/buttonText.svelte';
	import Icon from '../widget/icon.svelte';

	export let definition: formDetailAction;
	export let meta: unknown;
	export let doc: { [key: string]: any };
	export let item: any;
	export let disabled: boolean;
	export let fixed: boolean = false;
	export let index: number;
	export let sectionKey: string;

	const onClick = () => {
		if (!fixed && index == doc[sectionKey].length - 1) {
			doc[sectionKey] = [...doc[sectionKey], {}];
		}

		definition.click(item);
		doc = doc;
	};
</script>

<ButtonText
	compact
	color={definition.color}
	on:click={onClick}
	disabled={(disabled && !definition.no_disable) ||
		(definition.disable && definition.disable(meta, doc, item))}
>
	<div class="py-1 rounded border border-stone-500">
		<Icon key={definition.icon} />
	</div>
</ButtonText>
