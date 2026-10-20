import type { MetadataRoute } from 'next';
import { getCategoryPages, getPosts, getTabs, getTags } from '@/lib/content';
import { isoDate } from '@/lib/format';
import { site } from '@/site.config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
	const url = (path: string) => `${site.url}${path}`;
	const posts = getPosts();
	return [
		{ url: url('/'), lastModified: posts[0] ? isoDate(posts[0].date) : undefined },
		...posts.map((post) => ({ url: url(post.url), lastModified: isoDate(post.date) })),
		...getTabs().map((tab) => ({ url: url(tab.url) })),
		...getTags().map((tag) => ({ url: url(tag.url) })),
		...getCategoryPages().map((category) => ({ url: url(category.url) }))
	];
}
