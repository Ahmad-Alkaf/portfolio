import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { themeScript } from '@/components/ThemeToggle';
import { site } from '@/site.config';
import './globals.css';

const FAVICONS = '/assets/img/favicons';

// next/font downloads the fonts at build time and serves them from this site.
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
const sans = Geist({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-code', display: 'swap', preload: false });

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: { default: `${site.title} · ${site.role}`, template: `%s · ${site.title}` },
	description: site.description,
	applicationName: site.title,
	authors: [{ name: site.author.name, url: site.author.url }],
	creator: site.author.name,
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

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#f7f5f0' },
		{ media: '(prefers-color-scheme: dark)', color: '#141210' }
	]
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang={site.lang} className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
			<head>
				{/* The page supports both schemes. The theme toggle overrides it with data-scheme on <html>. */}
				<meta name="color-scheme" content="light dark" />
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body>
				<a href="#main" className="skip-link">
					Skip to content
				</a>
				<Header />
				<main id="main" className="container site-main">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
