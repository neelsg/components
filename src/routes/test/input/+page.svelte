<script lang="ts">
	import Input from '$lib/widget/input.svelte';
	import InputText from '$lib/widget/inputText.svelte';
	import InputCheck from '$lib/widget/inputCheck.svelte';
	import InputNumber from '$lib/widget/inputNumber.svelte';

	let val = '';
	let valText = '';
	let valCheck = false;
	let valNum: number = 0;
	let count = 0;
	let countText = 0;
	let countCheck = 0;
	let countNum = 0;
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
	<InputCheck name="in3" bind:value={valCheck} on:input={() => countCheck++} />
</div>

<div class="p-1 flex space-x-2">
	<InputCheck bind:value={valCheck} label="This one has a label property" />
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
