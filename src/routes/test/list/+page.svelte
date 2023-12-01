<script lang="ts">
	import { List, type list, toast } from '$lib';

	const definition: list = {
		fields: [
			{
				label: 'Col 1',
				key: 'col1'
			},
			{
				label: 'Col 2',
				key: 'col2',
				align: 'center',
				decimals: 2
			},
			{
				label: 'Col 3',
				key: 'col3',
				type: 'check',
				align: 'right'
			}
		],
		actions: [
			{
				icon: 'academic-cap',
				click: (meta) => {
					toast.add('Click 1', 'green');
				},
				color: 'green'
			},
			{
				icon: 'window',
				click: (meta) => {
					toast.add('Click 2');
				},
				hide: () => true
			}
		],
		detailActions: [
			{
				icon: 'academic-cap',
				click: (meta, item) => {
					toast.add(`Click 3 ${item.col1}`, 'red');
				},
				color: 'red'
			},
			{
				icon: 'window',
				click: (meta, item) => {
					toast.add(`Click 4 ${item.col1}`);
				},
				hide: () => true
			}
		],
		completed: (meta, item): boolean => {
			return !!item.col3;
		},
		cancelled: (meta, item): boolean => {
			return item.col1 == 'D';
		}
	};

	const items = [
		{ col1: 'A', col2: 1 },
		{ col1: 'B', col2: 2, col3: 'FF' },
		{ col1: 'C', col2: 3 },
		{ col1: 'D', col2: 4 },
		{ col1: 'E', col2: 5 },
		{ col1: 'F', col2: 6 },
		{ col1: 'G', col2: 7, col3: 'FF' },
		{ col1: 'H', col2: 8 },
		{ col1: 'I', col2: 9 }
	];
</script>

<div class="p-2">
	<List {definition} {items} pageSize={4} />
</div>
