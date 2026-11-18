import Link from 'next/link';
import { getTags, slugify } from '@/lib/content';
import { skillGroups } from '@/site.config';

/** The grouped skills list. A skill that a project uses links to its skill page. */
export function SkillGroups({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
	const used = new Set(getTags().map((tag) => tag.slug));
	const Heading = headingLevel === 2 ? 'h2' : 'h3';
	return (
		<div className="skill-groups">
			{skillGroups.map((group) => (
				<section key={group.name} className="skill-group">
					<Heading className="skill-group-title">{group.name}</Heading>
					<ul className="skill-list">
						{group.skills.map((skill) => {
							const slug = skill.tag ? slugify(skill.tag) : '';
							return (
								<li key={skill.label}>
									{slug && used.has(slug) ? <Link href={`/tags/${slug}/`}>{skill.label}</Link> : <span>{skill.label}</span>}
								</li>
							);
						})}
					</ul>
				</section>
			))}
		</div>
	);
}
