import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from '@/components/icons';
import { ProjectCard } from '@/components/ProjectCard';
import { toProjectSummary } from '@/components/ProjectBits';
import { SkillGroups } from '@/components/SkillGroups';
import { getDict, localePath, localText, plainText, type Lang } from '@/i18n';
import { getTags } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// The skills page (/tags/) and the page of one technology (/tags/<tag>/).

export function tagsMetadata(lang: Lang) {
	const t = getDict(lang);
	return pageMetadata({ lang, title: t.tags.title, description: t.tags.description, path: '/tags/' });
}

export function TagsPage({ lang }: { lang: Lang }) {
	const t = getDict(lang);
	const tags = [...getTags(lang)].sort((a, b) => b.posts.length - a.posts.length || a.name.localeCompare(b.name));
	return (
		<>
			<header className="page-head">
				<p className="eyebrow">{t.tags.eyebrow}</p>
				<h1 className="page-title">{t.tags.heading}</h1>
				<p className="section-text">{t.tags.text}</p>
			</header>
			<SkillGroups lang={lang} headingLevel={2} />
			<section className="section" aria-labelledby="index-title">
				<header className="section-head">
					<h2 id="index-title" className="section-title section-title-small">
						{t.tags.index}
					</h2>
				</header>
				<ul className="chips chips-large">
					{tags.map((tag) => (
						<li key={tag.slug}>
							<Link className="chip" href={tag.url}>
								{tag.name} <span className="count">{tag.posts.length}</span>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}

export type TagParams = { params: Promise<{ slug: string }> };

/** The tag slugs are the same in each language. */
export function tagStaticParams() {
	return getTags('en').map((tag) => ({ slug: tag.slug }));
}

function findTag(slug: string, lang: Lang) {
	return getTags(lang).find((tag) => tag.slug === slug);
}

export async function tagMetadata(lang: Lang, { params }: TagParams): Promise<Metadata> {
	const tag = findTag((await params).slug, lang);
	if (!tag) return {};
	const t = getDict(lang);
	return pageMetadata({
		lang,
		title: t.tag.title(tag.name),
		description: t.tag.description(
			tag.name,
			tag.posts.map((post) => plainText(post.name))
		),
		path: `/tags/${tag.slug}/`
	});
}

export async function TagPage({ lang, params }: TagParams & { lang: Lang }) {
	const tag = findTag((await params).slug, lang);
	if (!tag) notFound();
	const t = getDict(lang);
	return (
		<>
			<header className="page-head">
				<Link href={localePath(lang, '/tags/')} className="back-link">
					<ArrowLeftIcon /> {t.tag.back}
				</Link>
				<p className="eyebrow">{t.tag.eyebrow}</p>
				<h1 className="page-title">{localText(lang, tag.name)}</h1>
				<p className="section-text">{t.tag.uses(tag.posts.length)}</p>
			</header>
			<ul className="cards">
				{tag.posts.map((post) => (
					<li key={post.slug}>
						<ProjectCard post={toProjectSummary(post)} headingLevel={2} />
					</li>
				))}
			</ul>
		</>
	);
}
