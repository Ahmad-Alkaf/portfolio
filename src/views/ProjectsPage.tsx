import { ProjectCard } from '@/components/ProjectCard';
import { toProjectSummary } from '@/components/ProjectBits';
import { ProjectFilter } from '@/components/ProjectFilter';
import { getDict, type Lang } from '@/i18n';
import { getProjects, getTags, slugify } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { filterTags, tagLabel } from '@/site.config';

export function projectsMetadata(lang: Lang) {
	const t = getDict(lang);
	return pageMetadata({ lang, title: t.projects.title, description: t.projects.description, path: '/projects/' });
}

export function ProjectsPage({ lang }: { lang: Lang }) {
	const t = getDict(lang);
	const posts = getProjects(lang);
	const tags = new Map(getTags(lang).map((tag) => [tag.slug, tag]));
	const options = filterTags
		.map((name) => {
			const slug = slugify(name);
			const tag = tags.get(slug);
			if (!tag) return undefined;
			const label = tagLabel(name);
			return { slug, label, count: tag.posts.length, status: t.projects.using(tag.posts.length, posts.length, label) };
		})
		.filter((option) => option !== undefined);
	// The cards are drawn here, on the server. The filter (a client component) only shows and hides them.
	const items = posts.map((post) => ({
		slug: post.slug,
		tags: post.tagItems.map((tag) => tag.slug),
		card: <ProjectCard post={toProjectSummary(post)} headingLevel={2} />
	}));
	return (
		<>
			<header className="page-head">
				<p className="eyebrow">{t.projects.eyebrow}</p>
				<h1 className="page-title">{t.projects.heading}</h1>
				<p className="section-text">{t.projects.text}</p>
			</header>
			<ProjectFilter
				options={options}
				items={items}
				labels={{ group: t.projects.filterLabel, all: t.projects.all, status: t.projects.count(posts.length) }}
			/>
		</>
	);
}
