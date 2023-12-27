import { browser } from '$app/environment';
import { toast } from './toast.svelte';

const blanks: { [key: string]: string } = {};

export const docStore = {
	load: (key: string, blank: { [key: string]: unknown }): { [key: string]: unknown } => {
		blanks[key] = JSON.stringify(blank);
		if (browser) {
			const stored = localStorage.getItem(`doc/${key}`);
			if (stored) {
				try {
					return JSON.parse(stored);
				} catch {
					toast.add('Stored document was invalid', 'yellow');
					return docStore.clear(key);
				}
			}
		}
		return blank;
	},
	store: (key: string, value: { [key: string]: unknown }): void => {
		if (browser) {
			localStorage.setItem(`doc/${key}`, JSON.stringify(value));
		}
	},
	clear: (key: string): { [key: string]: unknown } => {
		if (browser) {
			localStorage.removeItem(`doc/${key}`);
			return JSON.parse(blanks[key] || '{}');
		}
		return {};
	}
};
