import type { Metadata } from 'next';
import Link from 'next/link';
import { getDict, localePath, plainText, type Lang } from '@/i18n';
import { SITE_IMAGE } from '@/lib/seo';

// The "not found" page. The Arabic page is src/app/global-not-found.tsx (out/404.html).
// The English page is src/app/en/not-found/page.tsx, and scripts/postbuild.mjs moves
// it to out/en/404.html. Cloudflare Pages serves the nearest 404.html of a path.

export function notFoundMetadata(lang: Lang): Metadata {
	const title = plainText(getDict(lang).notFound.title);
	// The share image is set here: the page has no canonical URL, so it does not use pageMetadata().
	const images = [{ url: SITE_IMAGE.url, width: 1200, height: 630, alt: SITE_IMAGE.alt, type: 'image/png' }];
	return { title, robots: { index: false }, openGraph: { title, images }, twitter: { card: 'summary_large_image', title, images } };
}

export function NotFoundPage({ lang }: { lang: Lang }) {
	const t = getDict(lang);
	return (
		<section className="page-head narrow">
			<p className="eyebrow">404</p>
			<h1 className="page-title">{t.notFound.heading}</h1>
			<p className="section-text">{t.notFound.text}</p>
			<div className="actions">
				<Link href={localePath(lang, '/')} className="button button-primary">
					{t.common.home}
				</Link>
				<Link href={localePath(lang, '/projects/')} className="button button-ghost">
					{t.common.allProjects}
				</Link>
				<Link href={localePath(lang, '/resume/')} className="button button-ghost">
					{t.common.resume}
				</Link>
			</div>
		</section>
	);
}
