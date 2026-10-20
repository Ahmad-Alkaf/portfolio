import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { themeScript } from '@/components/ThemeToggle';
import { site } from '@/site.config';
import './globals.css';

const FAVICONS = '/assets/img/favicons';

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: { default: site.title, template: `%s | ${site.title}` },
	description: site.description,
	applicationName: site.title,
	authors: [{ name: site.author.name, url: site.author.url }],
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
		{ media: '(prefers-color-scheme: light)', color: '#ffffff' },
		{ media: '(prefers-color-scheme: dark)', color: '#121417' }
	]
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang={site.lang} suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body>
				<a href="#main" className="skip-link">
					Skip to content
				</a>
				<Header />
				<main id="main" className="container">
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
