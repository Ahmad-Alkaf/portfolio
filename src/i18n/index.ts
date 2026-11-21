// The dictionaries. Server components get the text with getDict(lang) and give
// client components the few strings that they need as props.

import { ar } from './ar';
import { isolateLatin } from './bidi';
import type { Lang } from './config';
import { en, type Dictionary } from './en';

export * from './config';
export { isolateLatin, plainText } from './bidi';
export type { Dictionary };

/** Each string of the Arabic dictionary gets its Latin names in left-to-right isolates (see bidi.ts). */
function isolateDeep<T>(value: T): T {
	if (typeof value === 'string') return isolateLatin(value) as T;
	if (typeof value === 'function') {
		const fn = value as (...args: unknown[]) => unknown;
		return ((...args: unknown[]) => isolateDeep(fn(...args))) as T;
	}
	if (Array.isArray(value)) return value.map((item) => isolateDeep(item)) as T;
	if (value && typeof value === 'object') {
		return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, isolateDeep(item)])) as T;
	}
	return value;
}

/** A text with Latin names (a tag name, a list of tags) for a page in `lang`: isolated in Arabic, as it is in English. */
export function localText(lang: Lang, text: string): string {
	return lang === 'ar' ? isolateLatin(text) : text;
}

const dictionaries: Record<Lang, Dictionary> = { en, ar: isolateDeep(ar) };

export function getDict(lang: Lang): Dictionary {
	return dictionaries[lang];
}
