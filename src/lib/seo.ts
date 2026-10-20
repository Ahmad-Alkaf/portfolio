import type { Metadata } from 'next';
import { site } from '@/site.config';

type PageSeo = {
	/** Empty for the home page. */
	title?: string;
	description?: string;
	/** The page URL path, with a trailing slash (for example /posts/ACTS/). */
	path: string;
	image?: { src: string; alt: string };
	article?: { publishedTime: string; tags: string[] };
};

/** Title, description, canonical URL, Open Graph, and Twitter card for one page. */
export function pageMetadata({ title, description = site.description, path, image, article }: PageSeo): Metadata {
	const ogTitle = title ?? site.title;
	const images = image ? [{ url: image.src, alt: image.alt }] : undefined;
	return {
		title: title ? title : { absolute: site.title },
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
			locale: site.lang,
			images,
			...(article
				? { type: 'article', publishedTime: article.publishedTime, authors: [site.author.url], tags: article.tags }
				: { type: 'website' })
		},
		twitter: {
			card: image ? 'summary_large_image' : 'summary',
			site: site.twitter,
			title: ogTitle,
			description,
			images: image ? [{ url: image.src, alt: image.alt }] : undefined
		}
	};
}
