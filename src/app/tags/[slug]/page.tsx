import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostList } from '@/components/PostList';
import { getTags } from '@/lib/content';
import { plural } from '@/lib/format';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
	return getTags().map((tag) => ({ slug: tag.slug }));
}

function findTag(slug: string) {
	return getTags().find((tag) => tag.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const tag = findTag((await params).slug);
	if (!tag) return {};
	return pageMetadata({
		title: tag.name,
		description: `Projects by Ahmed Alkaf that use ${tag.name}.`,
		path: tag.url
	});
}

export default async function TagPage({ params }: Props) {
	const tag = findTag((await params).slug);
	if (!tag) notFound();
	return (
		<>
			<p className="meta">Skill</p>
			<h1 className="page-title">
				{tag.name} <span className="count">{plural(tag.posts.length, 'project', 'projects')}</span>
			</h1>
			<PostList posts={tag.posts} />
		</>
	);
}
