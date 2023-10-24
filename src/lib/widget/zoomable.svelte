<!--
An element where it's contents can be zoomed into or out of as well
as moved around like a map
-->

<script lang="ts">
	import ButtonText from '$lib/widget/buttonText.svelte';
	import Icon from '$lib/widget/icon.svelte';

	export let x: number = 0; // x position of contents
	export let y: number = 0; // y position of contents
	export let scale: number = 1; // zoom scale
	export let square: boolean = false; // use sharp corners instead of rounded ones
	export let home: boolean = true; // display a home button at the top right to reset x and y to 0
	export let full: boolean = false; // set w-full for the element
	export let disabled: boolean = false; // do not allow zooming or movement

	let xPrev = 0,
		yPrev = 0;

	const click = (e: MouseEvent) => {
		if (disabled) return;
		xPrev = e.clientX;
		yPrev = e.clientY;
		document.onmouseup = () => {
			document.onmouseup = null;
			document.onmousemove = null;
		};
		document.onmousemove = (e: MouseEvent) => {
			e.preventDefault();
			x += (e.clientX - xPrev) / (scale || 0);
			y += (e.clientY - yPrev) / (scale || 0);
			xPrev = e.clientX;
			yPrev = e.clientY;
		};
	};
</script>

<div
	class="border border-stone-500
	{full ? 'w-full' : 'w-fit'}
	{square ? '' : 'rounded'}
"
>
	<div class="flex justify-between p-0.5">
		<div>
			<slot name="top" />
		</div>
		<div class="flex z-10 items-center">
			{#if home}
				<ButtonText
					compact
					{disabled}
					on:click={() => {
						x = 0;
						y = 0;
					}}
				>
					<Icon size={20} key="home" />
				</ButtonText>
			{/if}
			<div class="text-xs text-stone-700 dark:text-stone-400">{Math.round(scale * 100)}%</div>
			<ButtonText compact {disabled} on:click={() => (scale /= 1.2)}>
				<Icon size={20} key="minus" />
			</ButtonText>
			<ButtonText compact {disabled} on:click={() => (scale *= 1.2)}>
				<Icon size={20} key="plus" />
			</ButtonText>
			<div>
				<slot name="top-right" />
			</div>
		</div>
	</div>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="overflow-hidden border-t border-stone-300 dark:border-stone-700 {disabled
			? ''
			: 'cursor-move'}"
		on:mousedown|preventDefault|stopPropagation={click}
		on:click|stopPropagation
	>
		<div style="transform: scale({scale});" class="transition-transform">
			<div style="transform: translate({x}px, {y}px);">
				<slot />
			</div>
		</div>
	</div>
</div>
