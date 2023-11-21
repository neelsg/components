<script lang="ts">
	import { wait, Button } from '$lib';
</script>

<Button on:click={() => wait.delay(10000)}>Click to wait 10 sec</Button>
