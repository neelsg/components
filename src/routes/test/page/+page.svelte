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
			url: '/test',
			children: [{ label: 'Test Page', url: '/test/page' }]
		}
	]}
>
	<div class="px-1 flex" slot="top">
		<Button type="submit" space>Submit</Button>
		<Button space>Cancel</Button>
	</div>
	<Input required value="" space />
	<div slot="bottom">
		<Input required value="" space />
	</div>
</PageForm>
