<script lang="ts">
	import { page } from '$app/stores';
	import { nav, type navNode, Crumbs } from '$lib';

	const nodes: navNode[] = [
		{
			label: 'Home',
			url: '/',
			color: 'yellow',
			children: [
				{
					label: 'Test',
					children: [
						{
							label: 'Nav',
							url: '/test/nav',
							icon: 'bars-3',
							color: 'red',
							children: [{ label: 'MyPath', url: '/test/nav/mypath' }]
						}
					]
				}
			]
		}
	];
</script>

<Crumbs {nodes} />
