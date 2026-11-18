import Link from 'next/link';
import { SkillGroups } from '@/components/SkillGroups';
import { getTags } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
	title: 'Skills',
	description: 'The skills of Ahmed Alkaf, by area, and the projects that use each technology.',
	path: '/tags/'
});

export default function TagsPage() {
	const tags = [...getTags()].sort((a, b) => b.posts.length - a.posts.length || a.name.localeCompare(b.name));
	return (
		<>
			<header className="page-head">
				<p className="eyebrow">Skills</p>
				<h1 className="page-title">What I work with</h1>
				<p className="section-text">The main skills by area. Select a skill to see the projects that use it.</p>
			</header>
			<SkillGroups headingLevel={2} />
			<section className="section" aria-labelledby="index-title">
				<header className="section-head">
					<h2 id="index-title" className="section-title section-title-small">
						Every technology in the projects
					</h2>
				</header>
				<ul className="chips chips-large">
					{tags.map((tag) => (
						<li key={tag.slug}>
							<Link className="chip" href={tag.url}>
								{tag.name} <span className="count">{tag.posts.length}</span>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</>
	);
}
