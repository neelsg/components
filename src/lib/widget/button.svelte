<script lang="ts" context="module">
	export const buttonColors = [null, 'blue', 'green', 'yellow', 'red'] as const;
</script>

<script lang="ts">
	export let color: (typeof buttonColors)[number] = null;
	export let disabled: boolean = false;
	export let type: 'button' | 'reset' | 'submit' | null = 'button';
	export let form: string | null = null;
</script>

<button
	on:click|stopPropagation
	class="
    uppercase font-semibold flex items-center transition-colors rounded p-2
    {disabled ? 'text-stone-500' : 'text-white active:text-stone-300'}
    {disabled
		? 'bg-stone-500 bg-opacity-20'
		: color == 'blue'
		? 'bg-blue-700 hover:bg-blue-500 active:bg-blue-800'
		: color == 'green'
		? 'bg-lime-700 hover:bg-lime-500 active:bg-lime-800'
		: color == 'yellow'
		? 'bg-amber-700 hover:bg-amber-500 active:bg-amber-800'
		: color == 'red'
		? 'bg-red-700 hover:bg-red-500 active:bg-red-800'
		: 'bg-stone-600 hover:bg-stone-400 active:bg-stone-700'}
  "
	{disabled}
	{type}
	{form}
>
	<slot />
</button>
