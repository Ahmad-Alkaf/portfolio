import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon } from '@/components/icons';
import { ProjectCard } from '@/components/ProjectCard';
import { toProjectSummary } from '@/components/ProjectBits';
import { getTags } from '@/lib/content';
import { plural } from '@/lib/format';
import { pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
	return getTags().map((tag) => ({ slug: tag.slug }));
}

function findTag(slug: string) {
	return getTags().find((tag) => tag.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const tag = findTag((await params).slug);
	if (!tag) return {};
	return pageMetadata({
		title: `${tag.name} projects`,
		description: `Projects by Ahmed Alkaf that use ${tag.name}: ${tag.posts.map((post) => post.name).join(', ')}.`,
		path: tag.url
	});
}

export default async function TagPage({ params }: Props) {
	const tag = findTag((await params).slug);
	if (!tag) notFound();
	return (
		<>
			<header className="page-head">
				<Link href="/tags/" className="back-link">
					<ArrowLeftIcon /> All skills
				</Link>
				<p className="eyebrow">Skill</p>
				<h1 className="page-title">{tag.name}</h1>
				<p className="section-text">{plural(tag.posts.length, 'project uses', 'projects use')} this technology.</p>
			</header>
			<ul className="cards">
				{tag.posts.map((post) => (
					<li key={post.slug}>
						<ProjectCard post={toProjectSummary(post)} headingLevel={2} />
					</li>
				))}
			</ul>
		</>
	);
}
