<script lang="ts">
	import { colorFull } from '$lib/util/color.js';
	import Card from '$lib/widget/card.svelte';
</script>

{#each colorFull as c}
	<div class="p-1" id={c ?? 'null'}>
		<Card href="#{c}" color={c}>
			{c}
		</Card>
	</div>
{/each}
