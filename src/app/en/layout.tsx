import type { ReactNode } from 'react';
import { SiteDocument, siteMetadata, siteViewport } from '@/views/SiteDocument';
import '../globals.css';

// The root layout of the English pages (/en/, /en/projects/, ...).
// The Arabic pages have their own root layout in src/app/(ar)/. Each one sets <html lang dir>.

export const metadata = siteMetadata('en');
export const viewport = siteViewport;

export default function EnglishLayout({ children }: { children: ReactNode }) {
	return <SiteDocument lang="en">{children}</SiteDocument>;
}
