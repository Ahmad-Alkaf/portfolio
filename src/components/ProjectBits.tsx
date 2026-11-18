import Link from 'next/link';
import { ArrowUpRightIcon, GitHubIcon } from './icons';
import type { Post, TagItem } from '@/lib/content';

/** The fields that the project cards need (no HTML body), so the client filter gets a small payload. */
export type ProjectSummary = Pick<
	Post,
	'slug' | 'url' | 'name' | 'date' | 'summary' | 'kind' | 'status' | 'links' | 'screenshot' | 'image' | 'tagItems'
>;

export function toProjectSummary(post: Post): ProjectSummary {
	const { slug, url, name, date, summary, kind, status, links, screenshot, image, tagItems } = post;
	return { slug, url, name, date, summary, kind, status, links, screenshot, image, tagItems };
}

const STATUS_LABEL: Record<string, string> = {
	live: 'Live',
	'public repo': 'Public repo',
	'open source': 'Open source',
	'not deployed': 'Not deployed'
};

export function StatusBadge({ status }: { status?: string }) {
	if (!status) return null;
	return (
		<span className="status" data-status={status}>
			{STATUS_LABEL[status] ?? status}
		</span>
	);
}

/** "Personal product · 2025" */
export function Eyebrow({ post }: { post: ProjectSummary }) {
	return (
		<p className="eyebrow">
			<span>{[post.kind, post.date.slice(0, 4)].filter(Boolean).join(' · ')}</span>
			<StatusBadge status={post.status} />
		</p>
	);
}

/** The stack chips. Links go to the skill pages. */
export function TagChips({ tags, link = true, limit }: { tags: TagItem[]; link?: boolean; limit?: number }) {
	const shown = limit ? tags.slice(0, limit) : tags;
	const rest = tags.length - shown.length;
	return (
		<ul className="chips" aria-label="Stack">
			{shown.map((tag) => (
				<li key={tag.slug}>
					{link ? (
						<Link className="chip" href={tag.url}>
							{tag.label}
						</Link>
					) : (
						<span className="chip">{tag.label}</span>
					)}
				</li>
			))}
			{rest > 0 ? (
				<li>
					<span className="chip chip-more">+{rest}</span>
				</li>
			) : null}
		</ul>
	);
}

/**
 * The project image: a screenshot in a browser frame (with the live domain in
 * the address bar), or the project logo on a plain panel.
 */
export function Shot({ post, sizes, priority = false }: { post: ProjectSummary; sizes: string; priority?: boolean }) {
	const loading = priority ? undefined : 'lazy';
	const fetchPriority = priority ? 'high' : undefined;
	if (post.screenshot) {
		const { src, small, alt, domain } = post.screenshot;
		return (
			<div className="shot">
				<div className="shot-bar" aria-hidden="true">
					<span className="shot-dots" />
					<span className="shot-url">{domain ?? (post.links.source ? post.links.source.replace(/^https:\/\//, '') : post.name)}</span>
				</div>
				<img
					src={src}
					srcSet={small ? `${small} 640w, ${src} 1280w` : undefined}
					sizes={small ? sizes : undefined}
					alt={alt}
					width={1280}
					height={720}
					loading={loading}
					fetchPriority={fetchPriority}
					decoding="async"
				/>
			</div>
		);
	}
	if (post.image) {
		return (
			<div className="shot shot-logo">
				<img src={post.image.src} alt={post.image.alt} width={1200} height={630} loading={loading} fetchPriority={fetchPriority} decoding="async" />
			</div>
		);
	}
	return null;
}

/** "Live site" and "Source" links. */
export function ProjectLinks({ post, compact = false }: { post: ProjectSummary; compact?: boolean }) {
	const { live, source } = post.links;
	if (!live && !source) return null;
	return (
		<>
			{live ? (
				<a className={compact ? 'text-link' : 'button button-ghost'} href={live} target="_blank" rel="noopener noreferrer">
					Live site <ArrowUpRightIcon />
					<span className="visually-hidden"> of {post.name} (opens in a new tab)</span>
				</a>
			) : null}
			{source ? (
				<a className={compact ? 'text-link' : 'button button-ghost'} href={source} target="_blank" rel="noopener noreferrer">
					{compact ? null : <GitHubIcon width={16} height={16} />}
					Source <ArrowUpRightIcon />
					<span className="visually-hidden"> of {post.name} on GitHub (opens in a new tab)</span>
				</a>
			) : null}
		</>
	);
}

export function CaseStudy({ caseStudy, headingLevel = 3 }: { caseStudy: NonNullable<Post['caseStudy']>; headingLevel?: 2 | 3 }) {
	const rows = [
		['Problem', caseStudy.problem],
		['What I built', caseStudy.built],
		['Result', caseStudy.result]
	] as const;
	const list = (
		<dl>
			{rows.map(([term, text]) => (
				<div key={term}>
					<dt>{term}</dt>
					<dd>{text}</dd>
				</div>
			))}
		</dl>
	);
	// On a post page the box is a section with its own heading. On the home page it is part of the
	// project article, so it is not a landmark (four landmarks with one name would repeat).
	if (headingLevel === 2) {
		return (
			<section className="case" aria-labelledby="case-title">
				<h2 id="case-title" className="case-title">
					In short
				</h2>
				{list}
			</section>
		);
	}
	return <div className="case">{list}</div>;
}
