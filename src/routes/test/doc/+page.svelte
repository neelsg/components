<script lang="ts">
	import { Form, type form, Button } from '$lib';

	const meta = {
		toggle: false
	};

	let definition: form = {
		title: 'Loading...',
		sections: []
	};

	$: refresh(meta);
	const refresh = (m: typeof meta) => {
		doc.f1 += 'f';
		definition = {
			title: 'Test Form',
			sections: [
				{
					type: 'block',
					fields: [
						[
							{ type: 'text', label: 'Test Field 1', key: 'f1' },
							{ type: 'text', label: 'Test Field 1', key: 'f2' }
						]
					]
				},
				{
					type: 'detail',
					key: 'det',
					fields: [{ type: 'text', label: 'Test F1', key: 'f1' }]
				}
			],
			store: 'testDoc',
			print: () => {
				return {};
			},
			copy: () => true
		};
	};

	let doc = { f1: '' };
</script>

<Button on:click={() => (meta.toggle = !meta.toggle)}>Toggle</Button>

<div>
	<Form {definition} bind:doc />
</div>
