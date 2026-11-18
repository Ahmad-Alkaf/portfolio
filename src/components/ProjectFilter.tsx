'use client';

import { useEffect, useState } from 'react';
import { ProjectCard } from './ProjectCard';
import type { ProjectSummary } from './ProjectBits';

export type FilterOption = { slug: string; label: string; count: number };

/**
 * All projects with a filter by stack. The selected stack is kept in the URL
 * (?stack=react), so a filtered list can be shared. Without JavaScript, all
 * projects show.
 */
export function ProjectFilter({ options, projects }: { options: FilterOption[]; projects: ProjectSummary[] }) {
	const [active, setActive] = useState<string>('');

	useEffect(() => {
		const stack = new URLSearchParams(window.location.search).get('stack') ?? '';
		// Read once after hydration, so the server HTML and the first client render are the same.
		// eslint-disable-next-line react-hooks/set-state-in-effect
		if (options.some((option) => option.slug === stack)) setActive(stack);
	}, [options]);

	function select(slug: string) {
		setActive(slug);
		const url = new URL(window.location.href);
		if (slug) url.searchParams.set('stack', slug);
		else url.searchParams.delete('stack');
		window.history.replaceState(null, '', url);
	}

	const shown = projects.filter((project) => !active || project.tagItems.some((tag) => tag.slug === active));
	const activeLabel = options.find((option) => option.slug === active)?.label;

	return (
		<>
			<div className="filter" role="group" aria-label="Filter projects by stack">
				<button type="button" className="filter-button" aria-pressed={active === ''} onClick={() => select('')}>
					All <span className="count">{projects.length}</span>
				</button>
				{options.map((option) => (
					<button
						key={option.slug}
						type="button"
						className="filter-button"
						aria-pressed={active === option.slug}
						onClick={() => select(option.slug)}
					>
						{option.label} <span className="count">{option.count}</span>
					</button>
				))}
			</div>
			<p className="filter-status" role="status">
				{activeLabel ? `${shown.length} of ${projects.length} projects use ${activeLabel}.` : `${projects.length} projects.`}
			</p>
			<ul className="cards">
				{projects.map((project) => (
					<li key={project.slug} hidden={!shown.includes(project)}>
						<ProjectCard post={project} headingLevel={2} />
					</li>
				))}
			</ul>
		</>
	);
}
