import Link from 'next/link';
import { getPosts, type Post } from '@/lib/content';
import { formatDayMonth } from '@/lib/format';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
	title: 'Timeline',
	description: 'All projects of Ahmed Alkaf, by year.',
	path: '/timeline/'
});

export default function TimelinePage() {
	const years = new Map<string, Post[]>();
	for (const post of getPosts()) {
		const year = post.date.slice(0, 4);
		years.set(year, [...(years.get(year) ?? []), post]);
	}
	return (
		<>
			<h1 className="page-title">Timeline</h1>
			<div className="timeline">
				{[...years].map(([year, posts]) => (
					<section key={year}>
						<h2>{year}</h2>
						<ul>
							{posts.map((post) => (
								<li key={post.slug}>
									<time dateTime={post.date}>{formatDayMonth(post.date)}</time>
									<Link href={post.url}>{post.title}</Link>
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</>
	);
}
