import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContactSection } from '@/components/ContactSection';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { Lightbox } from '@/components/Lightbox';
import { CaseStudy, Eyebrow, ProjectLinks, Shot, TagChips, toProjectSummary } from '@/components/ProjectBits';
import { getDict, localePath, type Lang } from '@/i18n';
import { getPost, getPosts } from '@/lib/content';
import { formatDate, isoDate } from '@/lib/format';
import { pageMetadata, postImage, projectJsonLd } from '@/lib/seo';

export type PostParams = { params: Promise<{ slug: string }> };

/** The slugs are the same in each language. */
export function postStaticParams() {
	return getPosts('en').map((post) => ({ slug: post.slug }));
}

export async function postMetadata(lang: Lang, { params }: PostParams): Promise<Metadata> {
	const post = getPost((await params).slug, lang);
	if (!post) return {};
	return pageMetadata({
		lang,
		title: post.title,
		description: post.description,
		path: `/posts/${post.slug}/`,
		image: postImage(post.slug),
		article: { publishedTime: isoDate(post.date), tags: post.tagItems.map((tag) => tag.label) }
	});
}

export async function PostPage({ lang, params }: PostParams & { lang: Lang }) {
	const { slug } = await params;
	const post = getPost(slug, lang);
	if (!post) notFound();

	const t = getDict(lang);
	const posts = getPosts(lang);
	const index = posts.indexOf(post);
	const newer = posts[index - 1];
	const older = posts[index + 1];
	const summary = toProjectSummary(post);

	return (
		<>
			<JsonLd data={projectJsonLd(post)} />
			<article className="post">
				<header className="post-head">
					<Link href={localePath(lang, '/projects/')} className="back-link">
						<ArrowLeftIcon /> {t.common.allProjects}
					</Link>
					<Eyebrow post={summary} />
					<h1 className="post-title">{post.title}</h1>
					<p className="post-lead">{post.summary}</p>
					<p className="meta">
						<time dateTime={post.date}>{formatDate(post.date, lang)}</time> · {t.post.minRead(post.readingMinutes)}
					</p>
					<div className="actions">
						<ProjectLinks post={summary} />
					</div>
					<TagChips tags={post.tagItems} lang={lang} />
				</header>

				<div className="post-intro">
					{post.caseStudy ? <CaseStudy caseStudy={post.caseStudy} lang={lang} headingLevel={2} live={post.links.live} /> : null}
					<div className="post-cover">
						<Shot post={summary} sizes="(min-width: 1024px) 572px, calc(100vw - 32px)" priority />
					</div>
				</div>

				<div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
				<Lightbox scope=".post" labels={t.lightbox} />

				<nav className="post-nav" aria-label={t.post.more}>
					{newer ? (
						<Link href={newer.url} className="post-nav-link">
							<span className="eyebrow">
								<ArrowLeftIcon /> {t.post.newer}
							</span>
							<span className="post-nav-title">{newer.name}</span>
						</Link>
					) : (
						<span />
					)}
					{older ? (
						<Link href={older.url} className="post-nav-link post-nav-next">
							<span className="eyebrow">
								{t.post.older} <ArrowRightIcon />
							</span>
							<span className="post-nav-title">{older.name}</span>
						</Link>
					) : null}
				</nav>
			</article>
			<ContactSection lang={lang} />
		</>
	);
}
