import type { Lang } from '@/i18n/config';

// Arabic dates use the Gregorian calendar and Western digits (2 سبتمبر 2026), as the rest of the site does.
const DATE_LOCALE: Record<Lang, string> = { en: 'en-US', ar: 'ar-u-ca-gregory-nu-latn' };

function toDate(date: string): Date {
	return new Date(`${date}T00:00:00Z`);
}

/** "Sep 2, 2026", or "2 سبتمبر 2026" in Arabic. */
export function formatDate(date: string, lang: Lang): string {
	return toDate(date).toLocaleDateString(DATE_LOCALE[lang], { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
}

/** The date at midnight in the site time zone (Asia/Riyadh, +03:00), as Jekyll wrote it. */
export function isoDate(date: string): string {
	return `${date}T00:00:00+03:00`;
}
