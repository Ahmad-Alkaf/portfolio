import Link from 'next/link';
import { ArrowRightIcon } from './icons';
import { CaseStudy, Eyebrow, ProjectLinks, Shot, TagChips, toProjectSummary } from './ProjectBits';
import type { Post } from '@/lib/content';

/** A featured project on the home page: a large image, the case study in short, and the links. */
export function ProjectFeature({ post, priority = false }: { post: Post; priority?: boolean }) {
	const summary = toProjectSummary(post);
	return (
		<article className="feature" aria-labelledby={`feature-${post.slug}`}>
			<Link href={post.url} className="feature-media" tabIndex={-1} aria-hidden="true">
				<Shot post={summary} sizes="(min-width: 960px) 560px, calc(100vw - 32px)" priority={priority} />
			</Link>
			<div className="feature-body">
				<Eyebrow post={summary} />
				<h3 id={`feature-${post.slug}`} className="feature-title">
					<Link href={post.url}>{post.name}</Link>
				</h3>
				<p className="feature-summary">{post.summary}</p>
				{post.caseStudy ? <CaseStudy caseStudy={post.caseStudy} /> : null}
				<TagChips tags={post.tagItems} limit={6} />
				<div className="actions">
					<Link href={post.url} className="button button-primary">
						Case study <ArrowRightIcon />
						<span className="visually-hidden">: {post.name}</span>
					</Link>
					<ProjectLinks post={summary} />
				</div>
			</div>
		</article>
	);
}
