<script lang="ts">
	import { type navNode, Page, Menu, Button, Shortcuts, shortcuts } from '$lib';

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
				{ label: 'Button', url: '/test/button', iconOnly: true, icon: 'play' },
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
			icon: 'adjustments-horizontal',
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

<div id="a1" />
<div id="a2" />

<Page
	size={5}
	nodes={links}
	append={[
		{ label: 'Apnd 1', url: '#a1' },
		{ label: 'Apnd 2', url: '#a2' }
	]}
>
	<Button on:click={openMenu}>Open Menu</Button>
	<Menu
		bind:open={openMenu}
		collapsible
		nodes={links}
		on:click={(e) => shortcuts.add(e.detail.url)}
	>
		<div slot="footer">Put your footer here</div>
	</Menu>

	<Shortcuts nodes={links} />
</Page>
