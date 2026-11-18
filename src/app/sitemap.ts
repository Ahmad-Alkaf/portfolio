import type { MetadataRoute } from 'next';
import { getPosts, getTags } from '@/lib/content';
import { site } from '@/site.config';

export const dynamic = 'force-static';

// No lastmod: the posts have only a publish date, and a wrong lastmod is worse than none.
export default function sitemap(): MetadataRoute.Sitemap {
	const url = (path: string) => `${site.url}${path}`;
	return [
		{ url: url('/') },
		{ url: url('/projects/') },
		...getPosts().map((post) => ({ url: url(post.url) })),
		{ url: url('/resume/') },
		{ url: url('/tags/') },
		...getTags().map((tag) => ({ url: url(tag.url) }))
	];
}
