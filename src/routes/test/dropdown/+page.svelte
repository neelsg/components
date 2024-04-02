<script lang="ts">
	import InputDropdown from '$lib/widget/inputDropdown.svelte';
</script>

{#each [...Array(50).keys()] as k}
	<div class="flex p-1">
		<span class="p-1">{k}</span>
		<InputDropdown options={[...Array(10000).keys()].map((v) => '' + v)} />
	</div>
{/each}
