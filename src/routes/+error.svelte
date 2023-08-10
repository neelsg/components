<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="text-center p-8 flex flex-col space-y-4">
	<h1 class="text-2xl">An error occurred</h1>
	<div class="font-bold">Code: {$page.status}</div>
	<div>{$page.error?.message}</div>
	<div class="pt-8">
		<a
			href="/"
			class="
        uppercase font-semibold w-full p-2 rounded
        hover:bg-stone-200 active:bg-stone-300
        dark:hover:bg-stone-700 dark:active:bg-stone-600
        text-blue-700 dark:text-blue-400
      "
		>
			Back to home page
		</a>
	</div>
</div>
