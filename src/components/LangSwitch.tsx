'use client';

import { usePathname } from 'next/navigation';
import { LANG_INFO, localePath, otherLang, stripLocale, type Lang } from '@/i18n/config';

/**
 * The link to the same page in the other language (/posts/Etamyd/ <-> /en/posts/Etamyd/).
 * The label is the name of the other language, in that language. The query of the
 * page (the project filter, ?stack=react) goes with the link.
 */
export function LangSwitch({ lang, home = false }: { lang: Lang; home?: boolean }) {
	const pathname = usePathname();
	const target = otherLang(lang);
	const path = stripLocale(pathname.endsWith('/') ? pathname : `${pathname}/`);
	// A "not found" page has no page in the other language: the link goes to the home page.
	const href = localePath(target, home || /^\/_?not-found\/$/.test(path) ? '/' : path);
	return (
		// A plain <a>: the other language has its own root layout, so the browser loads a new document.
		<a
			className="lang-switch"
			href={href}
			lang={target}
			hrefLang={target}
			dir={LANG_INFO[target].dir}
			// On a "not found" page the browser path is not the path of the static page.
			suppressHydrationWarning
			onClick={(event) => {
				// The browser follows the link after this handler, with the query of the page.
				event.currentTarget.search = window.location.search;
			}}
		>
			{LANG_INFO[target].name}
		</a>
	);
}
