'use client';

import { useEffect, useState, type ReactNode } from 'react';

/** `status`: the text under the filter when this stack is selected. */
export type FilterOption = { slug: string; label: string; count: number; status: string };

/** One project: its tag slugs, and its card (drawn on the server). */
export type FilterItem = { slug: string; tags: string[]; card: ReactNode };

/**
 * All projects with a filter by stack. The selected stack is kept in the URL
 * (?stack=react), so a filtered list can be shared. Without JavaScript, all
 * projects show. The text comes from the page (the dictionary stays on the server).
 */
export function ProjectFilter({
	options,
	items,
	labels
}: {
	options: FilterOption[];
	items: FilterItem[];
	/** `status` is the text under the filter when no stack is selected. */
	labels: { group: string; all: string; status: string };
}) {
	const [active, setActive] = useState<string>('');

	useEffect(() => {
		const stack = new URLSearchParams(window.location.search).get('stack') ?? '';
		// Read once after hydration, so the server HTML and the first client render are the same.
		// eslint-disable-next-line react-hooks/set-state-in-effect
		if (options.some((option) => option.slug === stack)) setActive(stack);
		// The attribute that the inline script set is only for the first paint.
		return () => {
			delete document.documentElement.dataset.stack;
		};
	}, [options]);

	function select(slug: string) {
		setActive(slug);
		if (slug) document.documentElement.dataset.stack = slug;
		else delete document.documentElement.dataset.stack;
		const url = new URL(window.location.href);
		if (slug) url.searchParams.set('stack', slug);
		else url.searchParams.delete('stack');
		window.history.replaceState(null, '', url);
	}

	const activeOption = options.find((option) => option.slug === active);

	// Before hydration, a ?stack= link already hides the other projects (no jump):
	// the script sets data-stack on <html>, and these rules hide the cards.
	const firstPaintCss = options
		.map((option) => `:root[data-stack='${option.slug}'] .filter-list > li:not([data-tags~='${option.slug}']){display:none}`)
		.join('');
	const firstPaintScript = `(function(){var s=new URLSearchParams(location.search).get('stack');if(s&&/^[a-z0-9-]+$/.test(s))document.documentElement.dataset.stack=s;})();`;

	return (
		<>
			<style dangerouslySetInnerHTML={{ __html: firstPaintCss }} />
			<script dangerouslySetInnerHTML={{ __html: firstPaintScript }} />
			<div className="filter" role="group" aria-label={labels.group}>
				<button type="button" className="filter-button" aria-pressed={active === ''} onClick={() => select('')}>
					{labels.all} <span className="count">{items.length}</span>
				</button>
				{options.map((option) => (
					<button
						key={option.slug}
						type="button"
						className="filter-button"
						aria-pressed={active === option.slug}
						onClick={() => select(option.slug)}
					>
						{/* A technology name: left-to-right in each language (C#, Next.js). */}
						<bdi dir="ltr">{option.label}</bdi> <span className="count">{option.count}</span>
					</button>
				))}
			</div>
			<p className="filter-status" role="status">
				{activeOption ? activeOption.status : labels.status}
			</p>
			<ul className="cards filter-list">
				{items.map((item) => (
					<li key={item.slug} hidden={active !== '' && !item.tags.includes(active)} data-tags={item.tags.join(' ')}>
						{item.card}
					</li>
				))}
			</ul>
		</>
	);
}
