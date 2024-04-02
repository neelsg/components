import { browser } from '$app/environment';
import { toast } from './toast.svelte';
import { dbConnect } from './db';

const blanks: { [key: string]: { [key: string]: unknown } } = {};

export const docStore = {
	load: async (
		key: string,
		blank: { [key: string]: unknown }
	): Promise<{ [key: string]: unknown }> => {
		blanks[key] = blank;
		if (!browser) return blank;
		if (!('indexedDB' in window)) {
			// Can't use IndexedDB
			toast.add("This browser doesn't support IndexedDB");
			return blank;
		}
		const db = await dbConnect();
		const stored = await db.get('doc', key);
		if (stored) return stored['value'];
		return blank;
	},
	store: async (key: string, value: { [key: string]: unknown }): Promise<void> => {
		if (!browser) return;
		if (!('indexedDB' in window)) return;
		const db = await dbConnect();
		await db.put('doc', {
			key,
			value
		});
	},
	clear: async (key: string): Promise<{ [key: string]: unknown }> => {
		if (!browser) return {};
		const db = await dbConnect();
		await db.delete('doc', key);
		return blanks[key] ?? {};
	},
	getBlank: (key: string): { [key: string]: unknown } => {
		if (!browser) return {};
		return blanks[key] ?? {};
	}
};
