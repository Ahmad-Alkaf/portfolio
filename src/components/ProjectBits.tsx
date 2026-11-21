import { Fragment, type ReactNode } from 'react';
import Link from 'next/link';
import { ArrowUpRightIcon, GitHubIcon } from './icons';
import type { Post, TagItem } from '@/lib/content';
import { getDict, plainText, type Lang } from '@/i18n';

/** The fields that the project cards need (no HTML body). `lang` gives the language of the labels. */
export type ProjectSummary = Pick<
	Post,
	'lang' | 'slug' | 'url' | 'name' | 'date' | 'summary' | 'kind' | 'status' | 'links' | 'screenshot' | 'image' | 'tagItems'
>;

export function toProjectSummary(post: Post): ProjectSummary {
	const { lang, slug, url, name, date, summary, kind, status, links, screenshot, image, tagItems } = post;
	return { lang, slug, url, name, date, summary, kind, status, links, screenshot, image, tagItems };
}

export function StatusBadge({ status, lang }: { status?: string; lang: Lang }) {
	if (!status) return null;
	return (
		<span className="status" data-status={status}>
			{getDict(lang).project.status[status] ?? status}
		</span>
	);
}

/** "Personal product · 2025" */
export function Eyebrow({ post }: { post: ProjectSummary }) {
	return (
		<p className="eyebrow">
			<span>{[post.kind, post.date.slice(0, 4)].filter(Boolean).join(' · ')}</span>
			<StatusBadge status={post.status} lang={post.lang} />
		</p>
	);
}

/** The stack chips. Links go to the skill pages. A chip is left-to-right in each language (a technology name). */
export function TagChips({ tags, lang, link = true, limit }: { tags: TagItem[]; lang: Lang; link?: boolean; limit?: number }) {
	const shown = limit ? tags.slice(0, limit) : tags;
	const rest = tags.length - shown.length;
	return (
		<ul className="chips" aria-label={getDict(lang).project.stack}>
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
 * the address bar), or the project logo on a plain panel. The browser frame is
 * left-to-right in each language, as a real browser window is.
 */
export function Shot({ post, sizes, priority = false, href }: { post: ProjectSummary; sizes: string; priority?: boolean; href?: string }) {
	const newTab = getDict(post.lang).common.newTab;
	const loading = priority ? undefined : 'lazy';
	const fetchPriority = priority ? 'high' : undefined;
	// With `href`, the image is a link to the post. The link is only on the image, because the
	// address bar can have its own link to the live site (a link cannot be inside a link).
	const media = (img: ReactNode) =>
		href ? (
			<Link href={href} className="shot-link" tabIndex={-1} aria-hidden="true">
				{img}
			</Link>
		) : (
			img
		);
	if (post.screenshot) {
		const { src, small, alt, domain } = post.screenshot;
		const live = post.links.live;
		const label = domain ?? (post.links.source ? post.links.source.replace(/^https:\/\//, '') : plainText(post.name));
		return (
			<div className="shot">
				<div className="shot-bar" dir="ltr" aria-hidden={live ? undefined : true}>
					<span className="shot-dots" aria-hidden="true" />
					{live ? (
						<a className="shot-url" href={live} target="_blank" rel="noopener noreferrer">
							<span className="shot-url-text">{label}</span>
							<ArrowUpRightIcon width={11} height={11} />
							<span className="visually-hidden">{newTab}</span>
						</a>
					) : (
						<span className="shot-url">
							<span className="shot-url-text">{label}</span>
						</span>
					)}
				</div>
				{media(
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
				)}
			</div>
		);
	}
	if (post.image) {
		return (
			<div className="shot shot-logo">
				{media(
					<img src={post.image.src} alt={post.image.alt} width={1200} height={630} loading={loading} fetchPriority={fetchPriority} decoding="async" />
				)}
			</div>
		);
	}
	return null;
}

/** The text with each mention of the live domain as a link to the live site (new tab, with the arrow icon). */
function withLiveLink(text: string, live: string | undefined, newTab: string): ReactNode {
	if (!live) return text;
	const host = new URL(live).hostname;
	// In Arabic text the domain is inside an isolate (see src/i18n/bidi.ts). The link takes the place of both.
	const parts = text.split(new RegExp(`\u2066?${host.replace(/\./g, '\\.')}\u2069?`));
	if (parts.length === 1) return text;
	return parts.map((part, i) => (
		<Fragment key={i}>
			{i > 0 ? (
				<a className="ext-link" href={live} target="_blank" rel="noopener noreferrer">
					{host}
					<ArrowUpRightIcon width={13} height={13} />
					<span className="visually-hidden">{newTab}</span>
				</a>
			) : null}
			{part}
		</Fragment>
	));
}

/** "Live site" and "Source" links. */
export function ProjectLinks({ post, compact = false }: { post: ProjectSummary; compact?: boolean }) {
	const { live, source } = post.links;
	if (!live && !source) return null;
	const t = getDict(post.lang).project;
	const name = plainText(post.name);
	return (
		<>
			{live ? (
				<a className={compact ? 'text-link' : 'button button-ghost'} href={live} target="_blank" rel="noopener noreferrer">
					{t.live} <ArrowUpRightIcon />
					<span className="visually-hidden">{t.liveOf(name)}</span>
				</a>
			) : null}
			{source ? (
				<a className={compact ? 'text-link' : 'button button-ghost'} href={source} target="_blank" rel="noopener noreferrer">
					{compact ? null : <GitHubIcon width={16} height={16} />}
					{t.source} <ArrowUpRightIcon />
					<span className="visually-hidden">{t.sourceOf(name)}</span>
				</a>
			) : null}
		</>
	);
}

export function CaseStudy({
	caseStudy,
	lang,
	headingLevel = 3,
	live
}: {
	caseStudy: NonNullable<Post['caseStudy']>;
	lang: Lang;
	headingLevel?: 2 | 3;
	/** The live site URL. Each mention of its domain in the text becomes a link. */
	live?: string;
}) {
	const t = getDict(lang);
	const rows = [
		[t.project.problem, caseStudy.problem],
		[t.project.built, caseStudy.built],
		[t.project.result, caseStudy.result]
	] as const;
	const list = (
		<dl>
			{rows.map(([term, text]) => (
				<div key={term}>
					<dt>{term}</dt>
					<dd>{withLiveLink(text, live, t.common.newTab)}</dd>
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
					{t.project.inShort}
				</h2>
				{list}
			</section>
		);
	}
	return <div className="case">{list}</div>;
}
