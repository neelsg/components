<script lang="ts">
	import Link, { linkColors } from '$lib/widget/link.svelte';
</script>

{#each linkColors as c, i}
	<div class="flex items-center space-x-2 p-2">
		<div class="text-lg">
			{c}
		</div>
		<Link color={c} href="/">Normal</Link>
		<Link color={c} href="/test/link">This Page</Link>
		<Link color={c} href="/" disabled>Disabled</Link>
		<Link color={c} square href="/">Square</Link>
		<Link color={c} compact href="/">Compact</Link>
	</div>
{/each}
