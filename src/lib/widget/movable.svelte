<!--
An element that can be moved around on the screen

@events
- pick: onmousedown
- move: onmousemove
- drop: onmouseup
-->

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let x: number = 0; // x position
	export let y: number = 0; // y position
	export let z: number = 0; // z index
	export let bounds: {
		x?: [number | null, number | null];
		y?: [number | null, number | null];
	} = {}; // boundaries for movement. {x: [min, max], y: [min, max]}
	export let scale: number = 1; // any scaling applied to the parent. this is needed to keep the movement consistent with the mouse
	export let disabled: boolean = false; // don't allow movement if true

	let width = 0;
	let height = 0;
	let xPrev = 0,
		yPrev = 0;

	const click = (e: MouseEvent) => {
		if (disabled) return;
		dispatch('pick');
		xPrev = e.clientX;
		yPrev = e.clientY;
		document.onmouseup = () => {
			document.onmouseup = null;
			document.onmousemove = null;
			x = Math.round(x);
			y = Math.round(y);
			dispatch('drop');
		};
		document.onmousemove = (e: MouseEvent) => {
			e.preventDefault();
			let xTarget = x + (e.clientX - xPrev) / (scale || 1);
			let yTarget = y + (e.clientY - yPrev) / (scale || 1);
			xPrev = e.clientX;
			yPrev = e.clientY;
			if (bounds.x && (bounds.x[0] ?? null) !== null && xTarget < (bounds.x[0] || 0)) {
				xPrev += ((bounds.x[0] || 0) - xTarget) * (scale || 1);
				xTarget = bounds.x[0] || 0;
			}
			if (bounds.x && (bounds.x[1] ?? null) !== null && xTarget > (bounds.x[1] || 0) - width) {
				xPrev += ((bounds.x[1] || 0) - width - xTarget) * (scale || 1);
				xTarget = (bounds.x[1] || 0) - width;
			}
			if (bounds.y && (bounds.y[0] ?? null) !== null && yTarget < (bounds.y[0] || 0)) {
				yPrev += ((bounds.y[0] || 0) - yTarget) * (scale || 1);
				yTarget = bounds.y[0] || 0;
			}
			if (bounds.y && (bounds.y[1] ?? null) !== null && yTarget > (bounds.y[1] || 0) - height) {
				yPrev += ((bounds.y[1] || 0) - height - yTarget) * (scale || 1);
				yTarget = (bounds.y[1] || 0) - height;
			}
			x = xTarget;
			y = yTarget;
			dispatch('move');
		};
	};
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:mousedown|preventDefault|stopPropagation={click}
	class="{disabled ? '' : 'cursor-move'} absolute"
	style="top: {y}px; left: {x}px; z-index: {z}"
	bind:offsetWidth={width}
	bind:offsetHeight={height}
>
	<slot />
</div>
