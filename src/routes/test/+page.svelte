<script lang="ts">
	import { Link } from '$lib';
	import { nodes as children } from './nav';
</script>

{#each children as c}
	<Link href={c.url ?? ''} square color="blue">
		{c.label}
	</Link>
{/each}
