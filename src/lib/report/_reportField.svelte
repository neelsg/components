<script lang="ts" context="module">
	import type { reportItem } from './_reportItem.svelte';
	import type { pdfWidth } from '../widget/pdf.svelte';
	import { formattedNumber } from '../util/number';

	type fieldText = {
		type?: 'text' | undefined;
	};

	type fieldCheck = {
		type: 'check';
	};

	type fieldNumber = {
		type: 'number';
		decimals?: number;
	};

	export type reportField = {
		key: string;
		label: string | string[];
		align?: 'left' | 'center' | 'right';
		width?: pdfWidth;
	} & (fieldText | fieldCheck | fieldNumber);

	export const reportFieldValue = (definition: reportField, item: reportItem): string => {
		if ((item._mask ?? []).includes(definition.key)) {
			return ' ';
		}
		if (definition.type == 'number') {
			if (!item[definition.key]) return '-';
			return formattedNumber(item[definition.key], definition.decimals ?? 0);
		}
		if (definition.type == 'check') return item[definition.key] ? 'Yes' : '-';
		return item[definition.key] ?? ' ';
	};
</script>

<script lang="ts">
	export let definition: reportField;
	export let item: reportItem;
</script>

{reportFieldValue(definition, item)}
