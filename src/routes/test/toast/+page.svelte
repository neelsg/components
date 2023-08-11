<script lang="ts">
	import { toast } from '$lib/util/toast.svelte';
	import Button from '$lib/widget/button.svelte';
</script>

<Button on:click={() => toast.add('Hello')}>stone</Button>
<Button color="blue" on:click={() => toast.add('Helloo', 'blue', 1000)}>blue 1 sec</Button>
<Button color="green" on:click={() => toast.add('Hellooo', 'green')}>green</Button>
<Button color="yellow" on:click={() => toast.add('Helloooo', 'yellow')}>yellow</Button>
<Button color="red" on:click={() => toast.add('Hellooooo', 'red')}>red</Button>
