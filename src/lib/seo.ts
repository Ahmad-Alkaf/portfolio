import type { Metadata } from 'next';
import { getPost, type Post } from './content';
import { isoDate } from './format';
import { DEFAULT_LANG, LANGS, LANG_INFO, getDict, localePath, otherLang, plainText, type Lang } from '@/i18n';
import { site } from '@/site.config';

type PageSeo = {
	lang: Lang;
	/** Empty for the home page. */
	title?: string;
	description?: string;
	/** The page URL path with no language prefix, with a trailing slash (for example /posts/ACTS/). */
	path: string;
	article?: { publishedTime: string; tags: string[] };
	/** The share image. Default: the site image (/opengraph-image). */
	image?: { url: string; alt: string };
	noindex?: boolean;
};

// The share images are drawn in English only (see src/lib/og.tsx), so the alt text is English too.
export const SITE_IMAGE = { url: '/opengraph-image', alt: `${getDict('en').site.name}, ${getDict('en').site.role}` };

/** The share image of a post, with its English alt text. The two languages use the same image. */
export function postImage(slug: string): { url: string; alt: string } {
	const english = getPost(slug, 'en');
	return { url: `/posts/${slug}/opengraph-image`, alt: english ? `${english.title}: ${english.summary}` : '' };
}

/** The same page in each language, for the hreflang links. Arabic is the default (x-default). */
export function languageAlternates(path: string): Record<string, string> {
	return {
		...Object.fromEntries(LANGS.map((lang) => [lang, localePath(lang, path)])),
		'x-default': localePath(DEFAULT_LANG, path)
	};
}

/**
 * Title, description, canonical URL, hreflang links, Open Graph, and Twitter card for
 * one page in one language. The image is set on each page, because a page-level
 * `openGraph` object replaces the image of the root opengraph-image file.
 */
export function pageMetadata({ lang, title, description, path, article, image = SITE_IMAGE, noindex }: PageSeo): Metadata {
	const t = getDict(lang);
	const name = plainText(t.site.name);
	const pageTitle = title ? plainText(title) : undefined;
	const pageDescription = plainText(description ?? t.site.description);
	const ogTitle = pageTitle ?? plainText(`${t.site.name} · ${t.site.role}`);
	const url = localePath(lang, path);
	const images = [{ url: image.url, width: 1200, height: 630, alt: image.alt, type: 'image/png' }];
	return {
		...(pageTitle ? { title: pageTitle } : {}),
		description: pageDescription,
		alternates: {
			canonical: url,
			languages: languageAlternates(path),
			types: { 'application/atom+xml': [{ url: localePath(lang, '/feed.xml'), title: name }] }
		},
		openGraph: {
			title: ogTitle,
			description: pageDescription,
			url,
			siteName: name,
			locale: LANG_INFO[lang].ogLocale,
			alternateLocale: [LANG_INFO[otherLang(lang)].ogLocale],
			images,
			...(article
				? { type: 'article', publishedTime: article.publishedTime, authors: [`${site.url}${localePath(lang, '/')}`], tags: article.tags }
				: { type: 'website' })
		},
		twitter: {
			card: 'summary_large_image',
			site: site.twitter,
			creator: site.twitter,
			title: ogTitle,
			description: pageDescription,
			images
		},
		...(noindex ? { robots: { index: false, follow: true } } : {})
	};
}

const personId = `${site.url}/#person`;

export function personJsonLd(lang: Lang): Record<string, unknown> {
	const t = getDict(lang);
	const home = `${site.url}${localePath(lang, '/')}`;
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Person',
				'@id': personId,
				name: t.site.name,
				alternateName: getDict(otherLang(lang)).site.name,
				url: home,
				image: `${site.url}${site.avatar}`,
				jobTitle: t.site.role,
				address: { '@type': 'PostalAddress', addressLocality: t.person.city, addressCountry: 'SA' },
				alumniOf: { '@type': 'CollegeOrUniversity', name: t.person.university },
				knowsAbout: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Docker'],
				sameAs: site.social.map((link) => link.url)
			},
			{
				'@type': 'WebSite',
				'@id': `${home}#website`,
				url: home,
				name: t.site.name,
				inLanguage: lang,
				author: { '@id': personId }
			}
		]
	};
}

export function projectJsonLd(post: Post): Record<string, unknown> {
	const t = getDict(post.lang);
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: post.title,
		description: post.description,
		url: `${site.url}${post.url}`,
		inLanguage: post.lang,
		datePublished: isoDate(post.date),
		image: `${site.url}${postImage(post.slug).url}`,
		keywords: post.tagItems.map((tag) => tag.label).join(', '),
		author: { '@type': 'Person', '@id': personId, name: t.site.name, url: `${site.url}${localePath(post.lang, '/')}` },
		about: [
			{
				'@type': 'SoftwareApplication',
				name: post.name,
				description: post.summary,
				...(post.links.live ? { url: post.links.live } : {})
			},
			...(post.links.source
				? [{ '@type': 'SoftwareSourceCode', name: post.name, codeRepository: post.links.source, author: { '@id': personId } }]
				: [])
		]
	};
}
