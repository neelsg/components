import type { iconPaths } from '../widget/icon.svelte';
import type { colorFull } from '../util/color.js';

export type navNode = {
	label: string;
	url?: string;
	icon?: keyof typeof iconPaths;
	color?: (typeof colorFull)[number];
	children?: navNode[];
	hide?: (context: unknown) => boolean;
	iconOnly?: boolean;
	[key: string]: unknown;
};

export const nav = {
	getVisible: (nodes: navNode[], context: unknown): navNode[] => {
		// Filter out any nodes that should be hidden
		return nodes.filter((n) => !n.hide || !n.hide(context));
	},
	getCurrent: (url: string | null, nodes: navNode[], context: unknown): navNode | null => {
		// Get a node based on it's URL. This is useful if you need node information for the current page
		if (!url) return null;
		for (const n of nodes) {
			if (url == n.url) {
				return n;
			}
			if (n.children) {
				const res = nav.getCurrent(url, n.children, context);
				if (res) return res;
			}
		}
		return null;
	},
	getAncestors: (
		url: string | null,
		nodes: navNode[],
		context: unknown,
		parents?: navNode[]
	): navNode[] | null => {
		// Get a list of the nodes that are parents for the node with a given URL. This is useful for crumbs
		if (!url) return [];
		for (const n of nodes) {
			if (url == n.url) {
				return [...(parents || []), n];
			}
			if (n.children) {
				const res = nav.getAncestors(url, n.children, context, [...(parents || []), n]);
				if (res) return res;
			}
		}
		return null;
	},
	getFromUrls: (urls: string[], nodes: navNode[], context: unknown): navNode[] => {
		// Filter out any nodes that should be hidden and remove any URLs that are not on the list. This is useful for shortcuts
		const visible = nav.getVisible(nodes, context);
		const cleared = visible.map((n): navNode => {
			const node = JSON.parse(JSON.stringify(n));
			if (node.url && !urls.includes(node.url)) delete node.url;
			if (node.children) node.children = nav.getFromUrls(urls, node.children, context);
			return node;
		});
		const hasUrls = (node: navNode): boolean => {
			if (node.url) return true;
			for (const c of node.children ?? []) {
				if (hasUrls(c)) return true;
			}
			return false;
		};
		return cleared.filter((n) => hasUrls(n));
	}
};
