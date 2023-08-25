<script lang="ts">
	import PageForm from '$lib/nav/pageForm.svelte';
	import Input from '$lib/widget/input.svelte';
	import Button from '$lib/widget/button.svelte';
	import { toast } from '$lib/util/toast.svelte';

	const submitted = () => {
		toast.add('Form submitted', 'blue');
	};
</script>

<PageForm
	on:submit={submitted}
	nodes={[
		{
			icon: 'truck',
			label: 'Test Looong',
			labelShort: 'Tst Shrt',
			children: [{ label: 'Test Page', url: '/test/page' }]
		}
	]}
>
	<div class="px-1" slot="top">
		<Button type="submit">Submit</Button>
	</div>
	<Input required value="" />
	<div slot="bottom">
		<Input required value="" />
	</div>
</PageForm>
