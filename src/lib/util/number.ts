export const numberFormat = (value: number, decimals: number): string => {
	if (typeof value == 'string') return value;
	const r = (value || 0).toFixed(decimals).split('.');
	return r[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + (r[1] ? '.' + r[1] : '');
};
