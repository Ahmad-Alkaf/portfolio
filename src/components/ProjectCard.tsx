import Link from 'next/link';
import { Eyebrow, ProjectLinks, Shot, TagChips, type ProjectSummary } from './ProjectBits';

/** A compact project card. The title link covers the whole card. */
export function ProjectCard({ post, headingLevel = 3 }: { post: ProjectSummary; headingLevel?: 2 | 3 }) {
	const Heading = headingLevel === 2 ? 'h2' : 'h3';
	return (
		<article className="card">
			<Shot post={post} sizes="(min-width: 960px) 340px, (min-width: 640px) 45vw, calc(100vw - 32px)" />
			<div className="card-body">
				<Eyebrow post={post} />
				<Heading className="card-title">
					<Link href={post.url} className="card-link">
						{post.name}
					</Link>
				</Heading>
				<p className="card-summary">{post.summary}</p>
				<TagChips tags={post.tagItems} lang={post.lang} link={false} limit={4} />
				<p className="card-links">
					<ProjectLinks post={post} compact />
				</p>
			</div>
		</article>
	);
}
