<script lang="ts" context="module">
	import { numberFormat } from '../util/number';

	type fieldText = {
		type: 'text' | 'email' | 'date' | 'password' | 'search' | 'tel' | 'time' | 'url';
		required?: boolean;
		upper?: boolean;
		unique?: boolean;
	};

	type fieldCheck = {
		type: 'check';
		required?: undefined;
	};

	type fieldDropdown = {
		type: 'dropdown';
		required?: boolean;
		upper?: boolean;
		options: (meta: unknown, doc: unknown, item: unknown) => string[] | string[][];
		unique?: boolean;
		validate?: boolean;
	};

	type fieldNumber = {
		type: 'number';
		required?: boolean;
		step?: number;
		min?: number;
		max?: number;
		decimals?: number;
	};

	type fieldOption = {
		type: 'option';
		required?: boolean;
		col?: boolean;
		options: (meta: unknown, doc: unknown, item: unknown) => string[] | string[][];
		blank?: string;
	};

	type fieldOptionMulti = {
		type: 'option-multi';
		required?: undefined;
		col?: boolean;
		options: (meta: unknown, doc: unknown, item: unknown) => string[] | string[][];
		blank?: string;
	};

	type fieldComputed = {
		type: 'computed';
		required?: undefined;
		format?: 'text' | 'number' | 'check';
		decimals?: number;
		fn?: (meta: unknown, doc: unknown, item: unknown) => unknown;
	};

	export type formDetailField = {
		key: string;
		label: string;
		align?: 'left' | 'center' | 'right';
		hide?: (meta: unknown, doc: unknown) => boolean;
		input?: (meta: unknown, doc: unknown, item: unknown) => void;
		disable?: (meta: unknown, doc: unknown, item: unknown) => boolean;
	} & (
		| fieldText
		| fieldCheck
		| fieldDropdown
		| fieldNumber
		| fieldOption
		| fieldOptionMulti
		| fieldComputed
	);

	export const formDetailFieldValue = (
		definition: formDetailField,
		meta: unknown,
		doc: { [key: string]: any },
		item: unknown
	): string => {
		const i = item as { [key: string]: any };
		if (definition.type == 'computed') {
			const v = definition.fn ? definition.fn(meta, doc, item) : i[definition.key];
			if (definition.format == 'number') return numberFormat(v, definition.decimals ?? 0);
			if (definition.format == 'check') return v ? 'Yes' : 'No';
		}
		if (definition.type == 'number')
			return numberFormat(i[definition.key] ?? 0, definition.decimals ?? 0);
		if (definition.type == 'check') return i[definition.key] ? 'Yes' : 'No';
		return i[definition.key] ?? '';
	};
</script>

<script lang="ts">
	import Input from '../widget/input.svelte';
	import InputCheck from '../widget/inputCheck.svelte';
	import InputDropdown from '../widget/inputDropdown.svelte';
	import InputNumber from '../widget/inputNumber.svelte';
	import InputOption from '../widget/inputOption.svelte';
	import InputOptionMulti from '../widget/inputOptionMulti.svelte';
	import InputComputed from '../widget/inputComputed.svelte';

	export let definition: formDetailField;
	export let meta: unknown;
	export let doc: { [key: string]: any };
	export let item: any;
	export let disabled: boolean;
	export let fixed: boolean = false;
	export let index: number;
	export let sectionKey: string;

	const onInput = () => {
		if (!fixed && index == doc[sectionKey].length - 1) {
			doc[sectionKey] = [...doc[sectionKey], {}];
		}

		if (definition.input) {
			definition.input(meta, doc, item);
			doc = doc;
		}
	};

	const fieldUsed = (index: number, doc: unknown): string[] => {
		const d = doc as { [key: string]: any };
		return d[sectionKey]
			.filter((e: unknown, i: number) => i != index)
			.map((v: any) => v[definition.key]);
	};

	$: required = definition.required
		? Object.keys(item).reduce((p, c) => {
				return item[c] ? true : p;
		  }, false)
		: false;
</script>

{#if definition.type == 'text' || definition.type == 'email' || definition.type == 'date' || definition.type == 'password' || definition.type == 'search' || definition.type == 'tel' || definition.type == 'time' || definition.type == 'url'}
	<Input
		bind:value={item[definition.key]}
		on:input={onInput}
		disabled={disabled || (definition.disable && definition.disable(meta, doc, item))}
		align={definition.align}
		type={definition.type}
		upper={definition.upper}
		used={definition.unique ? fieldUsed(index, doc) : []}
		{required}
	/>
{:else if definition.type == 'check'}
	<InputCheck
		bind:value={item[definition.key]}
		on:input={onInput}
		disabled={disabled || (definition.disable && definition.disable(meta, doc, item))}
		align={definition.align}
	/>
{:else if definition.type == 'dropdown'}
	<InputDropdown
		bind:value={item[definition.key]}
		on:input={onInput}
		disabled={disabled || (definition.disable && definition.disable(meta, doc, item))}
		align={definition.align}
		upper={definition.upper}
		options={definition.options(meta, doc, item)}
		used={definition.unique ? fieldUsed(index, doc) : []}
		validate={definition.validate}
		{required}
	/>
{:else if definition.type == 'number'}
	<InputNumber
		bind:value={item[definition.key]}
		on:input={onInput}
		disabled={disabled || (definition.disable && definition.disable(meta, doc, item))}
		align={definition.align}
		step={definition.step}
		min={definition.min}
		max={definition.max}
		{required}
	/>
{:else if definition.type == 'option'}
	<InputOption
		bind:value={item[definition.key]}
		on:input={onInput}
		disabled={disabled || (definition.disable && definition.disable(meta, doc, item))}
		col={definition.col}
		options={definition.options(meta, doc, item)}
		blank={definition.blank}
	/>
{:else if definition.type == 'option-multi'}
	<InputOptionMulti
		bind:value={item[definition.key]}
		on:input={onInput}
		disabled={disabled || (definition.disable && definition.disable(meta, doc, item))}
		col={definition.col}
		options={definition.options(meta, doc, item)}
		blank={definition.blank}
	/>
{:else if definition.type == 'computed'}
	<InputComputed
		value={definition.fn ? definition.fn(meta, doc, item) : item[definition.key]}
		align={definition.align}
		dataType={definition.format}
		decimals={definition.decimals}
	/>
{:else}
	<div class="text-red-600">UNKNOWN FIELD TYPE</div>
{/if}
