<script lang="ts">
	import Input from '$lib/widget/input.svelte';
	import InputText from '$lib/widget/inputText.svelte';
	import InputCheck from '$lib/widget/inputCheck.svelte';
	import InputNumber from '$lib/widget/inputNumber.svelte';
	import InputOption from '$lib/widget/inputOption.svelte';
	import InputOptionMulti from '$lib/widget/inputOptionMulti.svelte';
	import InputDropdown from '$lib/widget/inputDropdown.svelte';

	let val = '';
	let valText = '';
	let valCheck = false;
	let valNum: number = 0;
	let valOpt = '';
	let valOptMul: string[] = [];
	let valDrop = '';
	let count = 0;
	let countText = 0;
	let countCheck = 0;
	let countNum = 0;
	let countOpt = 0;
	let countOptMul = 0;
	let countDrop = 0;
</script>

<div class="p-1 text-xl">Standard</div>

<div class="p-1 flex space-x-2">
	<label for="in1" class="w-1/2">Value: {val}, Input count: {count}, Value type: {typeof val}</label
	>
	<Input bind:value={val} name="in1" on:input={() => count++} />
</div>

<div class="p-1">
	<Input bind:value={val} required placeholder="This one is required..." />
</div>

<div class="p-1">
	<Input bind:value={val} type="email" placeholder="This one expects an email..." />
</div>

<div class="p-1">
	<Input bind:value={val} type="password" placeholder="This one expects a password..." />
</div>

<div class="p-1">
	<Input bind:value={val} type="date" placeholder="This one expects a date..." align="center" />
</div>

<div class="p-1">
	<Input bind:value={val} type="search" placeholder="This one expects a search..." />
</div>

<div class="p-1">
	<Input bind:value={val} type="tel" placeholder="This one expects a tel..." align="right" />
</div>

<div class="p-1">
	<Input bind:value={val} type="time" placeholder="This one expects a time..." align="center" />
</div>

<div class="p-1">
	<Input bind:value={val} type="url" placeholder="This one expects a url..." />
</div>

<div class="p-1">
	<Input bind:value={val} disabled placeholder="This one is disabled..." />
</div>

<div class="p-1">
	<Input bind:value={val} label="This one has a label property" />
</div>

<div class="p-1 text-xl">Textarea</div>

<div class="p-1 flex space-x-2">
	<label for="in2" class="w-1/2"
		>Value: {valText}, Input count: {countText}, Value type: {typeof valText}</label
	>
	<InputText bind:value={valText} name="in2" on:input={() => countText++} />
</div>

<div class="p-1">
	<InputText bind:value={valText} required placeholder="This one is required..." />
</div>

<div class="p-1">
	<InputText bind:value={valText} disabled placeholder="This one is disabled..." />
</div>

<div class="p-1">
	<InputText bind:value={valText} label="This one has a label property" />
</div>

<div class="p-1">
	<InputText bind:value={valText} rows={3} label="This one only has 3 rows" />
</div>

<div class="p-1 text-xl">Checkbox</div>

<div class="p-1 flex space-x-2">
	<label for="in3" class="w-1/2"
		>Value: {valCheck}, Input count: {countCheck}, Value type: {typeof valCheck}</label
	>
	<InputCheck name="in3" bind:value={valCheck} align="center" on:input={() => countCheck++} />
</div>

<div class="p-1 flex space-x-2">
	<InputCheck bind:value={valCheck} align="right" label="This one has a label property" />
</div>

<div class="p-1 flex space-x-2">
	<InputCheck bind:value={valCheck} disabled label="This one is disabled" />
</div>

<div class="p-1 text-xl">Number</div>

<div class="p-1 flex space-x-2">
	<label for="in4" class="w-1/2"
		>Value: {valNum}, Input count: {countNum}, Value type: {typeof valNum}</label
	>
	<InputNumber bind:value={valNum} name="in4" on:input={() => countNum++} />
</div>

<div class="p-1">
	<InputNumber bind:value={valNum} required placeholder="This one is required..." />
</div>

<div class="p-1">
	<InputNumber bind:value={valNum} align="right" disabled placeholder="This one is disabled..." />
</div>

<div class="p-1">
	<InputNumber bind:value={valNum} align="center" label="This one has a label property" />
</div>

<div class="p-1 text-xl">Options</div>

<div class="p-1 flex space-x-2">
	<div class="w-1/2">Value: {valOpt}, Input count: {countOpt}, Value type: {typeof valOpt}</div>
	<InputOption bind:value={valOpt} on:input={() => countOpt++} options={['A', 'B', 'C']} />
</div>

<div class="p-1 flex space-x-2">
	<InputOption
		bind:value={valOpt}
		label="This one has a label property"
		options={['A', 'B', 'C']}
	/>
</div>

<div class="p-1 flex space-x-2">
	<InputOption
		bind:value={valOpt}
		disabled
		label="This one is disabled"
		options={['A', 'B', 'C']}
	/>
</div>

<div class="p-1 text-xl">Options Multi-Select</div>

<div class="p-1 flex space-x-2">
	<div class="w-1/2">
		Value: {valOptMul}, Input count: {countOptMul}, Value type: {typeof valOptMul}
	</div>
	<InputOptionMulti
		bind:value={valOptMul}
		on:input={() => countOptMul++}
		options={['A', 'B', 'C']}
	/>
</div>

<div class="p-1 flex space-x-2">
	<InputOptionMulti
		bind:value={valOptMul}
		label="This one has a label property"
		options={['A', 'B', 'C']}
	/>
</div>

<div class="p-1 flex space-x-2">
	<InputOptionMulti
		bind:value={valOptMul}
		disabled
		label="This one is disabled"
		options={['A', 'B', 'C']}
	/>
</div>

<div class="p-1 text-xl">Dropdown</div>

<div class="p-1 flex space-x-2">
	<label for="in6" class="w-1/2"
		>Value: {valDrop}, Input count: {countDrop}, Value type: {typeof valDrop}</label
	>
	<InputDropdown
		bind:value={valDrop}
		name="in6"
		options={[
			['A', '1'],
			['B', '2'],
			['C', '3']
		]}
		on:input={() => countDrop++}
	/>
</div>

<div class="p-1">
	<InputDropdown
		bind:value={valDrop}
		options={[
			['A', '1'],
			['B', '2'],
			['C', '3']
		]}
		required
		placeholder="This one is required..."
	/>
</div>

<div class="p-1">
	<InputDropdown
		bind:value={valDrop}
		options={[
			['A', '1'],
			['B', '2'],
			['C', '3']
		]}
		align="right"
		disabled
		placeholder="This one is disabled..."
	/>
</div>

<div class="p-1">
	<InputDropdown
		bind:value={valDrop}
		options={[
			['A', '1'],
			['B', '2'],
			['C', '3']
		]}
		align="center"
		label="This one has a label property"
	/>
</div>
