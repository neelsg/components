<!--
A link to an email address
-->

<script lang="ts">
	export let href: string; // the email address to link to
</script>

<a
	href={'mailto:' + href}
	class="font-semibold w-full p-1 rounded
    bg-black dark:bg-white transition-colors
		bg-opacity-0 dark:bg-opacity-0
    hover:bg-opacity-20 dark:hover:bg-opacity-20
    active:bg-opacity-40 dark:active:bg-opacity-40
		text-blue-700 dark:text-blue-400
  "
>
	{href}
</a>
