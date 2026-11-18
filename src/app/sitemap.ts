import type { MetadataRoute } from 'next';
import { getPosts, getTags } from '@/lib/content';
import { isoDate } from '@/lib/format';
import { site } from '@/site.config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
	const url = (path: string) => `${site.url}${path}`;
	const posts = getPosts();
	const newest = posts[0] ? isoDate(posts[0].date) : undefined;
	return [
		{ url: url('/'), lastModified: newest },
		{ url: url('/projects/'), lastModified: newest },
		...posts.map((post) => ({ url: url(post.url), lastModified: isoDate(post.date) })),
		{ url: url('/resume/') },
		{ url: url('/tags/') },
		...getTags().map((tag) => ({ url: url(tag.url) }))
	];
}
