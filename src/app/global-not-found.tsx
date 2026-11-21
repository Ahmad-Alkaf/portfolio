import type { Metadata } from 'next';
import { getDict, plainText } from '@/i18n';
import { NotFoundPage, notFoundMetadata } from '@/views/NotFoundPage';
import { SiteDocument, siteMetadata, siteViewport } from '@/views/SiteDocument';
import './globals.css';

// The "not found" page of the site (out/404.html), in Arabic, the default language.
// The site has two root layouts, so this page is a complete document of its own
// (`experimental.globalNotFound` in next.config.ts).

const t = getDict('ar');

export const metadata: Metadata = {
	...siteMetadata('ar'),
	...notFoundMetadata('ar'),
	title: plainText(`${t.notFound.title} · ${t.site.name}`)
};
export const viewport = siteViewport;

export default function GlobalNotFound() {
	return (
		<SiteDocument lang="ar" notFound>
			<NotFoundPage lang="ar" />
		</SiteDocument>
	);
}
