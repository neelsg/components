<script lang="ts">
	import { colorBasic, Link, LinkMail } from '$lib';
</script>

{#each colorBasic as c, i}
	<div class="flex items-center space-x-2 p-2">
		<div class="text-lg">
			{c}
		</div>
		<Link color={c} href="#">Normal</Link>
		<Link color={c} href="/test/link">This Page</Link>
		<Link color={c} href="/" disabled>Disabled</Link>
		<Link color={c} square href="/">Square</Link>
		<Link color={c} compact href="/test/link#d">Compact</Link>
	</div>
{/each}

<div class="p-1"><LinkMail href="santa@north.pole" /></div>
