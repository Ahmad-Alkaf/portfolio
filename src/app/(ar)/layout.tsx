import type { ReactNode } from 'react';
import { SiteDocument, siteMetadata, siteViewport } from '@/views/SiteDocument';
import '../globals.css';

// The root layout of the Arabic pages (the default language: /, /projects/, ...).
// The English pages have their own root layout in src/app/en/. Each one sets <html lang dir>.

export const metadata = siteMetadata('ar');
export const viewport = siteViewport;

export default function ArabicLayout({ children }: { children: ReactNode }) {
	return <SiteDocument lang="ar">{children}</SiteDocument>;
}
