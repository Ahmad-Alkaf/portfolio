import { toProjectSummary } from '@/components/ProjectBits';
import { ProjectFilter } from '@/components/ProjectFilter';
import { getPosts, getTags, slugify } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { filterTags, tagLabel } from '@/site.config';

export const metadata = pageMetadata({
	title: 'Projects',
	description: 'All projects of Ahmed Alkaf: live products, team work, and academic projects. Filter them by stack.',
	path: '/projects/'
});

export default function ProjectsPage() {
	const posts = getPosts();
	const tags = new Map(getTags().map((tag) => [tag.slug, tag]));
	const options = filterTags
		.map((name) => {
			const slug = slugify(name);
			const tag = tags.get(slug);
			return tag ? { slug, label: tagLabel(name), count: tag.posts.length } : undefined;
		})
		.filter((option) => option !== undefined);
	return (
		<>
			<header className="page-head">
				<p className="eyebrow">Projects</p>
				<h1 className="page-title">Everything I have built</h1>
				<p className="section-text">Newest first. Select a stack to see only the projects that use it.</p>
			</header>
			<ProjectFilter options={options} projects={posts.map(toProjectSummary)} />
		</>
	);
}
