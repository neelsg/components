import type { iconPaths } from '../widget/icon.svelte';
import type { colorFull } from '../util/color.js';

export type navNode = {
	label: string;
	url?: string;
	icon?: keyof typeof iconPaths;
	color?: (typeof colorFull)[number];
	children?: navNode[];
	hide?: (context: unknown) => boolean;
	[key: string]: unknown;
};

export const nav = {
	getVisible: (nodes: navNode[], context: unknown): navNode[] => {
		return nodes.filter((n) => !n.hide || !n.hide(context));
	},
	getCurrent: (url: string | null, nodes: navNode[], context: unknown): navNode | null => {
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
	}
};
