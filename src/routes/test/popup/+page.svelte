<script lang="ts">
	import { Button, Popup } from '$lib';

	let popOpen: () => void;
	let popClose: () => void;
</script>

<Button on:click={popOpen}>Open The Popup</Button>

<Popup bind:open={popOpen} bind:close={popClose}>
	<div class="text-lg" slot="top">Top slot here</div>
	<div>
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores perferendis eaque aliquam in
		voluptate odit placeat exercitationem cumque atque neque nisi blanditiis fuga ratione voluptas
		beatae magni ut, excepturi qui?
	</div>
	<div>
		<Button on:click={popClose}>Close The Popup</Button>
	</div>
</Popup>
