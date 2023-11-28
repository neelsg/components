<script lang="ts">
	import { Form, toast, type form } from '$lib';

	const definition: form = {
		title: 'Test Form',
		actions: [
			{
				label: 'Toggle Disable',
				color: 'blue',
				no_disable: true,
				click: () => {
					disabled = !disabled;
				}
			}
		],
		sections: [
			{
				title: 'Block Section',
				actions: [
					{
						label: 'Toggle Cancel',
						icon: 'trash',
						color: 'red',
						click: () => {
							meta.cancelled = !meta.cancelled;
						}
					}
				],
				type: 'block',
				fields: [
					[
						{
							type: 'text',
							key: 'testF',
							label: 'Test Field',
							key_description: 'testFD'
						},
						{
							type: 'date',
							key: 'testF2',
							label: 'Test Field 2',
							align: 'right',
							disable: () => true
						}
					],
					[
						{
							type: 'number',
							key: 'testF3',
							label: 'Test Field 3',
							align: 'right'
						},
						{
							type: 'computed',
							key: 'testF3',
							label: 'Test Field 3 Comp',
							format: 'number',
							align: 'right'
						},
						{
							type: 'computed',
							key: 'testF4',
							label: 'Test Comp',
							format: 'number',
							align: 'right',
							fn: () => 123456.789
						},
						{
							type: 'check',
							key: 'testF5',
							label: 'Test Check',
							align: 'right'
						},
						{
							type: 'computed',
							format: 'check',
							key: 'testF5',
							label: 'Test Check Comp',
							align: 'right'
						}
					]
				]
			},
			{
				type: 'detail',
				key: 'x',
				title: 'Detail Section',
				fields: [
					{
						type: 'text',
						key: 'testF',
						label: 'Test Field',
						key_description: 'testFD'
					},
					{
						type: 'computed',
						key: 'testF',
						label: 'Test Field',
						key_description: 'testFD'
					},
					{
						type: 'computed',
						key: 'testF',
						label: 'Test Field',
						key_description: 'testFD'
					},
					{
						type: 'number',
						key: 'testF2',
						label: 'Test Field 2',
						align: 'right'
					},
					{
						type: 'text',
						key: 'testF3',
						label: 'Test Field 3',
						unique: true
					}
				],
				actions: [
					{
						label: 'Toggle Cancel',
						icon: 'trash',
						color: 'red',
						click: () => {
							meta.cancelled = !meta.cancelled;
						}
					}
				],
				totals: [
					{
						testF2: (meta: unknown, doc: unknown): number => {
							const d = doc as { x: any[] };
							return d.x.length;
						}
					}
				],
				detail_actions: [
					{
						color: 'green',
						icon: 'arrow-right',
						click: (i) => toast.add(((i as { testF2?: number }).testF2 ?? 0).toString(), 'green')
					}
				]
			}
		],
		icon: 'archive-box',
		cancelled: () => meta.cancelled
	};
	const meta = {
		cancelled: false
	};
	let doc = { testFD: 'Hii', testF2: '2023-11-26' };
	let disabled = false;
</script>

<Form {definition} {meta} {disabled} bind:doc />
