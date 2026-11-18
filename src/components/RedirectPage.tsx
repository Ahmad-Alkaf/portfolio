import Link from 'next/link';

/**
 * A static page for an old URL that moved. It sends the browser to the new
 * URL at once. The canonical link tells search engines where the page is now.
 */
export function RedirectPage({ to, label }: { to: string; label: string }) {
	return (
		<>
			<meta httpEquiv="refresh" content={`0; url=${to}`} />
			<section className="page-head narrow">
				<p className="eyebrow">This page moved</p>
				<h1 className="page-title">{label}</h1>
				<p>
					Go to <Link href={to}>{label}</Link>.
				</p>
			</section>
		</>
	);
}
