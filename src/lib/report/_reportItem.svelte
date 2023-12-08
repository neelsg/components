<script lang="ts" context="module">
	export type reportItem = {
		[key: string]: any;
		_group?: 0 | 1 | 2;
		_click?: (item: reportItem) => void;
		_mask?: string[];
	};
</script>
