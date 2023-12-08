<script lang="ts" context="module">
	type paramText = {
		type?: 'text' | 'email' | 'date' | 'search' | 'tel' | 'time' | 'url' | undefined;
		required?: boolean;
		upper?: boolean;
		key_to?: undefined;
	};

	type paramTextRange = {
		type?: 'text' | 'email' | 'date' | 'time' | undefined;
		upper?: boolean;
		key_to: string;
	};

	type paramCheck = {
		type: 'check';
		key_to?: undefined;
	};

	type paramDropdown = {
		type: 'dropdown';
		required?: boolean;
		upper?: boolean;
		options: () => string[] | string[][];
		validate?: boolean;
		key_to?: undefined;
	};

	type paramDropdownRange = {
		type: 'dropdown';
		upper?: boolean;
		options: () => string[] | string[][];
		key_to: string;
	};

	type paramNumber = {
		type: 'number';
		required?: boolean;
		step?: number;
		min?: number;
		max?: number;
		key_to?: undefined;
	};

	type paramNumberRange = {
		type: 'number';
		step?: number;
		min?: number;
		max?: number;
		key_to: string;
	};

	type paramOption = {
		type: 'option';
		col?: boolean;
		options: () => string[] | string[][];
		blank?: string;
		key_to?: undefined;
	};

	type paramOptionMulti = {
		type: 'option-multi';
		col?: boolean;
		options: () => string[] | string[][];
		blank?: string;
		key_to?: undefined;
	};

	export type reportParam = {
		key: string;
		label: string;
		align?: 'left' | 'center' | 'right';
		key_to?: string | undefined;
	} & (
		| paramText
		| paramTextRange
		| paramCheck
		| paramDropdown
		| paramDropdownRange
		| paramNumber
		| paramNumberRange
		| paramOption
		| paramOptionMulti
	);
</script>

<script lang="ts">
	import Input from '../widget/input.svelte';
	import InputCheck from '../widget/inputCheck.svelte';
	import InputDropdown from '../widget/inputDropdown.svelte';
	import InputNumber from '../widget/inputNumber.svelte';
	import InputOption from '../widget/inputOption.svelte';
	import InputOptionMulti from '../widget/inputOptionMulti.svelte';

	export let definition: reportParam;
	export let params: { [key: string]: any };
	export let disabled: boolean = false;

	const checkFrom = (definition: reportParam) => {
		if (definition.key_to) {
			if (params[definition.key_to]) {
				if (params[definition.key_to] < params[definition.key]) {
					params[definition.key_to] = params[definition.key];
				}
			}
		}
	};
	const checkTo = (definition: reportParam) => {
		if (definition.key_to) {
			if (params[definition.key]) {
				if (params[definition.key] > params[definition.key_to]) {
					params[definition.key] = params[definition.key_to];
				}
			}
		}
	};
</script>

