<script lang="ts" context="module">
	export type listField = {
		key: string;
		label: string;
		type?: 'text' | 'check' | 'number';
		align?: 'left' | 'center' | 'right';
		decimals?: number;
		fn?: (meta: unknown, item: { [key: string]: any }) => string | boolean | number;
		hide?: (meta: unknown) => boolean;
	};

	const formattedNumber = (value: number, decimals: number): string => {
		const r = (value || 0).toFixed(decimals).split('.');
		return r[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + (r[1] ? '.' + r[1] : '');
	};

	export const listFieldValue = (
		definition: listField,
		meta: unknown,
		item: { [key: string]: any }
	): string => {
		const v = definition.fn ? definition.fn(meta, item) : item[definition.key];
		if (typeof v == 'boolean') return v ? 'Y' : '';
		if (typeof v == 'undefined') return '';
		if (typeof v == 'number') return formattedNumber(v, definition.decimals ?? 0);
		return String(v);
	};
</script>

<script lang="ts">
	import Icon from '../widget/icon.svelte';

	export let definition: listField;
	export let meta: unknown;
	export let item: { [key: string]: any };
</script>

{#if definition.type == 'check'}
	<div class="w-5 text-center">
		{#if listFieldValue(definition, meta, item)}
			<Icon key="check" />
		{:else}
			<div class="text-stone-500">-</div>
		{/if}
	</div>
{:else}
	{listFieldValue(definition, meta, item)}
{/if}
