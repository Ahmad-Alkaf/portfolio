'use client';

import { useEffect } from 'react';
import { MoonIcon, SunIcon } from './icons';

// A two-state color scheme toggle. The page follows the system scheme until
// the user selects the other scheme. Selecting the system scheme again
// removes the stored value. The override is the data-scheme attribute on
// <html>; the CSS maps it to the `color-scheme` property and the colors.
// <meta name="color-scheme" content="light dark"> stays unchanged.

const KEY = 'color-scheme';
const OLD_KEY = 'theme';
const THEME_COLOR = { light: '#f7f5f0', dark: '#141210' } as const;

type Scheme = keyof typeof THEME_COLOR;

/** Runs in <head> before the first paint, so the page does not flash. */
export const themeScript = `(function(){try{var t=localStorage.getItem('${KEY}')||localStorage.getItem('${OLD_KEY}');if(t==='light'||t==='dark')document.documentElement.dataset.scheme=t;}catch(e){}})();`;

function readStored(): Scheme | null {
	try {
		const value = localStorage.getItem(KEY) ?? localStorage.getItem(OLD_KEY);
		return value === 'light' || value === 'dark' ? value : null;
	} catch {
		return null;
	}
}

/** Sets the override (or removes it), and makes the browser bar color follow it. */
function applyScheme(scheme: Scheme | null) {
	const root = document.documentElement;
	if (scheme) root.dataset.scheme = scheme;
	else delete root.dataset.scheme;
	for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) {
		meta.dataset.original ??= meta.content;
		meta.content = scheme ? THEME_COLOR[scheme] : meta.dataset.original;
	}
}

function toggle() {
	const system: Scheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	const stored = document.documentElement.dataset.scheme;
	const current: Scheme = stored === 'light' || stored === 'dark' ? stored : system;
	const target: Scheme = current === 'dark' ? 'light' : 'dark';
	try {
		localStorage.removeItem(OLD_KEY);
		if (target === system) localStorage.removeItem(KEY);
		else localStorage.setItem(KEY, target);
	} catch {
		// Storage can be blocked. The scheme still changes on this page.
	}
	applyScheme(target === system ? null : target);
}

export function ThemeToggle({ labels }: { labels: { toDark: string; toLight: string } }) {
	useEffect(() => {
		// The head script set the attribute. Make the browser bar color match it.
		applyScheme(readStored());
		// Another tab can change the stored value.
		const onStorage = (event: StorageEvent) => {
			if (event.key === null || event.key === KEY || event.key === OLD_KEY) applyScheme(readStored());
		};
		window.addEventListener('storage', onStorage);
		return () => window.removeEventListener('storage', onStorage);
	}, []);

	return (
		<button type="button" className="icon-button theme-toggle" onClick={toggle}>
			<span className="to-dark">
				<MoonIcon />
				<span className="visually-hidden">{labels.toDark}</span>
			</span>
			<span className="to-light">
				<SunIcon />
				<span className="visually-hidden">{labels.toLight}</span>
			</span>
		</button>
	);
}
