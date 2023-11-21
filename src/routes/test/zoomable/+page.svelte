<script lang="ts">
	import { Zoomable, Movable } from '$lib';

	let scale = 1;
</script>

<Zoomable bind:scale>
	<div slot="top" class="text-xs">Zoomable area:</div>
	<div class="border rounded border-stone-700 dark:border-stone-400 w-[600px] h-[400px]">
		<Movable {scale} bounds={{ x: [0, 400], y: [0, 300] }}>
			<div class="w-12 h-12 rounded bg-red-500" />
		</Movable>
		<Movable {scale}>
			<div class="w-12 h-12 rounded bg-yellow-500" />
		</Movable>
	</div>
</Zoomable>
