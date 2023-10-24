<!--
Input of digital bits that displays the resulting decimal and hex value
-->

<script lang="ts">
	export let value = 0; // the value you end up with
	export let signed = false; // if signed, the value is a 2's compliment
	export let bits = 1; // number of bits in the value
	export let disabled: boolean = false; // disable input

	if (value > 2 ** bits - 1) value = 2 ** bits - 1;
	if (value < 0) value = 0;

	const update = (bit: number) => {
		return () => {
			if (value & (2 ** bit)) {
				value -= 2 ** bit;
			} else {
				value += 2 ** bit;
			}
			if (value > 2 ** bits - 1) value = 2 ** bits - 1;
			if (value < 0) value = 0;
		};
	};

	const signedBit = (bit: number): boolean => signed && (bit == bits - 1 || bit == 15);

	const placeValue = (bit: number): number => {
		if (signedBit(bit)) return 0 - 2 ** bit;
		return 2 ** bit;
	};
</script>

<div class="px-1 flex text-xs">
	{#each [...Array(bits > 16 ? 16 : bits).keys()].reverse() as i}
		<button
			type="button"
			on:click|stopPropagation|preventDefault={update(i)}
			class="
        {i < 8 ? 'p-1' : 'py-1 px-0.5'} transition-colors
        border-y border-l
        {i == bits - 1 ? 'rounded-l' : ''}
        {disabled
				? 'border-stone-400 dark:border-stone-700'
				: 'border-stone-900 dark:border-stone-200'}
        {value & (2 ** i)
				? disabled
					? 'bg-stone-500 dark:bg-stone-600 text-white dark:text-stone-300'
					: signedBit(i)
					? 'bg-red-700 text-white hover:bg-red-500'
					: 'bg-teal-700 text-white hover:bg-teal-500'
				: disabled
				? 'bg-transparent text-stone-600 dark:text-stone-400'
				: 'bg-white dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-black dark:text-white'}
      "
			{disabled}
		>
			{placeValue(i)}
		</button>
	{/each}
	<div
		class="
      py-1 px-0.5 transition-colors flex justify-between
      border-y border-l rounded-r border-r
      {bits <= 4 ? 'w-10' : bits <= 8 ? 'w-16' : 'w-20'}
      {disabled
			? 'border-stone-400 dark:border-stone-700'
			: 'border-stone-900 dark:border-stone-200'}
      {disabled
			? 'bg-transparent text-stone-600 dark:text-stone-400'
			: 'bg-stone-100 dark:bg-stone-700 text-black dark:text-white'}
    "
	>
		<span>0x{value.toString(16)}</span>
		<span
			class={signed && (1 << ((bits > 16 ? 16 : bits) - 1)) & value
				? 'text-red-600 dark:text-red-400'
				: 'text-blue-700 dark:text-blue-400'}
		>
			{signed ? value - (((1 << ((bits > 16 ? 16 : bits) - 1)) & value) << 1) : value}
		</span>
	</div>
</div>
