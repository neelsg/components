<script lang="ts">
	import { Report, toast, type report, type reportItem } from '$lib';

	const definition: report = {
		title: 'Test Report',
		subtitle: 'My Company',
		pageOrientation: 'landscape',
		fields: [
			{ type: 'text', key: 'f1', align: 'center', label: ['Field 1', 'Subtext'] },
			{ type: 'check', key: 'f2', label: 'Field 2' },
			{ type: 'number', key: 'f3', label: 'Field 3', align: 'right', decimals: 3 }
		],
		params: [
			{ key: 'par1', label: 'Par 1', upper: true },
			{ type: 'check', key: 'par2', label: 'Par 2' },
			{ type: 'date', key: 'par4', label: 'Par 4', key_to: 'par4to', align: 'center' },
			{ type: 'number', key: 'par5', label: 'Par 5', key_to: 'par5to', align: 'right' },
			{
				type: 'dropdown',
				key: 'par6',
				label: 'Par 6',
				key_to: 'par6to',
				options: () => ['A', 'B', 'C'],
				upper: true,
				align: 'right'
			},
			{
				type: 'option-multi',
				key: 'par8',
				label: 'Par 8',
				options: () => ['A', 'B', 'C'],
				align: 'right'
			}
		]
	};

	let items: reportItem[] = [
		{ f1: 'Hi', f3: -123 },
		{ f2: 1, f3: 123 },
		{
			f1: 'There',
			f2: 2,
			f3: -123,
			_click: (i) => toast.add('Hello: ' + i.f3),
			_group: 2,
			_mask: ['f2']
		}
	];
	let params: { [key: string]: any } = {
		par4: new Date().toISOString().split('T')[0]
	};
</script>

<Report {definition} {items} bind:params />
