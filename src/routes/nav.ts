import type { navNode } from '$lib';
import { nodes as testNodes } from './test/nav';

export const nodes: navNode[] = [
	{ label: 'Test', url: '/test', children: testNodes, color: 'amber' }
];
