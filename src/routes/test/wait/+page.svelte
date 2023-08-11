<script lang="ts">
	import { wait } from '$lib/util/wait.svelte';
	import Button from '$lib/widget/button.svelte';
</script>

<Button on:click={() => wait.delay(10000)}>Click to wait 10 sec</Button>
