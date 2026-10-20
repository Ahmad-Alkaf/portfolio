function toDate(date: string): Date {
	return new Date(`${date}T00:00:00Z`);
}

/** "Sep 2, 2026" */
export function formatDate(date: string): string {
	return toDate(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

/** "02 Sep" (for the timeline) */
export function formatDayMonth(date: string): string {
	const d = toDate(date);
	const month = d.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
	return `${String(d.getUTCDate()).padStart(2, '0')} ${month}`;
}

/** The date at midnight in the site time zone (Asia/Riyadh, +03:00), as Jekyll wrote it. */
export function isoDate(date: string): string {
	return `${date}T00:00:00+03:00`;
}

export function plural(count: number, one: string, many: string): string {
	return `${count} ${count === 1 ? one : many}`;
}
