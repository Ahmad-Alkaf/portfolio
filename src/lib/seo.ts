import type { Metadata } from 'next';
import type { Post } from './content';
import { isoDate } from './format';
import { site } from '@/site.config';

type PageSeo = {
	/** Empty for the home page. */
	title?: string;
	description?: string;
	/** The page URL path, with a trailing slash (for example /posts/ACTS/). */
	path: string;
	article?: { publishedTime: string; tags: string[] };
	/** The share image. Default: the site image (/opengraph-image). */
	image?: { url: string; alt: string };
	noindex?: boolean;
};

const SITE_IMAGE = { url: '/opengraph-image', alt: `${site.title}, ${site.role}` };

/**
 * Title, description, canonical URL, Open Graph, and Twitter card for one page.
 * The image is set on each page, because a page-level `openGraph` object replaces
 * the image of the root opengraph-image file.
 */
export function pageMetadata({ title, description = site.description, path, article, image = SITE_IMAGE, noindex }: PageSeo): Metadata {
	const ogTitle = title ?? `${site.title} · ${site.role}`;
	const images = [{ url: image.url, width: 1200, height: 630, alt: image.alt, type: 'image/png' }];
	return {
		...(title ? { title } : {}),
		description,
		alternates: {
			canonical: path,
			types: { 'application/atom+xml': [{ url: '/feed.xml', title: site.title }] }
		},
		openGraph: {
			title: ogTitle,
			description,
			url: path,
			siteName: site.title,
			locale: 'en_US',
			images,
			...(article
				? { type: 'article', publishedTime: article.publishedTime, authors: [site.author.url], tags: article.tags }
				: { type: 'website' })
		},
		twitter: {
			card: 'summary_large_image',
			site: site.twitter,
			creator: site.twitter,
			title: ogTitle,
			description,
			images
		},
		...(noindex ? { robots: { index: false, follow: true } } : {})
	};
}

const personId = `${site.url}/#person`;

export function personJsonLd(): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Person',
				'@id': personId,
				name: site.author.name,
				url: `${site.url}/`,
				image: `${site.url}${site.avatar}`,
				jobTitle: site.role,
				address: { '@type': 'PostalAddress', addressLocality: 'Jeddah', addressCountry: 'SA' },
				alumniOf: { '@type': 'CollegeOrUniversity', name: 'Al-Ahgaff University' },
				knowsAbout: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Docker'],
				sameAs: site.social.map((link) => link.url)
			},
			{
				'@type': 'WebSite',
				'@id': `${site.url}/#website`,
				url: `${site.url}/`,
				name: site.title,
				inLanguage: site.lang,
				author: { '@id': personId }
			}
		]
	};
}

export function projectJsonLd(post: Post): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: post.title,
		description: post.description,
		url: `${site.url}${post.url}`,
		datePublished: isoDate(post.date),
		image: `${site.url}${post.url}opengraph-image`,
		keywords: post.tagItems.map((tag) => tag.label).join(', '),
		author: { '@type': 'Person', '@id': personId, name: site.author.name, url: `${site.url}/` },
		about: [
			{
				'@type': 'SoftwareApplication',
				name: post.title,
				description: post.summary,
				...(post.links.live ? { url: post.links.live } : {})
			},
			...(post.links.source
				? [{ '@type': 'SoftwareSourceCode', name: post.title, codeRepository: post.links.source, author: { '@id': personId } }]
				: [])
		]
	};
}
