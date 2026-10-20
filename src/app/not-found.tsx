import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: '404: Page not found',
	robots: { index: false }
};

export default function NotFound() {
	return (
		<>
			<h1 className="page-title">404: Page not found</h1>
			<p>Sorry, we&apos;ve misplaced that URL or it&apos;s pointing to something that doesn&apos;t exist.</p>
			<p>
				<Link href="/">Go to the home page</Link>
			</p>
		</>
	);
}