<div class="w-full flex items-center">
	{#if typeof definition.type == 'undefined' || definition.type == 'text' || definition.type == 'email' || definition.type == 'date' || definition.type == 'search' || definition.type == 'tel' || definition.type == 'time' || definition.type == 'url'}
		{#if typeof definition.key_to == 'undefined'}
			<label for={definition.key} class="pl-1 w-1/4">
				{definition.label}
			</label>
			<div class="p-0.5 w-full">
				<Input
					bind:value={params[definition.key]}
					{disabled}
					align={definition.align}
					type={definition.type}
					required={definition.required}
					upper={definition.upper}
					name={definition.key}
				/>
			</div>
		{:else}
			<label for={definition.key} class="pl-1 w-1/2">
				{definition.label}
			</label>
			<div class="w-full p-0.5">
				<Input
					on:input={() => checkFrom(definition)}
					bind:value={params[definition.key]}
					{disabled}
					align={definition.align}
					type={definition.type}
					upper={definition.upper}
					name={definition.key}
				/>
			</div>
			<div class="w-full flex items-center p-0.5">
				<div class="pr-1">to</div>
				<Input
					on:input={() => checkTo(definition)}
					bind:value={params[definition.key_to]}
					{disabled}
					align={definition.align}
					type={definition.type}
					upper={definition.upper}
				/>
			</div>
		{/if}
	{:else if definition.type == 'check'}
		<label for={definition.key} class="pl-1 w-1/4">
			{definition.label}
		</label>
		<div class="p-0.5 w-full">
			<InputCheck
				bind:value={params[definition.key]}
				{disabled}
				align={definition.align}
				name={definition.key}
			/>
		</div>
	{:else if definition.type == 'dropdown'}
		{#if typeof definition.key_to == 'undefined'}
			<label for={definition.key} class="pl-1 w-1/4">
				{definition.label}
			</label>
			<div class="p-0.5 w-full">
				<InputDropdown
					bind:value={params[definition.key]}
					{disabled}
					align={definition.align}
					required={definition.required}
					upper={definition.upper}
					options={definition.options()}
					validate={definition.validate}
					name={definition.key}
				/>
			</div>
		{:else}
			<label for={definition.key} class="pl-1 w-1/2">
				{definition.label}
			</label>
			<div class="w-full p-0.5">
				<InputDropdown
					on:input={() => checkFrom(definition)}
					bind:value={params[definition.key]}
					{disabled}
					align={definition.align}
					upper={definition.upper}
					options={definition.options()}
					validate={false}
					name={definition.key}
				/>
			</div>
			<div class="w-full flex items-center p-0.5">
				<div class="pr-1">to</div>
				<InputDropdown
					on:input={() => checkTo(definition)}
					bind:value={params[definition.key_to]}
					{disabled}
					align={definition.align}
					upper={definition.upper}
					options={definition.options()}
					validate={false}
				/>
			</div>
		{/if}
	{:else if definition.type == 'number'}
		{#if typeof definition.key_to == 'undefined'}
			<label for={definition.key} class="pl-1 w-1/4">
				{definition.label}
			</label>
			<div class="p-0.5 w-full">
				<InputNumber
					bind:value={params[definition.key]}
					{disabled}
					align={definition.align}
					required={definition.required}
					step={definition.step}
					min={definition.min}
					max={definition.max}
					name={definition.key}
				/>
			</div>
		{:else}
			<label for={definition.key} class="pl-1 w-1/2">
				{definition.label}
			</label>
			<div class="w-full p-0.5">
				<InputNumber
					on:input={() => checkFrom(definition)}
					bind:value={params[definition.key]}
					{disabled}
					align={definition.align}
					step={definition.step}
					min={definition.min}
					max={definition.max}
					name={definition.key}
				/>
			</div>
			<div class="w-full flex items-center p-0.5">
				<div class="pr-1">to</div>
				<InputNumber
					on:input={() => checkTo(definition)}
					bind:value={params[definition.key_to]}
					{disabled}
					align={definition.align}
					step={definition.step}
					min={definition.min}
					max={definition.max}
				/>
			</div>
		{/if}
	{:else if definition.type == 'option'}
		<label for={definition.key} class="pl-1 w-1/4">
			{definition.label}
		</label>
		<div class="p-0.5 w-full">
			<InputOption
				bind:value={params[definition.key]}
				{disabled}
				col={definition.col}
				options={definition.options()}
				blank={definition.blank}
			/>
		</div>
	{:else if definition.type == 'option-multi'}
		<label for={definition.key} class="pl-1 w-1/4">
			{definition.label}
		</label>
		<div class="p-0.5 w-full">
			<InputOptionMulti
				bind:value={params[definition.key]}
				{disabled}
				col={definition.col}
				options={definition.options()}
				blank={definition.blank}
			/>
		</div>
	{:else}
		<div class="text-red-600">UNKNOWN FIELD TYPE</div>
	{/if}
</div>
