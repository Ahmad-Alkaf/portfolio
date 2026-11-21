import Link from 'next/link';
import { getDict, type Lang } from '@/i18n';

/**
 * A static page for an old URL that moved. It sends the browser to the new
 * URL at once. The canonical link tells search engines where the page is now.
 */
export function RedirectPage({ lang, to, label }: { lang: Lang; to: string; label: string }) {
	const t = getDict(lang);
	const [before, after] = t.redirect.goTo;
	return (
		<>
			<meta httpEquiv="refresh" content={`0; url=${to}`} />
			<section className="page-head narrow">
				<p className="eyebrow">{t.redirect.eyebrow}</p>
				<h1 className="page-title">{label}</h1>
				<p>
					{before}
					<Link href={to}>{label}</Link>
					{after}
				</p>
			</section>
		</>
	);
}
