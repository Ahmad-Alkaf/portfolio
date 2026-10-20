// Site settings. This file replaces the Jekyll _config.yml and _data/contact.yml.

export const site = {
	title: 'Ahmed Alkaf',
	tagline: 'Full-Stack Software Engineer',
	description: 'Portfolio and projects of Ahmed Alkaf — full-stack software engineer.',
	url: 'https://ahmed.kaflabs.com',
	lang: 'en',
	timezone: 'Asia/Riyadh',
	avatar: '/assets/img/avatar.jpg',
	author: {
		name: 'Ahmed Alkaf',
		// The first social link is the author link (as in the Jekyll site).
		url: 'https://x.com/Ahmad_Alkaf_',
		// Split so that simple scrapers do not find it in the HTML.
		email: ['ahmad.h.alkaf', 'gmail.com'] as const
	},
	twitter: '@Ahmad_Alkaf_',
	social: [
		{ type: 'github', label: 'GitHub', url: 'https://github.com/Ahmad-Alkaf' },
		{ type: 'x', label: 'X (Twitter)', url: 'https://x.com/Ahmad_Alkaf_' },
		{ type: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/Ahmad-Alkaf' }
	],
	// Labels for the tab pages in _tabs/. A tab without a label uses its file name.
	tabLabels: {
		tags: 'Skills'
	} as Record<string, string>,
	license: {
		name: 'CC BY 4.0',
		url: 'https://creativecommons.org/licenses/by/4.0/'
	}
} as const;

export type SocialType = (typeof site.social)[number]['type'] | 'email';
