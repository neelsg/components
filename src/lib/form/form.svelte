<script lang="ts" context="module">
	import type { iconPaths } from '../widget/icon.svelte';
	import type { pdfContent, pdfAsyncContent, pdfPageOrientation } from '../widget/pdf.svelte';
	import type { formAction } from './_formAction.svelte';
	import type { formBlock } from './_formBlock.svelte';
	import type { formDetail } from './_formDetail.svelte';

	export type form = {
		title: string;
		icon?: keyof typeof iconPaths;
		cancelled?: (meta: unknown, doc: unknown) => boolean;
		sections: (formBlock | formDetail)[];
		actions?: formAction[];
		print?: (
			meta: unknown,
			doc: unknown
		) => {
			prepend?: pdfContent | pdfAsyncContent;
			append?: pdfContent | pdfAsyncContent;
			pageOrientation?: pdfPageOrientation;
		} | null;
		copy?: (meta: unknown, doc: unknown) => boolean;
		store?: string;
	};
</script>

<script lang="ts">
	import { toast } from '../util/toast.svelte';
	import { docStore } from '../util/doc';
	import { formDetailFilterEmpty } from './_formDetail.svelte';
	import { formBlockFieldValue } from './_formBlockField.svelte';
	import { formDetailFieldValue } from './_formDetailField.svelte';
	import FormAction from './_formAction.svelte';
	import FormBlock from './_formBlock.svelte';
	import FormDetail from './_formDetail.svelte';
	import Button from '../widget/button.svelte';
	import Icon from '../widget/icon.svelte';
	import Pdf, { type pdfOptions, pdfPageNumbers } from '../widget/pdf.svelte';

	export let definition: form;
	export let meta: unknown = null;
	export let doc: { [key: string]: any };
	export let disabled: boolean = false;
	export let popups: { [key: string]: any } = {};

	export const clear = async () => {
		if (!definition.store) return;

		doc = await docStore.clear(definition.store);
		definition = definition;
	};

	$: cancelled = (definition.cancelled && definition.cancelled(meta, doc)) ?? false;

	let storeLoaded: string | null = null;
	$: storeDocument(doc, definition);
	const storeDocument = async (d: { [key: string]: any }, f: form) => {
		if (!f || !f.store) return;

		if (!storeLoaded) {
			doc = await docStore.load(f.store, d);
			storeLoaded = f.store;
			return;
		}

		if (storeLoaded != f.store) {
			doc = await docStore.load(f.store, docStore.getBlank(storeLoaded));
			storeLoaded = f.store;
			return;
		}

		await docStore.store(f.store, d);
	};

	const copyToClipboard = () => {
		let data = definition.title + (cancelled ? ' CANCELLED' : '') + '\n';
		for (const s of definition.sections) {
			if (s.hide && s.hide(meta, doc)) continue;
			data += (s.title ? `\n${s.title}` : '') + '\n';
			if (s.type == 'block') {
				for (const c of s.fields) {
					for (const f of c) {
						if (f.hide && f.hide(meta, doc)) continue;
						data += `${f.label}\t${formBlockFieldValue(f, meta, doc) ?? ''}`;
						data += f.key_description ? `\t${doc[f.key_description]}` : '';
						data += '\n';
					}
				}
			} else if (s.type == 'detail') {
				let first = true;
				for (const f of s.fields) {
					if (f.hide && f.hide(meta, doc)) continue;
					if (first) {
						first = false;
					} else {
						data += '\t';
					}
					data += f.label;
				}
				data += '\n';
				for (const i of formDetailFilterEmpty(s, doc)) {
					let first = true;
					for (const f of s.fields) {
						if (f.hide && f.hide(meta, doc)) continue;
						if (first) {
							first = false;
						} else {
							data += '\t';
						}
						data += formDetailFieldValue(f, meta, doc, i) ?? '';
					}
					data += '\n';
				}
				for (const t of s.totals || []) {
					let first = true;
					for (const f of s.fields) {
						if (f.hide && f.hide(meta, doc)) continue;
						if (first) {
							first = false;
						} else {
							data += '\t';
						}
						if (t[f.key]) {
							data += t[f.key](meta, doc);
						}
					}
					data += '\n';
				}
			} else {
				data += 'UNKNOWN SECTION TYPE\n';
			}
		}
		navigator.clipboard.writeText(data);
		toast.add('Copied list to clipboard', 'blue');
	};

	const printToPdf = async () => {
		if (!definition.print) return;
		const print = definition.print(meta, doc) ?? {};
		const def: pdfContent[] = [];
		if (print.prepend)
			def.push(typeof print.prepend == 'function' ? await print.prepend() : print.prepend);

		def.push({
			text: definition.title,
			alignment: 'center',
			fontSize: 15,
			bold: true
		});

		for (const s of definition.sections) {
			if (s.hide && s.hide(meta, doc)) continue;
			if (s.title) {
				def.push({
					text: s.title,
					fontSize: 12,
					bold: true,
					marginLeft: 2
				});
			}
			if (s.type == 'block') {
				const block: pdfContent = {
					columns: []
				};
				for (const c of s.fields) {
					const col: pdfContent = {
						table: {
							widths: ['*', '*'],
							body: []
						},
						marginLeft: 2,
						marginRight: 2,
						layout: {
							hLineColor: (row: number, node: any) => {
								return row == 0 || row == node.table.body.length ? '#444' : '#bbb';
							},
							vLineColor: '#ddd',
							fillColor: (row: number, node: any, col: number) => {
								return col == 0 ? '#eee' : null;
							}
						}
					};
					for (const f of c) {
						if (f.hide && f.hide(meta, doc)) continue;
						col.table.body.push([
							{ text: f.label, bold: true },
							{ text: formBlockFieldValue(f, meta, doc) ?? ' ', alignment: f.align }
						]);
						if (f.key_description) {
							col.table.body.push([
								{ text: ' ', bold: true },
								{ text: doc[f.key_description] ?? ' ', alignment: f.align }
							]);
						}
					}
					block.columns.push(col);
				}
				def.push(block);
			} else if (s.type == 'detail') {
				const columns = s.fields.filter((x) => !x.hide || !x.hide(meta, doc));
				const detail: pdfContent = {
					table: {
						widths: [...columns.map(() => '*')],
						headerRows: 1,
						body: [
							[
								...columns.map((col) => {
									return {
										text: col.label,
										alignment: col.align,
										bold: true
									};
								})
							],
							...formDetailFilterEmpty(s, doc).map((row: any) => [
								...columns.map((col) => {
									return {
										text: formDetailFieldValue(col, meta, doc, row),
										alignment: col.align
									};
								})
							]),
							...(s.totals ?? []).map((row: any, i) => {
								return columns.map((c) => {
									return {
										text: row[c.key] ? row[c.key](meta, doc) : '',
										fillColor: '#fff',
										borderColor: [null, i == 0 ? '#444' : null, null, null],
										alignment: c.align,
										bold: true
									};
								});
							})
						]
					},
					layout: {
						hLineColor: (row: number, node: any) => {
							return row == 0 || row == 1 || row == node.table.body.length ? '#444' : '#ddd';
						},
						vLineColor: '#ddd',
						fillColor: (row: number) => (row % 2 == 0 ? '#eee' : null)
					},
					marginLeft: 2,
					marginRight: 2
				};

				def.push(detail);
			} else {
				def.push('UNKNOWN SECTION TYPE');
			}
			def.push(' ');
		}

		if (print.append)
			def.push(typeof print.append == 'function' ? await print.append() : print.append);
		openPdf(def, {
			pageOrientation: print.pageOrientation,
			watermark: cancelled
				? {
						text: 'CANCELLED',
						color: '#f00'
				  }
				: undefined,
			footer: pdfPageNumbers
		});
	};

	let openPdf: (doc: pdfAsyncContent, opt: pdfOptions) => Promise<void>;
