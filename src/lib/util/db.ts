import { openDB } from 'idb';

export const dbConnect = async () => {
	return openDB('components', 2, {
		upgrade: (db) => {
			if (!db.objectStoreNames.contains('doc')) db.createObjectStore('doc', { keyPath: 'key' });
			if (!db.objectStoreNames.contains('setting'))
				db.createObjectStore('setting', { keyPath: 'key' });
		}
	});
};
