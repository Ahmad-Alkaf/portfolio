// The two languages of the site. Arabic is the default language and has the URLs with
// no prefix (/projects/). English has the same paths under /en/ (/en/projects/).
// This file has no dictionary import, so a client component can use it.

export type Lang = 'ar' | 'en';

export const LANGS: readonly Lang[] = ['ar', 'en'];
export const DEFAULT_LANG: Lang = 'ar';

export const LANG_INFO = {
	ar: { dir: 'rtl', name: 'العربية', prefix: '', ogLocale: 'ar_SA' },
	en: { dir: 'ltr', name: 'English', prefix: '/en', ogLocale: 'en_US' }
} as const satisfies Record<Lang, { dir: 'rtl' | 'ltr'; name: string; prefix: string; ogLocale: string }>;

export function otherLang(lang: Lang): Lang {
	return lang === 'ar' ? 'en' : 'ar';
}

/** The URL path of a page in one language: ("/projects/", "en") -> "/en/projects/". */
export function localePath(lang: Lang, path: string): string {
	return `${LANG_INFO[lang].prefix}${path}`;
}

/** The page path with no language prefix: "/en/projects/" -> "/projects/". */
export function stripLocale(pathname: string): string {
	const prefix = LANG_INFO.en.prefix;
	if (pathname === prefix) return '/';
	return pathname.startsWith(`${prefix}/`) ? pathname.slice(prefix.length) : pathname;
}
