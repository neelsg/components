<script lang="ts">
	import Icon, { iconPaths } from '$lib/widget/icon.svelte';

	const keys = Object.keys(iconPaths) as (keyof typeof iconPaths)[];
</script>

<div class="p-2">
	<div class="text-lg">regular</div>
	<div class="p-2 flex flex-wrap">
		{#each keys as k}
			<div class="p-1" title={k}>
				<Icon key={k} />
			</div>
		{/each}
	</div>
	<div class="text-lg">small</div>
	<div class="p-2 flex flex-wrap">
		{#each keys as k}
			<div class="p-1" title={k}>
				<Icon key={k} size={16} />
			</div>
		{/each}
	</div>
	<div class="text-lg">red</div>
	<div class="p-2 flex flex-wrap text-red-700 dark:text-red-400">
		{#each keys as k}
			<div class="p-1" title={k}>
				<Icon key={k} />
			</div>
		{/each}
	</div>
</div>
