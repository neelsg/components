<script lang="ts" context="module">
	import { formattedNumber } from '../util/number';

	type fieldText = {
		type: 'text' | 'email' | 'date' | 'password' | 'search' | 'tel' | 'time' | 'url';
		required?: boolean;
		upper?: boolean;
	};

	type fieldCheck = {
		type: 'check';
	};

	type fieldDropdown = {
		type: 'dropdown';
		required?: boolean;
		upper?: boolean;
		options: (meta: unknown, doc: unknown) => string[] | string[][];
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
		col?: boolean;
		options: (meta: unknown, doc: unknown) => string[] | string[][];
		blank?: string;
	};

	type fieldOptionMulti = {
		type: 'option-multi';
		col?: boolean;
		options: (meta: unknown, doc: unknown) => string[] | string[][];
		blank?: string;
	};

	type fieldTextArea = {
		type: 'text-area';
		required?: boolean;
		rows?: number;
	};

	type fieldComputed = {
		type: 'computed';
		format?: 'text' | 'number' | 'check';
		decimals?: number;
		fn?: (meta: unknown, doc: unknown) => unknown;
	};

	export type formBlockField = {
		key: string;
		key_description?: string;
		label: string;
		align?: 'left' | 'center' | 'right';
		hide?: (meta: unknown, doc: unknown) => boolean;
		input?: (meta: unknown, doc: unknown) => void;
		disable?: (meta: unknown, doc: unknown) => boolean;
		no_disable?: boolean;
	} & (
		| fieldText
		| fieldCheck
		| fieldDropdown
		| fieldNumber
		| fieldOption
		| fieldOptionMulti
		| fieldComputed
		| fieldTextArea
	);

	export const formBlockFieldValue = (
		definition: formBlockField,
		meta: unknown,
		doc: { [key: string]: any }
	): string => {
		if (definition.type == 'computed') {
			const v = definition.fn ? definition.fn(meta, doc) : doc[definition.key];
			if (definition.format == 'number') return formattedNumber(v, definition.decimals ?? 0);
			if (definition.format == 'check') return v ? 'Yes' : 'No';
		}
		if (definition.type == 'number')
			return formattedNumber(doc[definition.key] ?? 0, definition.decimals ?? 0);
		if (definition.type == 'check') return doc[definition.key] ? 'Yes' : 'No';
		return doc[definition.key] ?? '';
	};
</script>

<script lang="ts">
	import Input from '../widget/input.svelte';
	import InputCheck from '../widget/inputCheck.svelte';
	import InputDropdown from '../widget/inputDropdown.svelte';
	import InputNumber from '../widget/inputNumber.svelte';
	import InputOption from '../widget/inputOption.svelte';
	import InputOptionMulti from '../widget/inputOptionMulti.svelte';
	import InputText from '../widget/inputText.svelte';
	import InputComputed from '../widget/inputComputed.svelte';

	export let definition: formBlockField;
	export let meta: unknown;
	export let doc: { [key: string]: any };
	export let disabled: boolean;

	const onInput = () => {
		if (definition.input) {
			definition.input(meta, doc);
			doc = doc;
		}
	};

	$: isDisabled =
		(disabled && !definition.no_disable) || (definition.disable && definition.disable(meta, doc));
</script>

<div class="flex">
	<div class="w-full flex flex-wrap md:flex-nowrap">
		{#if definition.type == 'text' || definition.type == 'email' || definition.type == 'date' || definition.type == 'password' || definition.type == 'search' || definition.type == 'tel' || definition.type == 'time' || definition.type == 'url'}
			<Input
				bind:value={doc[definition.key]}
				on:input={onInput}
				label={definition.label}
				labelSize={100 / 3}
				disabled={isDisabled}
				affix={definition.key_description ? doc[definition.key_description] : null}
				align={definition.align}
				type={definition.type}
				required={definition.required}
				upper={definition.upper}
			/>
		{:else if definition.type == 'check'}
			<InputCheck
				bind:value={doc[definition.key]}
				on:input={onInput}
				label={definition.label}
				labelSize={100 / 3}
				disabled={isDisabled}
				affix={definition.key_description ? doc[definition.key_description] : null}
				align={definition.align}
			/>
		{:else if definition.type == 'dropdown'}
			<InputDropdown
				bind:value={doc[definition.key]}
				on:input={onInput}
				label={definition.label}
				labelSize={100 / 3}
				disabled={isDisabled}
				affix={definition.key_description ? doc[definition.key_description] : null}
				align={definition.align}
				required={definition.required}
				upper={definition.upper}
				options={definition.options(meta, doc)}
			/>
		{:else if definition.type == 'number'}
			<InputNumber
				bind:value={doc[definition.key]}
				on:input={onInput}
				label={definition.label}
				labelSize={100 / 3}
				disabled={isDisabled}
				affix={definition.key_description ? doc[definition.key_description] : null}
				align={definition.align}
				required={definition.required}
				step={definition.step}
				min={definition.min}
				max={definition.max}
			/>
		{:else if definition.type == 'option'}
			<InputOption
				bind:value={doc[definition.key]}
				on:input={onInput}
				label={definition.label}
				labelSize={100 / 3}
				disabled={isDisabled}
				affix={definition.key_description ? doc[definition.key_description] : null}
				col={definition.col}
				options={definition.options(meta, doc)}
				blank={definition.blank}
			/>
		{:else if definition.type == 'option-multi'}
			<InputOptionMulti
				bind:value={doc[definition.key]}
				on:input={onInput}
				label={definition.label}
				labelSize={100 / 3}
				disabled={isDisabled}
				affix={definition.key_description ? doc[definition.key_description] : null}
				col={definition.col}
				options={definition.options(meta, doc)}
				blank={definition.blank}
			/>
		{:else if definition.type == 'text-area'}
			<InputText
				bind:value={doc[definition.key]}
				on:input={onInput}
				label={definition.label}
				labelSize={100 / 3}
				disabled={isDisabled}
				affix={definition.key_description ? doc[definition.key_description] : null}
				align={definition.align}
				required={definition.required}
				rows={definition.rows}
			/>
		{:else if definition.type == 'computed'}
			<InputComputed
				value={definition.fn ? definition.fn(meta, doc) : doc[definition.key]}
				label={definition.label}
				labelSize={100 / 3}
				disabled={isDisabled}
				affix={definition.key_description ? doc[definition.key_description] : null}
				align={definition.align}
				dataType={definition.format}
				decimals={definition.decimals}
			/>
		{:else}
			<div class="text-red-600">UNKNOWN FIELD TYPE</div>
		{/if}
	</div>
</div>
