<script lang="ts">
	import Button, { buttonColors } from '$lib/widget/button.svelte';

	const modes = ['light', 'dark'];
	let clicks = [0, 0, 0, 0, 0];
</script>

{#each modes as mode}
	<div class="p-2 {mode == 'dark' ? 'dark bg-stone-900 text-white' : 'bg-stone-50'}">
		<div class="text-xl">{mode} mode</div>
		<div class="p-2">
			<div class="text-lg">regular</div>
			<div class="p-2 flex">
				{#each buttonColors as color, idx}
					<div class="p-2">
						<Button {color} on:click={() => (clicks[idx] += 1)}>
							{color}: {clicks[idx]}
						</Button>
					</div>
				{/each}
			</div>
		</div>
		<div class="p-2">
			<div class="text-lg">disabled</div>
			<div class="p-2 flex">
				{#each buttonColors as color, idx}
					<div class="p-2">
						<Button {color} disabled on:click={() => (clicks[idx] += 1)}>
							{color}: {clicks[idx]}
						</Button>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/each}
