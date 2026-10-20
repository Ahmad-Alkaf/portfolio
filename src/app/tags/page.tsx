import Link from 'next/link';
import { getTags } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
	title: 'Skills',
	description: 'The skills and tools that Ahmed Alkaf used in his projects.',
	path: '/tags/'
});

export default function TagsPage() {
	const tags = getTags();
	return (
		<>
			<h1 className="page-title">Skills</h1>
			<ul className="tags tags-large">
				{tags.map((tag) => (
					<li key={tag.slug}>
						<Link className="tag" href={tag.url}>
							{tag.name}
							<span className="count">{tag.posts.length}</span>
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}
