<script lang="ts">
	import type { navNode } from '$lib/nav/nav.js';
	import Page from '$lib/nav/page.svelte';
	import Menu from '$lib/nav/menu.svelte';
	import Button from '$lib/widget/button.svelte';

	const links: navNode[] = [
		{
			label: 'Home',
			url: '/',
			color: 'yellow'
		},
		{
			label: 'Tests',
			color: 'cyan',
			children: [
				{ label: 'Button', url: '/test/button' },
				{ label: 'Card', url: '/test/card', color: 'orange' },
				{ label: 'Icon', url: '/test/icon' },
				{ label: 'Image', url: '/test/image', color: 'purple' },
				{ label: 'Input', url: '/test/input' },
				{ label: 'Link', url: '/test/link' },
				{ label: 'Nav', url: '/test/nav', icon: 'bars-3', color: 'red' },
				{ label: 'Popup', url: '/test/popup' },
				{ label: 'Toast', url: '/test/toast', icon: 'chat-bubble-bottom-center' },
				{ label: 'Wait', url: '/test/wait' }
			]
		},
		{
			label: 'Other',
			url: '/nowhere',
			children: [
				{
					label: 'Button',
					url: '/test/button',
					children: [
						{
							label: 'Card',
							url: '/test/card',
							color: 'orange',
							children: [
								{ label: 'Link', url: '/test/link' },
								{
									label: 'Icon',
									url: '/test/icon',
									children: [{ label: 'Image', url: '/test/image', color: 'purple' }]
								},
								{ label: 'Input', url: '/test/input' }
							]
						}
					]
				},
				{
					label: 'Nav',
					url: '/test/nav',
					icon: 'bars-3',
					color: 'red',
					children: [
						{ label: 'Popup', url: '/test/popup' },
						{ label: 'Toast', url: '/test/toast', icon: 'chat-bubble-bottom-center' },
						{ label: 'Wait', url: '/test/wait' }
					]
				}
			]
		}
	];

	let openMenu: () => void;
</script>

<Page
	size={5}
	nodes={links}
	append={[
		{ label: 'Apnd 1', url: 'a1' },
		{ label: 'Apnd 2', url: 'a2' }
	]}
>
	<Button on:click={openMenu}>Open Menu</Button>
	<Menu bind:open={openMenu} collapsible nodes={links}>
		<div slot="footer">Put your footer here</div>
	</Menu>
</Page>
