<script>
	import '../app.css';
	import { browser } from '$app/environment';
	import { shortcuts } from '$lib/nav/shortcuts.svelte';
	import Wait from '$lib/util/wait.svelte';
	import Theme, { theme } from '$lib/util/theme.svelte';
	import Toast from '$lib/util/toast.svelte';

	if (browser) {
		theme.init();
		shortcuts.init();
	}
</script>

<svelte:head>
	<title>Components | aansit.com</title>
</svelte:head>

<div class="flex flex-col font-sans text-black dark:text-stone-300">
	<div class="flex">
		<Theme />
	</div>
	<div class="z-50">
		<Toast />
		<Wait />
	</div>
	<main class="p-2">
		<slot />
	</main>
</div>
