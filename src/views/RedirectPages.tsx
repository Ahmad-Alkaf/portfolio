import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RedirectPage } from '@/components/RedirectPage';
import { getDict, localePath, type Lang } from '@/i18n';
import { categoryTarget, getCategoryPages } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// The old Chirpy pages: "Timeline", "Categories", and one page for each category.
// The projects page replaces the first two. A category page goes to its project,
// or to the projects page.

/** /timeline/ and /categories/ */
export function projectsRedirectMetadata(lang: Lang) {
	return pageMetadata({ lang, title: getDict(lang).common.projects, path: '/projects/' });
}

export function ProjectsRedirectPage({ lang }: { lang: Lang }) {
	return <RedirectPage lang={lang} to={localePath(lang, '/projects/')} label={getDict(lang).common.projects} />;
}

export type CategoryParams = { params: Promise<{ slug: string }> };

/** The category slugs are the same in each language. */
export function categoryStaticParams() {
	return getCategoryPages('en').map((category) => ({ slug: category.slug }));
}

function find(slug: string, lang: Lang) {
	const category = getCategoryPages(lang).find((item) => item.slug === slug);
	if (!category) return undefined;
	const to = categoryTarget(category, lang);
	const projects = localePath(lang, '/projects/');
	const label = to === projects ? getDict(lang).common.projects : (category.posts[0]?.title ?? category.name);
	return { to, label };
}

export async function categoryMetadata(lang: Lang, { params }: CategoryParams): Promise<Metadata> {
	const target = find((await params).slug, lang);
	if (!target) return {};
	// The canonical URL is the new page. `to` has the language prefix, and pageMetadata adds it again.
	return pageMetadata({ lang, title: target.label, path: target.to.slice(localePath(lang, '').length) });
}

export async function CategoryPage({ lang, params }: CategoryParams & { lang: Lang }) {
	const target = find((await params).slug, lang);
	if (!target) notFound();
	return <RedirectPage lang={lang} to={target.to} label={target.label} />;
}
