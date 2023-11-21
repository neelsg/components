<script lang="ts">
	import { Button, Movable, toast } from '$lib';

	let x: number = 200;
	let y: number = 300;
	let x2: number = 0;
	let y2: number = 0;
	let x3: number = 0;
	let y3: number = 0;
	let x4: number = 0;
	let y4: number = 0;
	let xMax: number = 0;
	let yMax: number = 0;
	let xWidth: number = 0;
	let yHeight: number = 0;
	let scaleFactor: number = 1;
	let visible: boolean = false;
	let disabled: boolean = false;
</script>

<div>
	<Movable bind:x bind:y z={1} bounds={{ x: [100, 400], y: [100, 400] }}>
		<div class="bg-red-500">X {x} Y {y}</div>
	</Movable>
</div>

<div class="flex z-10">
	<Button space on:click={() => (scaleFactor -= 0.1)}>-</Button>
	<Button space on:click={() => (scaleFactor += 0.1)}>+</Button>
	<Button space on:click={() => (visible = !visible)}>V</Button>
	<Button space on:click={() => (disabled = !disabled)}>D</Button>
</div>

<div
	bind:offsetWidth={xMax}
	bind:offsetHeight={yMax}
	class="m-4 border border-gray-500 h-80"
	style="
  transform: scale({scaleFactor});
"
>
	{x4}
	{y4}
	<Movable
		{disabled}
		scale={scaleFactor}
		bind:x={x2}
		bind:y={y2}
		bounds={{ x: [0, xMax - xWidth], y: [0, yMax - yHeight] }}
	>
		<div
			bind:offsetWidth={xWidth}
			bind:offsetHeight={yHeight}
			class="p-2 w-40 bg-lime-500 bg-opacity-30"
		>
			<Button on:click={() => toast.add('Clicked')}>Click Me</Button>
			{x2}
			{y2}
			{xMax}
		</div>
	</Movable>
	<Movable {disabled} scale={scaleFactor} bind:x={x3} bind:y={y3}>
		<div class="p-2 bg-orange-500 bg-opacity-30">
			<Button on:click={() => toast.add('Clicked 2')}>Click Me</Button>
			{x3}
			{y3}
		</div>
	</Movable>
	{#if visible}
		<Movable {disabled} scale={scaleFactor} bind:x={x4} bind:y={y4}>
			<div class="p-2 bg-rose-500 bg-opacity-30">
				<Button on:click={() => toast.add('Clicked 3')}>Click Me</Button>
			</div>
		</Movable>
		<Movable {disabled} scale={scaleFactor}>
			<div class="p-2 bg-blue-500 bg-opacity-30">
				<Button on:click={() => toast.add('Clicked 4')}>Click Me</Button>
			</div>
		</Movable>
	{/if}
</div>
