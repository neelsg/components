<script lang="ts">
	import { Form, toast, type form, pdfDataUrl } from '$lib';

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
						},
						min_width: 50
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
							align: 'right',
							decimals: 3
						},
						{
							type: 'computed',
							key: 'testF4',
							label: 'Test Comp',
							format: 'number',
							align: 'right',
							fn: () => 123456.789,
							decimals: 4
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
						key: 'testF1',
						label: 'Test Field 1',
						key_description: 'testF5'
					},
					{
						type: 'computed',
						key: 'testF2',
						label: 'Test Field 2',
						key_description: 'testF2D'
					},
					{
						type: 'computed',
						key: 'testF3',
						label: 'Test Field 3',
						key_description: 'testF3D'
					},
					{
						type: 'number',
						key: 'testF4',
						label: 'Test Field 4',
						align: 'right'
					},
					{
						type: 'text',
						key: 'testF5',
						label: 'Test Field 5',
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
						},
						testF4: (meta: unknown, doc: unknown): string => {
							return 'Hi';
						}
					},
					{
						testF4: (meta: unknown, doc: unknown): string => {
							return 'There';
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
		cancelled: () => meta.cancelled,
		print: () => {
			return {
				prepend: async () => {
					return {
						columns: [
							{ image: await pdfDataUrl('/images/cloud.jpg'), width: 50 },
							{ text: 'PRE', color: '#090', marginLeft: 50 }
						]
					};
				},
				append: { text: 'POST', color: '#909' },
				pageOrientation: 'landscape'
			};
		},
		copy: () => true
	};
	const meta = {
		cancelled: false
	};
	let doc = { testFD: 'Hii', testF2: '2023-11-26' };
	let disabled = false;
</script>

<Form {definition} {meta} {disabled} bind:doc />
