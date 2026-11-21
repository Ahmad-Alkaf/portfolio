import type { MetadataRoute } from 'next';
import { DEFAULT_LANG, LANGS, localePath } from '@/i18n';
import { getPosts, getTags } from '@/lib/content';
import { languageAlternates } from '@/lib/seo';
import { site } from '@/site.config';

export const dynamic = 'force-static';

// Each page is in the sitemap one time for each language, with links to all its languages.
// No lastmod: the posts have only a publish date, and a wrong lastmod is worse than none.
export default function sitemap(): MetadataRoute.Sitemap {
	const paths = [
		'/',
		'/projects/',
		...getPosts(DEFAULT_LANG).map((post) => `/posts/${post.slug}/`),
		'/resume/',
		'/tags/',
		...getTags(DEFAULT_LANG).map((tag) => `/tags/${tag.slug}/`)
	];
	return paths.flatMap((path) => {
		const languages = Object.fromEntries(Object.entries(languageAlternates(path)).map(([lang, url]) => [lang, `${site.url}${url}`]));
		return LANGS.map((lang) => ({ url: `${site.url}${localePath(lang, path)}`, alternates: { languages } }));
	});
}
