<script lang="ts">
	import { colorFull, Card } from '$lib';
</script>

{#each colorFull as c}
	<div class="p-1" id={c ?? 'null'}>
		<Card href="#{c}" color={c}>
			{c}
		</Card>
	</div>
{/each}
