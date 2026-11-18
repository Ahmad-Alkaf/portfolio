import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RedirectPage } from '@/components/RedirectPage';
import { categoryTarget, getCategoryPages } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// The old Chirpy category pages. Each one goes to its project, or to the projects page.

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
	return getCategoryPages().map((category) => ({ slug: category.slug }));
}

function find(slug: string) {
	const category = getCategoryPages().find((item) => item.slug === slug);
	if (!category) return undefined;
	const to = categoryTarget(category);
	const label = to === '/projects/' ? 'Projects' : (category.posts[0]?.title ?? category.name);
	return { to, label };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const target = find((await params).slug);
	if (!target) return {};
	return pageMetadata({ title: target.label, path: target.to });
}

export default async function CategoryPage({ params }: Props) {
	const target = find((await params).slug);
	if (!target) notFound();
	return <RedirectPage to={target.to} label={target.label} />;
}
