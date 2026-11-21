import Link from 'next/link';
import { getTags, slugify } from '@/lib/content';
import { getDict, localePath, localText, type Lang } from '@/i18n';
import { skillGroups } from '@/site.config';

/** The grouped skills list. A skill that a project uses links to its skill page. */
export function SkillGroups({ lang, headingLevel = 3 }: { lang: Lang; headingLevel?: 2 | 3 }) {
	const t = getDict(lang);
	const used = new Set(getTags(lang).map((tag) => tag.slug));
	const Heading = headingLevel === 2 ? 'h2' : 'h3';
	return (
		<div className="skill-groups">
			{skillGroups.map((group) => (
				<section key={group.id} className="skill-group">
					<Heading className="skill-group-title">{t.skills.groups[group.id]}</Heading>
					<ul className="skill-list">
						{group.skills.map((skill) => {
							const slug = skill.tag ? slugify(skill.tag) : '';
							const label = t.skills.labels[skill.label] ?? localText(lang, skill.label);
							return (
								<li key={skill.label}>
									{slug && used.has(slug) ? <Link href={localePath(lang, `/tags/${slug}/`)}>{label}</Link> : <span>{label}</span>}
								</li>
							);
						})}
					</ul>
				</section>
			))}
		</div>
	);
}
