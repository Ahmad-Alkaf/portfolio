// The English text of the site. This file is also the shape of the dictionary:
// ar.ts must have each key that is here (the type check fails if one is missing).

export const en = {
	site: {
		name: 'Ahmed Alkaf',
		role: 'Full-stack software engineer',
		location: 'Jeddah, Saudi Arabia',
		description:
			'Ahmed Alkaf is a full-stack software engineer with 4 years of experience. He builds web products with TypeScript, React, Next.js, Node.js, and PostgreSQL. Projects, case studies, and resume.'
	},
	nav: {
		main: 'Main',
		projects: 'Projects',
		skills: 'Skills',
		resume: 'Resume',
		contact: 'Contact'
	},
	common: {
		skip: 'Skip to content',
		toDark: 'Switch to dark theme',
		toLight: 'Switch to light theme',
		newTab: ' (opens in a new tab)',
		email: 'Email',
		emailMe: 'Email me',
		resume: 'Resume',
		photoAlt: 'Photo of Ahmed Alkaf',
		home: 'Home',
		projects: 'Projects',
		allProjects: 'All projects'
	},
	home: {
		/** Three parts: the text before the highlighted stack, the stack, and the text after it. */
		lead: ['I build full-stack web products with ', 'TypeScript, React, Next.js, Node.js, and PostgreSQL', ', and I ship them to production.'],
		sub: '4 years of experience. This site shows the public part of my work, from a multi-tenant SaaS built in a team to a cloud point-of-sale system and web tools that I run myself. My other professional work is in private repositories and is not shown here.',
		glanceLabel: 'At a glance',
		// Facts for the "at a glance" panel (from the resume and the posts).
		glance: [
			{ label: 'Experience', value: '4 years, full-stack' },
			{ label: 'Core stack', value: 'TypeScript · React · Next.js · Node.js · PostgreSQL' },
			{ label: 'Public products', value: 'Etamyd · CornerTill · PDF Anvil · SetupForge · QR Anvil' },
			{ label: 'Other work', value: 'Internal systems in private repositories, not shown here' },
			{ label: 'Education', value: 'B.Sc. CIS, GPA 4.12 / 5' }
		],
		work: {
			eyebrow: 'Selected work',
			title: 'Products in production',
			text: 'Each one in short: the problem, what I built, and the result. The case study has the details.'
		},
		more: {
			eyebrow: 'More projects',
			title: 'Earlier work',
			all: (count: number) => `All ${count} projects, by stack`
		},
		skills: { eyebrow: 'Skills', title: 'What I work with' }
	},
	contact: {
		eyebrow: 'Contact',
		title: 'Hiring for a React, Next.js, or full-stack role?',
		text: 'Send me an email. My resume, GitHub, and LinkedIn are one click away.',
		copy: 'Copy email',
		copied: 'Email address copied',
		/** The address comes after this text. */
		copyFailed: 'Copy failed. The address is '
	},
	footer: {
		rights: 'All rights reserved.',
		/** The KafLabs link is between the two parts. */
		brand: ['Personal products published under ', '.']
	},
	projects: {
		title: 'Projects',
		description: 'All projects of Ahmed Alkaf: live products, team work, and academic projects. Filter them by stack.',
		eyebrow: 'Projects',
		heading: 'Everything I have built',
		text: 'The public live products first, then earlier and course work. Work in private repositories is not in this list. Select a stack to see only the projects that use it.',
		filterLabel: 'Filter projects by stack',
		all: 'All',
		count: (total: number) => `${total} projects.`,
		using: (shown: number, total: number, stack: string) => `${shown} of ${total} projects use ${stack}.`
	},
	project: {
		status: {
			live: 'Live',
			'live demo': 'Live demo',
			'public repo': 'Public repo',
			'open source': 'Open source',
			'not deployed': 'Not deployed'
		} as Record<string, string>,
		stack: 'Stack',
		live: 'Live site',
		liveOf: (name: string) => ` of ${name} (opens in a new tab)`,
		source: 'Source',
		sourceOf: (name: string) => ` of ${name} on GitHub (opens in a new tab)`,
		caseStudy: 'Case study',
		caseStudyOf: (name: string) => `: ${name}`,
		inShort: 'In short',
		problem: 'Problem',
		built: 'What I built',
		result: 'Result'
	},
	post: {
		minRead: (minutes: number) => `${minutes} min read`,
		more: 'More projects',
		newer: 'Newer',
		older: 'Older',
		video: 'YouTube video player'
	},
	lightbox: {
		enlarge: 'Enlarge image',
		viewer: 'Image viewer',
		close: 'Close image viewer',
		previous: 'Previous image',
		next: 'Next image'
	},
	tags: {
		title: 'Skills',
		description: 'The skills of Ahmed Alkaf, by area, and the projects that use each technology.',
		eyebrow: 'Skills',
		heading: 'What I work with',
		text: 'The main skills by area. Select a skill to see the projects that use it.',
		index: 'Every technology in the projects'
	},
	tag: {
		title: (tag: string) => `${tag} projects`,
		description: (tag: string, projects: string[]) => `Projects by Ahmed Alkaf that use ${tag}: ${projects.join(', ')}.`,
		back: 'All skills',
		eyebrow: 'Skill',
		uses: (count: number) => `${count} ${count === 1 ? 'project uses' : 'projects use'} this technology.`
	},
	skills: {
		groups: {
			frontend: 'Frontend',
			backend: 'Backend & data',
			testing: 'Testing & quality',
			devops: 'DevOps & cloud',
			product: 'Product'
		},
		/** Another name for a skill in this language. The key is the label in site.config.ts. */
		labels: {} as Record<string, string>
	},
	resume: {
		title: 'Resume',
		print: 'Print or save as PDF'
	},
	notFound: {
		title: 'Page not found',
		heading: 'This page does not exist',
		text: 'The link may be old, or the page moved. These pages can help:'
	},
	redirect: {
		eyebrow: 'This page moved',
		/** The link to the new page is between the two parts. */
		goTo: ['Go to ', '.']
	},
	person: {
		city: 'Jeddah',
		university: 'Al-Ahgaff University'
	}
};

export type Dictionary = typeof en;
