'use client';

import { useEffect } from 'react';
import { MoonIcon, SunIcon } from './icons';

// A two-state color scheme toggle. The page follows the system scheme until
// the user selects the other scheme. Selecting the system scheme again
// removes the stored value. The value lives in <meta name="color-scheme">,
// and the CSS maps that value to the `color-scheme` property.

const KEY = 'color-scheme';
const OLD_KEY = 'theme';

/** Runs in <head>, directly after the color-scheme meta, before the first paint. */
export const themeScript = `(function(){try{var m=document.querySelector('meta[name="color-scheme"]');var t=localStorage.getItem('${KEY}')||localStorage.getItem('${OLD_KEY}');if(m&&(t==='light'||t==='dark'))m.content=t;}catch(e){}})();`;

function meta(): HTMLMetaElement | null {
	return document.querySelector('meta[name="color-scheme"]');
}

function readStored(): string | null {
	try {
		return localStorage.getItem(KEY) ?? localStorage.getItem(OLD_KEY);
	} catch {
		return null;
	}
}

function toggle() {
	const element = meta();
	if (!element) return;
	const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	const current = element.content === 'light' || element.content === 'dark' ? element.content : system;
	const target = current === 'dark' ? 'light' : 'dark';
	try {
		localStorage.removeItem(OLD_KEY);
		if (target === system) localStorage.removeItem(KEY);
		else localStorage.setItem(KEY, target);
	} catch {
		// Storage can be blocked. The scheme still changes on this page.
	}
	element.content = target === system ? 'light dark' : target;
}

export function ThemeToggle() {
	useEffect(() => {
		// Another tab can change the stored value.
		const onStorage = (event: StorageEvent) => {
			if (event.key !== KEY && event.key !== OLD_KEY) return;
			const element = meta();
			const value = readStored();
			if (element) element.content = value === 'light' || value === 'dark' ? value : 'light dark';
		};
		window.addEventListener('storage', onStorage);
		return () => window.removeEventListener('storage', onStorage);
	}, []);

	return (
		<button type="button" className="icon-button theme-toggle" onClick={toggle}>
			<span className="to-dark">
				<MoonIcon />
				<span className="visually-hidden">Switch to dark theme</span>
			</span>
			<span className="to-light">
				<SunIcon />
				<span className="visually-hidden">Switch to light theme</span>
			</span>
		</button>
	);
}
