<script lang="ts">
	import { page } from '$app/stores';
	import Link from '../widget/link.svelte';
</script>

<div class="text-center p-8 flex flex-col space-y-4">
	<h1 class="text-2xl font-semibold">An error occurred</h1>
	<div class="font-bold">Code: {$page.status}</div>
	<div>{$page.error?.message || 'Unknown'}</div>
	<div class="py-8 flex justify-center">
		<Link color="blue" href="/">Back to home page</Link>
	</div>
</div>
