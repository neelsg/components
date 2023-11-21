<script lang="ts">
	import '../app.css';
	import { Layout } from '$lib';
	import { nodes as navNodes } from './nav';
</script>

<svelte:head>
	<link rel="icon" href="/favicon.png" />
	<link rel="manifest" href="/manifest.webmanifest" />
	<link rel="apple-touch-icon" href="/images/icon512.png" />
</svelte:head>

<Layout title="Components" {navNodes}>
	<slot />
</Layout>
