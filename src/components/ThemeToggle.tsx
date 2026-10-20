'use client';

import { useSyncExternalStore } from 'react';
import { MonitorIcon, MoonIcon, SunIcon } from './icons';

type Theme = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'theme';
const EVENT = 'themechange';
const NEXT: Record<Theme, Theme> = { system: 'light', light: 'dark', dark: 'system' };
const LABEL: Record<Theme, string> = { system: 'System', light: 'Light', dark: 'Dark' };

/** Runs in <head> before the first paint, so the page does not flash. */
export const themeScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t;}catch(e){}})();`;

function readTheme(): Theme {
	try {
		const value = localStorage.getItem(STORAGE_KEY);
		return value === 'light' || value === 'dark' ? value : 'system';
	} catch {
		return 'system';
	}
}

function subscribe(onChange: () => void): () => void {
	window.addEventListener(EVENT, onChange);
	window.addEventListener('storage', onChange);
	return () => {
		window.removeEventListener(EVENT, onChange);
		window.removeEventListener('storage', onChange);
	};
}

function applyTheme(theme: Theme) {
	try {
		if (theme === 'system') localStorage.removeItem(STORAGE_KEY);
		else localStorage.setItem(STORAGE_KEY, theme);
	} catch {
		// Storage can be blocked. The theme still changes for this page.
	}
	if (theme === 'system') delete document.documentElement.dataset.theme;
	else document.documentElement.dataset.theme = theme;
	window.dispatchEvent(new Event(EVENT));
}

export function ThemeToggle() {
	const theme = useSyncExternalStore(subscribe, readTheme, () => 'system' as Theme);
	const next = NEXT[theme];
	const Icon = theme === 'light' ? SunIcon : theme === 'dark' ? MoonIcon : MonitorIcon;
	return (
		<button
			type="button"
			className="icon-button"
			onClick={() => applyTheme(next)}
			title={`Theme: ${LABEL[theme]}. Click for ${LABEL[next]}.`}
			aria-label={`Theme: ${LABEL[theme]}. Switch to ${LABEL[next]}.`}
		>
			<Icon />
		</button>
	);
}
