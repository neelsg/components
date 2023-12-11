<script lang="ts" context="module">
	import type { pdfPageOrientation } from '../widget/pdf.svelte';
	import type { reportParam } from './_reportParam.svelte';
	import type { reportField } from './_reportField.svelte';
	import type { reportItem } from './_reportItem.svelte';

	export type report = {
		title: string;
		subtitle?: string;
		fields: reportField[];
		pageOrientation?: pdfPageOrientation;
		params?: reportParam[];
		submit?: () => Promise<boolean>;
	};
</script>

<script lang="ts">
	import { slide } from 'svelte/transition';
	import Button from '../widget/button.svelte';
	import Icon from '../widget/icon.svelte';
	import Pdf, {
		type pdfContent,
		type pdfAsyncContent,
		type pdfOptions,
		type pdfTableCell,
		pdfPageNumbersDate
	} from '../widget/pdf.svelte';
	import ReportParam from './_reportParam.svelte';
	import ReportField, { reportFieldValue } from './_reportField.svelte';
	import { toast } from '$lib/util/toast.svelte';

	export let definition: report;
	export let items: reportItem[];
	export let params: { [key: string]: any } = {};

	let show: 'params' | 'pdf' | 'html' = 'params';
	let disabled: boolean = false;
	let paramText: string[] = [];

	$: init(definition);
	const init = (definition: report) => {
		if (!definition.params?.length) showHtml();
	};

	export const copyToClipboard = () => {
		let data =
			definition.fields
				.map((f) => {
					return Array.isArray(f.label) ? f.label.join('|') : f.label;
				})
				.join('\t') + '\n';
		for (const i of items) {
			data += definition.fields.map((f) => reportFieldValue(f, i)).join('\t') + '\n';
		}
		navigator.clipboard.writeText(data);
		toast.add('Copied data to clipboard', 'blue');
	};

	const getParamText = () => {
		paramText = [];
		for (const p of definition.params ?? []) {
			if (p.key_to && params[p.key_to]) {
				if (params[p.key] == params[p.key_to]) {
					paramText.push(`${p.label}: ${params[p.key]}`);
				} else {
					paramText.push(`${p.label}: ${params[p.key]} - ${params[p.key_to]}`);
				}
			} else if (params[p.key]) {
				if (Array.isArray(params[p.key])) {
					if (params[p.key].length > 0) {
						paramText.push(`${p.label}: ${params[p.key]}`);
					}
				} else {
					paramText.push(`${p.label}: ${params[p.key]}`);
				}
			}
		}
	};

	const submit = (to: 'pdf' | 'html') => {
		return async () => {
			disabled = true;
			getParamText();
			if (definition.submit) {
				const res = await definition.submit();
				if (!res) {
					disabled = false;
					return;
				}
			}
			if (to == 'pdf') {
				showPdf();
			} else {
				showHtml();
			}
			disabled = false;
		};
	};

	const showParams = () => {
		if (show == 'pdf') pdfClose();
		show = 'params';
	};

	const showPdf = () => {
		const def: pdfContent[] = [];

		// title
		def.push({
			columns: [
				{
					text: definition.title,
					alignment: 'left',
					fontSize: 15,
					bold: true
				},
				{
					text: definition.subtitle ?? ' ',
					alignment: 'right',
					fontSize: 12,
					italics: true,
					marginTop: 4
				}
			]
		});

		// parameters
		if (paramText.length) {
			def.push({
				text: 'Parameters:',
				fontSize: 8,
				marginTop: 5
			});
			def.push({
				ul: [...paramText],
				fontSize: 8,
				marginBottom: 5
			});
		}

		// body
		const tableBody: pdfTableCell[][] = [];
		tableBody.push(
			definition.fields.map((f) => {
				return {
					text: Array.isArray(f.label) ? f.label.join('\n') : f.label,
					bold: true,
					alignment: f.align
				};
			})
		);
		if (items.length) {
			for (const i of items) {
				const cols = definition.fields.map((f) => {
					const v = reportFieldValue(f, i);
					let c = i._group == 2 ? '#fff' : null;
					if (f.type == 'number' && i[f.key] < 0) {
						c = i._group == 2 ? '#f99' : '#b00';
					}
					return {
						text: v,
						bold: i._group,
						fillColor: i._group == 1 ? '#ccc' : i._group == 2 ? '#444' : null,
						color: c,
						alignment: f.align
					};
				});
				tableBody.push(cols);
			}
		} else {
			tableBody.push([{ text: 'No items to display', colSpan: definition.fields.length }]);
		}

		def.push({
			table: {
				widths: definition.fields.map((f) => f.width ?? '*'),
				headerRows: 1,
				body: tableBody
			},
			layout: {
				hLineColor: (row: number, node: any) => {
					return row == 0 || row == 1 || row == node.table.body.length ? '#444' : '#ddd';
				},
				vLineColor: '#ddd',
				fillColor: (row: number) => (row % 2 == 0 ? '#eee' : null)
			}
		});

		pdfShow(def, {
			pageOrientation: definition.pageOrientation,
			footer: pdfPageNumbersDate
		});
		show = 'pdf';
	};

	const showHtml = () => {
		if (show == 'pdf') pdfClose();
		show = 'html';
	};

	let pdfShow: (doc: pdfAsyncContent, opt: pdfOptions) => Promise<void>;
	let pdfClose: () => void;
