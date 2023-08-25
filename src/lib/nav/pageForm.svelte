<script lang="ts">
	import type { navNode } from './nav.js';
	import Icon from '../widget/icon.svelte';
	import ButtonText from '../widget/buttonText.svelte';
	import Crumbs from './crumbs.svelte';

	export let nodes: navNode[];
	export let node: string | null = null;
	export let size: null | 3 | 4 | 5 | 6 | 7 = null;
	export let append: navNode[] = [];
	export let context: unknown = false;
</script>

<div
	class="px-1
		{size == 3 ? 'max-w-3xl mx-auto' : ''}
    {size == 4 ? 'max-w-4xl mx-auto' : ''}
    {size == 5 ? 'max-w-5xl mx-auto' : ''}
    {size == 6 ? 'max-w-6xl mx-auto' : ''}
    {size == 7 ? 'max-w-7xl mx-auto' : ''}
  "
>
	<form on:submit|preventDefault>
		<div class="items-center flex flex-wrap justify-between">
			<div class="my-2 items-center flex flex-wrap">
				<ButtonText
					color="blue"
					on:click={() => {
						window.history.back();
					}}
				>
					<Icon key="chevron-left" />
				</ButtonText>
				<Crumbs
					prepend={[{ label: '', icon: 'home', url: '/' }]}
					{nodes}
					{node}
					{append}
					{context}
				/>
			</div>
			<slot name="top" />
		</div>
		<slot />
	</form>
	<slot name="bottom" />
</div>
