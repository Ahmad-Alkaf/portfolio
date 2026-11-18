import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Page not found',
	robots: { index: false }
};

export default function NotFound() {
	return (
		<section className="page-head narrow">
			<p className="eyebrow">404</p>
			<h1 className="page-title">This page does not exist</h1>
			<p className="section-text">The link may be old, or the page moved. These pages can help:</p>
			<div className="actions">
				<Link href="/" className="button button-primary">
					Home
				</Link>
				<Link href="/projects/" className="button button-ghost">
					All projects
				</Link>
				<Link href="/resume/" className="button button-ghost">
					Resume
				</Link>
			</div>
		</section>
	);
}