</script>

<div class="bg-stone-100 dark:bg-stone-900 border-b-2 border-indigo-700">
	<div class="border-t border-stone-500">
		<form on:submit|preventDefault|stopPropagation={submit('pdf')}>
			{#if show == 'params'}
				<div transition:slide={{ duration: 150 }}>
					<div class="text-lg font-semibold px-1">Parameters:</div>
					<div class="flex flex-col pb-2">
						{#each definition.params ?? [] as p}
							<ReportParam definition={p} bind:params {disabled} />
						{/each}
					</div>
				</div>
			{/if}
			<div class="flex justify-center">
				{#if show == 'params'}
					<div class="flex" transition:slide={{ duration: 150, axis: 'x' }}>
						<Button color="blue" space type="submit">
							<Icon key="magnifying-glass" />
							<div class="pl-2 w-24">PDF</div>
						</Button>
						<Button color="blue" space on:click={submit('html')}>
							<Icon key="magnifying-glass-plus" />
							<div class="pl-2 w-24">HTML</div>
						</Button>
					</div>
				{:else}
					<div class="flex" transition:slide={{ duration: 150, axis: 'x' }}>
						{#if definition.params}
							<Button color="blue" space on:click={showParams}>
								<Icon key="pencil" />
								<div class="pl-2 w-48">Change Parameters</div>
							</Button>
						{/if}
						{#if show != 'pdf'}
							<div transition:slide={{ duration: 150, axis: 'x' }}>
								<Button color="blue" space on:click={showPdf}>
									<Icon key="magnifying-glass" />
									<div class="pl-2 w-24">PDF</div>
								</Button>
							</div>
						{/if}
						{#if show != 'html'}
							<div transition:slide={{ duration: 150, axis: 'x' }}>
								<Button color="blue" space on:click={showHtml}>
									<Icon key="magnifying-glass-plus" />
									<div class="pl-2 w-24">HTML</div>
								</Button>
							</div>
						{/if}
						<Button color="blue" space on:click={copyToClipboard}>
							<Icon key="clipboard" />
						</Button>
					</div>
				{/if}
			</div>
		</form>
	</div>
</div>

<Pdf bind:show={pdfShow} bind:close={pdfClose} />

{#if show == 'html'}
	<div class="flex flex-wrap text-sm p-0.5">
		<div class="font-semibold px-4 py-0.5 text-stone-500">Parameters:</div>
		{#each paramText as p}
			<div class="px-4 py-0.5">{p}</div>
		{/each}
	</div>
	<table class="w-full">
		<tr class="bg-stone-300 dark:bg-stone-800">
			{#each definition.fields as f}
				<td class="font-semibold px-1 w-screen border border-stone-400 dark:border-stone-700">
					<div
						class="flex flex-col w-full
            {f.align == 'center'
							? 'items-center'
							: f.align == 'right'
							? 'items-end'
							: 'items-start'}
          "
					>
						{#if Array.isArray(f.label)}
							{#each f.label as l}
								<div>{l}</div>
							{/each}
						{:else}
							<div>
								{f.label}
							</div>
						{/if}
					</div>
				</td>
			{/each}
		</tr>
		{#each items as i, idx}
			<tr
				class="
          {!i._group
					? 'hover:bg-stone-200 dark:hover:bg-stone-900 ' +
					  (idx % 2 == 0 ? 'bg-white dark:bg-black' : 'bg-stone-100 dark:bg-stone-950')
					: i._group == 1
					? 'font-semibold hover:bg-stone-400 dark:hover:bg-stone-700 bg-stone-300 dark:bg-stone-800'
					: i._group == 2
					? 'font-semibold hover:bg-stone-700 dark:hover:bg-stone-200 bg-stone-600 dark:bg-stone-300 text-white dark:text-black'
					: ''}
          {i._click ? 'cursor-pointer' : ''}
        "
				on:click={i._click
					? () => {
							if (i._click) i._click(i);
					  }
					: null}
			>
				{#each definition.fields as f}
					<td
						class="
            px-1 border border-stone-300 dark:border-stone-700
            {f.type == 'number' && i[f.key] < 0
							? i._group == 2
								? 'text-red-400 dark:text-red-800'
								: 'text-red-700 dark:text-red-400'
							: ''}
          "
					>
						<div
							class="flex w-full
                {f.align == 'center'
								? 'justify-center'
								: f.align == 'right'
								? 'justify-end'
								: 'justify-start'}
              "
						>
							<ReportField definition={f} item={i} />
						</div>
					</td>
				{/each}
			</tr>
		{:else}
			<tr>
				<td
					class="text-center text-stone-700 dark:text-stone-400 p-4"
					colspan={definition.fields.length + 1}
				>
					No items to display
				</td>
			</tr>
		{/each}
	</table>
{/if}