</script>

<div class="flex flex-col p-0.5">
	<div class="w-full font-semibold">
		<div
			class="
        flex w-full justify-between items-center border-y
        {cancelled ? 'text-red-700 dark:text-red-500 border-red-500' : 'border-transparent'}
      "
		>
			<div class="flex flex-wrap p-0.5">
				{#if definition.icon}<div class="pr-2 py-0.5"><Icon key={definition.icon} /></div>{/if}
				<div class="text-lg">{definition.title}</div>
			</div>
			{#if cancelled}
				<div>CANCELLED</div>
			{/if}
			<div class="flex flex-wrap">
				<slot name="top" />
				{#each definition.actions ?? [] as a}
					{#if !disabled || a.no_disable}
						{#if !a.hide || !a.hide(meta, doc)}
							<FormAction definition={a} />
						{/if}
					{/if}
				{/each}
				{#if definition.store}
					<div class="p-0.5">
						<Button on:click={clear}>
							<div class="w-24">Clear</div>
						</Button>
					</div>
				{/if}
				{#if definition.print && definition.print(meta, doc)}
					<div class="p-0.5">
						<Button color="blue" on:click={printToPdf}>
							<Icon key="printer" />
						</Button>
					</div>
				{/if}
				{#if definition.copy && definition.copy(meta, doc)}
					<div class="p-0.5">
						<Button color="blue" on:click={copyToClipboard}>
							<Icon key="clipboard" />
						</Button>
					</div>
				{/if}
			</div>
		</div>
	</div>

	{#each definition.sections as s}
		{#if !s.hide || !s.hide(meta, doc)}
			{#if s.type == 'block'}
				<FormBlock definition={s} {meta} {disabled} bind:doc />
			{:else if s.type == 'detail'}
				<FormDetail definition={s} {meta} {disabled} bind:doc bind:popup={popups[s.key]}>
					<slot name="popup" slot="popup" />
				</FormDetail>
			{:else}
				<div class="text-red-600">UNKNOWN SECTION TYPE</div>
			{/if}
		{/if}
	{/each}
</div>

<Pdf bind:open={openPdf} />
