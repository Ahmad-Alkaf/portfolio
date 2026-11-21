import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { themeScript } from '@/components/ThemeToggle';
import { LANG_INFO, getDict, plainText, type Lang } from '@/i18n';
import { fontClass } from '@/lib/fonts';
import { site } from '@/site.config';

// The document of each page: <html> with the language and the direction, the header,
// the main area, and the footer. Each language has its own root layout
// (src/app/(ar)/layout.tsx and src/app/en/layout.tsx), and both use this file.

const FAVICONS = '/assets/img/favicons';

export function siteMetadata(lang: Lang): Metadata {
	const t = getDict(lang);
	const name = plainText(t.site.name);
	return {
		metadataBase: new URL(site.url),
		title: { default: plainText(`${t.site.name} · ${t.site.role}`), template: `%s · ${name}` },
		description: plainText(t.site.description),
		applicationName: name,
		authors: [{ name, url: `${site.url}${LANG_INFO[lang].prefix}/` }],
		creator: name,
		icons: {
			icon: [
				{ url: `${FAVICONS}/favicon-96x96.png`, sizes: '96x96', type: 'image/png' },
				{ url: `${FAVICONS}/favicon.svg`, type: 'image/svg+xml' }
			],
			shortcut: `${FAVICONS}/favicon.ico`,
			apple: [{ url: `${FAVICONS}/apple-touch-icon.png`, sizes: '180x180' }]
		},
		manifest: `${FAVICONS}/site.webmanifest`
	};
}

export const siteViewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#f7f5f0' },
		{ media: '(prefers-color-scheme: dark)', color: '#141210' }
	]
};

export function SiteDocument({ lang, notFound = false, children }: { lang: Lang; notFound?: boolean; children: ReactNode }) {
	const t = getDict(lang);
	return (
		<html lang={lang} dir={LANG_INFO[lang].dir} className={fontClass[lang]} suppressHydrationWarning>
			{/* This component is the document of the root layouts, where <head> is correct. */}
			{/* eslint-disable-next-line @next/next/no-head-element */}
			<head>
				{/* The page supports both schemes. The theme toggle overrides it with data-scheme on <html>. */}
				<meta name="color-scheme" content="light dark" />
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body>
				<a href="#main" className="skip-link">
					{t.common.skip}
				</a>
				<Header lang={lang} notFound={notFound} />
				<main id="main" className="container site-main">
					{children}
				</main>
				<Footer lang={lang} />
			</body>
		</html>
	);
}
