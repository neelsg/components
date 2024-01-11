<script lang="ts" context="module">
	import type { iconPaths } from '../widget/icon.svelte';
	import type { colorBasic } from '../util/color';

	export type formDetailPopup = {
		label?: string;
		icon?: keyof typeof iconPaths;
		color?: (typeof colorBasic)[number];
		hide?: (meta: unknown, doc: unknown) => boolean;
		no_disable?: boolean;
	};
</script>

<script lang="ts">
	import type { formDetail } from './_formDetail.svelte';
	import { toast } from '../util/toast.svelte';
	import Button from '../widget/button.svelte';
	import Icon from '../widget/icon.svelte';
	import Popup from '../widget/popup.svelte';
	import FormDetailPopupField from './_formDetailPopupField.svelte';
	import FormDetailPopupAction from './_formDetailPopupAction.svelte';

	export let definition: formDetail;
	export let meta: unknown;
	export let doc: { [key: string]: any };
	export let disabled: boolean;
	export let popup: any = {};

	let open: () => void;
	let form: HTMLFormElement;

	$: detailActions = (definition.detail_actions ?? []).filter((x) => !x.hide || !x.hide(meta, doc));

	const submit = () => {
		if (!form.checkValidity()) {
			toast.add('Some fields are missing or invalid', 'red');
			return;
		}
		let empty = true;
		Object.values(popup).forEach((v) => {
			if (v) empty = false;
		});
		if (empty) {
			toast.add('Cannot submit empty item', 'red');
			return;
		}
		doc[definition.key][doc[definition.key].length - 1] = popup;
		doc[definition.key] = [...doc[definition.key], {}];
		popup = {};
	};
</script>

{#if definition.popup}
	<div class="p-0.5">
		<Button color={definition.popup.color} on:click={open}>
			<div class="flex space-x-1 justify-center">
				{#if definition.popup.icon}<div><Icon key={definition.popup.icon} /></div>{/if}
				{#if definition.popup.label}<div>{definition.popup.label}</div>{/if}
			</div>
		</Button>
	</div>
{/if}

<Popup bind:open>
	<div class="flex" slot="top">
		<div class="py-2 pr-4 font-semibold text-lg">{definition.title}</div>
		{#each detailActions as a}
			{#if !disabled || a.no_disable}
				{#if !(a.hide && a.hide(meta, doc))}
					<FormDetailPopupAction definition={a} bind:item={popup} />
				{/if}
			{/if}
		{/each}
		<div class="p-0.5">
			<Button color="green" on:click={submit}>
				<Icon key="plus" />
				<div class="px-2">Next</div>
			</Button>
		</div>
	</div>
	<slot name="popup" />
	<form bind:this={form}>
		<div class="flex flex-col w-full space-y-1">
			{#each definition.fields as f}
				{#if !(f.hide && f.hide(meta, doc))}
					<FormDetailPopupField
						definition={f}
						{meta}
						{disabled}
						bind:doc
						bind:item={popup}
						sectionKey={definition.key}
					/>
				{/if}
			{/each}
		</div>
	</form>
</Popup>
