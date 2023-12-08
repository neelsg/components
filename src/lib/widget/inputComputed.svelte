<!--
Computed inputs aren't really inputs at all, they just follow a similar style
-->

<script lang="ts">
	import { formattedNumber } from '../util/number';
	import Icon from './icon.svelte';

	export let value: any; // this is the value that will be displayed
	export let label: string | null = null; // this is displayed if not null
	export let align: 'left' | 'center' | 'right' = 'left'; // alignment of the value in the input
	export let labelSize: number = 50.0; // only applicable if label is not null. input is 100, so 50 is 1/3
	export let disabled: boolean = false; // disable the input
	export let space: boolean = false; // add some padding around the input
	export let affix: string = ''; // any text to the right of the field
	export let dataType: 'text' | 'number' | 'check' = 'text';
	export let decimals: number = 2;

	let windowWidth: number = 0;
</script>

<svelte:window bind:innerWidth={windowWidth} />

<div
	class="cursor-default w-full flex flex-col sm:flex-row items-start sm:items-center {space
		? 'p-1'
		: ''}"
>
	{#if label}
		<div style="width: {windowWidth < 640 ? 100 : labelSize}%" class="pt-1 sm:pr-1 sm:pb-1">
			{label}
		</div>
	{/if}
	<div
		class="w-full flex flex-wrap sm:flex-nowrap
		{align == 'center' ? 'justify-center' : align == 'right' ? 'justify-end' : 'justify-start'}
	"
	>
		<div
			class="py-1 flex {dataType != 'check' ? 'w-full' : ''} rounded border transition-colors
				{align == 'center' ? 'justify-center' : align == 'right' ? 'justify-end' : 'justify-start'}
				{disabled
				? 'border-stone-400 dark:border-stone-700 text-stone-700 dark:text-stone-300'
				: 'border-stone-700 dark:border-stone-400 text-black dark:text-white'}
				bg-transparent
			"
		>
			{#if dataType == 'check'}
				<div
					style="width: 30px"
					class="flex justify-center
					{value ? '' : 'text-stone-300 dark:text-stone-700'}
				"
				>
					<Icon key={value ? 'check' : 'x-mark'} />
				</div>
			{:else if dataType == 'number'}
				<div class="px-1">
					{formattedNumber(value ?? 0, decimals)}
				</div>
			{:else}
				&nbsp;
				{value ?? ''}
				&nbsp;
			{/if}
		</div>
		{#if affix}
			<div class="w-full p-1 font-semibold">{affix}</div>
		{/if}
	</div>
</div>
