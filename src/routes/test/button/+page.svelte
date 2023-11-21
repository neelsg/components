<script lang="ts">
	import { colorBasic, Button, ButtonText } from '$lib';

	const disableds = [false, true] as const;
	const squares = [false, true] as const;
	const texts = [false, true] as const;
	const compacts = [false, true] as const;
	let clicks = [0, 0, 0, 0, 0];

	let toggled = false;
	const toggle = () => {
		toggled = !toggled;
	};
</script>

<div>
	{#each squares as s}
		{#each texts as t}
			{#each compacts as m}
				{#each disableds as d}
					<div class="p-2">
						<div class="text-lg">
							{s ? 'square' : 'rounded'}
							{t ? 'text' : ''}
							{m ? 'compact' : ''}
							{d ? 'disabled' : ''}
						</div>
						<div class="p-2 flex">
							{#each colorBasic as c, i}
								<div class="p-2">
									{#if t}
										<ButtonText
											color={c}
											compact={m}
											disabled={d}
											square={s}
											on:click={() => (clicks[i] += 1)}
										>
											{c}: {clicks[i]}
										</ButtonText>
									{:else}
										<Button
											color={c}
											compact={m}
											disabled={d}
											square={s}
											on:click={() => (clicks[i] += 1)}
										>
											{c}: {clicks[i]}
										</Button>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				{/each}
			{/each}
		{/each}
	{/each}
</div>

<form on:submit|preventDefault={toggle}>
	<Button type="submit">
		{toggled}
	</Button>
</form>
