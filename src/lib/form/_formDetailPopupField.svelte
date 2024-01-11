<script lang="ts">
	import type { formDetailField } from './_formDetailField.svelte';
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
	export let sectionKey: string;

	const onInput = () => {
		if (definition.input) {
			definition.input(meta, doc, item);
			doc = doc;
		}
	};

	$: isDisabled = disabled || (definition.disable && definition.disable(meta, doc, item));

	const fieldUsed = (): string[] => {
		const d = doc as { [key: string]: any };
		return d[sectionKey].map((v: any) => v[definition.key]);
	};
</script>

<div class="flex flex-col w-full">
	{#if definition.type == 'text' || definition.type == 'email' || definition.type == 'date' || definition.type == 'password' || definition.type == 'search' || definition.type == 'tel' || definition.type == 'time' || definition.type == 'url'}
		<Input
			bind:value={item[definition.key]}
			on:input={onInput}
			label={definition.label}
			labelSize={100 / 3}
			disabled={isDisabled}
			align={definition.align}
			type={definition.type}
			required={definition.required}
			upper={definition.upper}
			used={definition.unique ? fieldUsed() : []}
		/>
	{:else if definition.type == 'check'}
		<InputCheck
			bind:value={item[definition.key]}
			on:input={onInput}
			label={definition.label}
			labelSize={100 / 3}
			disabled={isDisabled}
			align={definition.align}
		/>
	{:else if definition.type == 'dropdown'}
		<InputDropdown
			bind:value={item[definition.key]}
			on:input={onInput}
			label={definition.label}
			labelSize={100 / 3}
			disabled={isDisabled}
			align={definition.align}
			required={definition.required}
			upper={definition.upper}
			validate={definition.validate}
			options={definition.options(meta, doc, item)}
			used={definition.unique ? fieldUsed() : []}
		/>
	{:else if definition.type == 'number'}
		<InputNumber
			bind:value={item[definition.key]}
			on:input={onInput}
			label={definition.label}
			labelSize={100 / 3}
			disabled={isDisabled}
			align={definition.align}
			required={definition.required}
			step={definition.step}
			min={definition.min}
			max={definition.max}
		/>
	{:else if definition.type == 'option'}
		<InputOption
			bind:value={item[definition.key]}
			on:input={onInput}
			label={definition.label}
			labelSize={100 / 3}
			disabled={isDisabled}
			col={definition.col}
			options={definition.options(meta, doc, item)}
			blank={definition.blank}
		/>
	{:else if definition.type == 'option-multi'}
		<InputOptionMulti
			bind:value={item[definition.key]}
			on:input={onInput}
			label={definition.label}
			labelSize={100 / 3}
			disabled={isDisabled}
			col={definition.col}
			options={definition.options(meta, doc, item)}
			blank={definition.blank}
		/>
	{:else if definition.type == 'computed'}
		<InputComputed
			value={definition.fn ? definition.fn(meta, doc, item) : item[definition.key]}
			label={definition.label}
			labelSize={100 / 3}
			align={definition.align}
			dataType={definition.format}
			decimals={definition.decimals}
		/>
	{:else}
		<div class="text-red-600">UNKNOWN FIELD TYPE</div>
	{/if}
</div>
