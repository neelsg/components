<script lang="ts" context="module">
	import type {
		ContentText,
		ContentTable,
		ContentImage,
		ContentColumns,
		ContentStack,
		ContentSvg,
		ContentUnorderedList,
		PageOrientation,
		TableCell,
		Size
	} from 'pdfmake/interfaces';

	export type pdfPageOrientation = PageOrientation;

	export type pdfWidth = Size;

	export type pdfTableCell = TableCell;

	export type pdfContent =
		| string
		| number
		| ContentText
		| ContentColumns
		| ContentTable
		| ContentImage
		| ContentStack
		| ContentSvg
		| ContentUnorderedList
		| pdfContent[];

	export type pdfAsyncContent = (() => Promise<pdfContent>) | pdfContent;

	export type pdfDynamicContent = (
		currentPage: number,
		pageCount: number
	) => pdfContent | undefined;

	export type pdfOptions = {
		pageOrientation?: PageOrientation;
		header?: pdfDynamicContent;
		footer?: pdfDynamicContent;
		fontSize?: number;
		watermark?: {
			text: string;
			color: string;
		};
	};

	export const pdfDataUrl = async (path: string): Promise<string> => {
		const response = await fetch(path);
		const blob = await response.blob();
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (typeof reader.result == 'string') resolve(reader.result);
				resolve('');
			};
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	};

	export const pdfPageNumbers: pdfDynamicContent = (
		currentPage: number,
		pageCount: number
	): pdfContent => {
		return {
			text: `Page ${currentPage} of ${pageCount}`,
			alignment: 'center',
			fontSize: 8
		};
	};

	export const pdfPageNumbersDate: pdfDynamicContent = (
		currentPage: number,
		pageCount: number
	): pdfContent => {
		return {
			columns: [
				{
					text: `${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()}`,
					alignment: 'left',
					fontSize: 8,
					marginLeft: 40
				},
				{
					text: `Page ${currentPage} of ${pageCount}`,
					alignment: 'right',
					fontSize: 8,
					marginRight: 40
				}
			]
		};
	};
</script>

<script lang="ts">
	import type { TDocumentDefinitions } from 'pdfmake/interfaces';
	import { createPdf } from 'pdfmake/build/pdfmake';

	const makeDoc = async (
		doc: pdfAsyncContent,
		options: pdfOptions
	): Promise<TDocumentDefinitions> => {
		const c: pdfContent = typeof doc == 'function' ? await doc() : doc;
		return {
			content: c,
			header: options?.header ?? undefined,
			footer: options?.footer ?? undefined,
			pageOrientation: options?.pageOrientation ?? undefined,
			defaultStyle: {
				fontSize: options?.fontSize ?? 10
			},
			watermark: options?.watermark
				? {
						text: `    ${options.watermark.text}    `,
						color: options.watermark.color,
						opacity: 0.5,
						bold: true
				  }
				: undefined
		};
	};

	export const open = async (doc: pdfAsyncContent, options: pdfOptions) => {
		createPdf(await makeDoc(doc, options), undefined, fonts).open();
	};

	export const show = async (doc: pdfAsyncContent, options: pdfOptions) => {
		createPdf(await makeDoc(doc, options), undefined, fonts).getDataUrl((dataUrl: string) => {
			src = dataUrl;
		});
	};

	export const close = () => {
		src = null;
	};

	const fonts = {
		Roboto: {
			normal:
				'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
			bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
			italics:
				'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
			bolditalics:
				'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
		}
	};

	let src: string | null = null;
</script>

{#if src}
	<iframe class="w-full grow" {src} title="pdf document" />
{/if}
