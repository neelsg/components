<script lang="ts" context="module">
</script>

<script lang="ts">
	import {
		Button,
		Pdf,
		type pdfContent,
		type pdfAsyncContent,
		type pdfOptions,
		pdfPageNumbers
	} from '$lib';

	const doc: pdfContent = 'Hello PDFMake';

	let showPdf: (doc: pdfAsyncContent, opt: pdfOptions) => Promise<void>;
	let openPdf: (doc: pdfAsyncContent, opt: pdfOptions) => Promise<void>;
	let closePdf: () => void;
</script>

<div class="flex">
	<Button
		space
		on:click={() =>
			showPdf(doc, {
				pageOrientation: 'landscape',
				watermark: { text: 'TEST', color: '#00f' },
				footer: pdfPageNumbers
			})}>Show</Button
	>
	<Button space on:click={closePdf}>Close</Button>
	<Button space on:click={() => openPdf(doc, { header: pdfPageNumbers })}>Open</Button>
</div>

<div class="w-full p-2 border-2 border-red-500 flex flex-col grow">
	<Pdf bind:show={showPdf} bind:close={closePdf} bind:open={openPdf} />
</div>

{#if !doc}
	<div />
{/if}
