import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPosts, slugify } from '@/lib/content';
import { formatDate, isoDate } from '@/lib/format';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/site.config';

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
		image: post.image,
		article: { publishedTime: isoDate(post.date), tags: post.tags }
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

	return (
		<article className="post">
			<header className="post-header">
				<h1>{post.title}</h1>
				<p className="meta">
					Posted <time dateTime={post.date}>{formatDate(post.date)}</time> · By {site.author.name} · {post.readingMinutes} min read
				</p>
				{post.image ? (
					<img className="post-cover" src={post.image.src} alt={post.image.alt} width={1200} height={630} />
				) : null}
			</header>

			<div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

			<footer className="post-footer">
				{post.categories.length > 0 ? (
					<p className="meta">
						Categories:{' '}
						{post.categories.map((name, i) => (
							<span key={name}>
								{i > 0 ? ', ' : null}
								<Link href={`/categories/${slugify(name)}/`}>{name}</Link>
							</span>
						))}
					</p>
				) : null}
				{post.tags.length > 0 ? (
					<ul className="tags" aria-label="Skills">
						{post.tags.map((tag) => (
							<li key={tag}>
								<Link className="tag" href={`/tags/${slugify(tag)}/`}>
									{tag}
								</Link>
							</li>
						))}
					</ul>
				) : null}
				<p className="license">
					This post is licensed under{' '}
					<a href={site.license.url} target="_blank" rel="noopener noreferrer license">
						{site.license.name}
					</a>{' '}
					by the author.
				</p>
			</footer>

			<nav className="post-nav" aria-label="More posts">
				{older ? (
					<Link href={older.url} className="post-nav-link">
						<span className="meta">Older</span>
						<span>{older.title}</span>
					</Link>
				) : (
					<span />
				)}
				{newer ? (
					<Link href={newer.url} className="post-nav-link post-nav-next">
						<span className="meta">Newer</span>
						<span>{newer.title}</span>
					</Link>
				) : null}
			</nav>
		</article>
	);
}
