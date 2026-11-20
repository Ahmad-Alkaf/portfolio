import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ContactSection } from '@/components/ContactSection';
import { ArrowLeftIcon, ArrowRightIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { Lightbox } from '@/components/Lightbox';
import { CaseStudy, Eyebrow, ProjectLinks, Shot, TagChips, toProjectSummary } from '@/components/ProjectBits';
import { getPost, getPosts } from '@/lib/content';
import { formatDate, isoDate } from '@/lib/format';
import { pageMetadata, projectJsonLd } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
	return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const post = getPost((await params).slug);
	if (!post) return {};
	return pageMetadata({
		title: post.title,
		description: post.description,
		path: post.url,
		image: { url: `${post.url}opengraph-image`, alt: `${post.title}: ${post.summary}` },
		article: { publishedTime: isoDate(post.date), tags: post.tagItems.map((tag) => tag.label) }
	});
}

export default async function PostPage({ params }: Props) {
	const { slug } = await params;
	const post = getPost(slug);
	if (!post) notFound();

	const posts = getPosts();
	const index = posts.indexOf(post);
	const newer = posts[index - 1];
	const older = posts[index + 1];
	const summary = toProjectSummary(post);

	return (
		<>
			<JsonLd data={projectJsonLd(post)} />
			<article className="post">
				<header className="post-head">
					<Link href="/projects/" className="back-link">
						<ArrowLeftIcon /> All projects
					</Link>
					<Eyebrow post={summary} />
					<h1 className="post-title">{post.title}</h1>
					<p className="post-lead">{post.summary}</p>
					<p className="meta">
						<time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
					</p>
					<div className="actions">
						<ProjectLinks post={summary} />
					</div>
					<TagChips tags={post.tagItems} />
				</header>

				<div className="post-intro">
					{post.caseStudy ? <CaseStudy caseStudy={post.caseStudy} headingLevel={2} live={post.links.live} /> : null}
					<div className="post-cover">
						<Shot post={summary} sizes="(min-width: 1024px) 572px, calc(100vw - 32px)" priority />
					</div>
				</div>

				<div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
				<Lightbox scope=".post" />

				<nav className="post-nav" aria-label="More projects">
					{newer ? (
						<Link href={newer.url} className="post-nav-link">
							<span className="eyebrow">
								<ArrowLeftIcon /> Newer
							</span>
							<span className="post-nav-title">{newer.name}</span>
						</Link>
					) : (
						<span />
					)}
					{older ? (
						<Link href={older.url} className="post-nav-link post-nav-next">
							<span className="eyebrow">
								Older <ArrowRightIcon />
							</span>
							<span className="post-nav-title">{older.name}</span>
						</Link>
					) : null}
				</nav>
			</article>
			<ContactSection />
		</>
	);
}
