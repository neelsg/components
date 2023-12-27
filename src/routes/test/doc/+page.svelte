<script lang="ts">
	import { Form, type form } from '$lib';

	const definition: form = {
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
			}
		],
		store: 'testDoc',
		print: () => {
			return {};
		},
		copy: () => true
	};

	let doc = {};
</script>

<div>
	<Form {definition} bind:doc />
</div>
