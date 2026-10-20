import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PostList } from '@/components/PostList';
import { getCategoryPages } from '@/lib/content';
import { plural } from '@/lib/format';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
	return getCategoryPages().map((category) => ({ slug: category.slug }));
}

function findCategory(slug: string) {
	return getCategoryPages().find((category) => category.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const category = findCategory((await params).slug);
	if (!category) return {};
	return pageMetadata({
		title: category.name,
		description: `Projects in the category ${category.name}.`,
		path: category.url
	});
}

export default async function CategoryPage({ params }: Props) {
	const category = findCategory((await params).slug);
	if (!category) notFound();
	return (
		<>
			<p className="meta">Category</p>
			<h1 className="page-title">
				{category.name} <span className="count">{plural(category.posts.length, 'post', 'posts')}</span>
			</h1>
			<PostList posts={category.posts} />
		</>
	);
}
