import { getPost, getPosts } from '@/lib/content';
import { ogImage, ogSize } from '@/lib/og';

export const dynamic = 'force-static';
export const dynamicParams = false;
export const size = ogSize;
export const contentType = 'image/png';
export const alt = 'Project card with the title, a one-line summary, and the main stack';

export function generateStaticParams() {
	return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
	const post = getPost((await params).slug);
	if (!post) throw new Error('Unknown post');
	return ogImage({
		eyebrow: [post.kind ?? 'Project', post.date.slice(0, 4)].join(' · '),
		title: post.title,
		text: post.summary,
		chips: post.tagItems.map((tag) => tag.label)
	});
}
