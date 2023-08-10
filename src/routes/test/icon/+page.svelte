<script lang="ts">
	import Icon, { iconKeys } from '$lib/widget/icon.svelte';

	const keys = Object.keys(iconKeys) as (keyof typeof iconKeys)[];
	const modes = ['light', 'dark'];
</script>

{#each modes as mode}
	<div class="p-2 {mode == 'dark' ? 'dark bg-stone-900 text-white' : 'bg-stone-50'}">
		<div class="text-xl">{mode} mode</div>
		<div class="p-2">
			<div class="text-lg">regular</div>
			<div class="p-2 flex flex-wrap">
				{#each keys as key}
					<div class="p-1" title={key}>
						<Icon {key} />
					</div>
				{/each}
			</div>
			<div class="text-lg">small</div>
			<div class="p-2 flex flex-wrap">
				{#each keys as key}
					<div class="p-1" title={key}>
						<Icon {key} size={16} />
					</div>
				{/each}
			</div>
		</div>
	</div>
{/each}
