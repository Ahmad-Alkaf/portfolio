// Site settings that are the same in each language: the URL, contact links, skills, and tag labels.
// The text of the site (name, role, navigation, ...) is in src/i18n/en.ts and src/i18n/ar.ts.

export const site = {
	url: 'https://ahmed.kaflabs.com',
	timezone: 'Asia/Riyadh',
	avatar: '/assets/img/avatar.jpg',
	author: {
		// Split so that simple scrapers do not find it in the HTML.
		email: ['ahmad.h.alkaf', 'gmail.com'] as const
	},
	twitter: '@Ahmad_Alkaf_',
	social: [
		{ type: 'github', label: 'GitHub', handle: 'Ahmad-Alkaf', url: 'https://github.com/Ahmad-Alkaf' },
		{ type: 'linkedin', label: 'LinkedIn', handle: 'in/Ahmad-Alkaf', url: 'https://www.linkedin.com/in/Ahmad-Alkaf' },
		{ type: 'x', label: 'X', handle: '@Ahmad_Alkaf_', url: 'https://x.com/Ahmad_Alkaf_' }
	],
	// KafLabs is the brand of Ahmed's own web products.
	brand: { name: 'KafLabs', url: 'https://kaflabs.com' }
} as const;

/**
 * A skill in the grouped skills list. `tag` links it to /tags/<tag>/ when a project uses it.
 * The label is a technology name, so it is the same in each language. A skill that is a
 * concept can have an Arabic label in `skills.labels` of src/i18n/ar.ts.
 */
export type Skill = { label: string; tag?: string };

/** The group names are in the dictionaries (`skills.groups`). */
export type SkillGroupId = 'frontend' | 'backend' | 'testing' | 'devops' | 'product';

export const skillGroups: { id: SkillGroupId; skills: Skill[] }[] = [
	{
		id: 'frontend',
		skills: [
			{ label: 'TypeScript', tag: 'typescript' },
			{ label: 'JavaScript', tag: 'javascript' },
			{ label: 'React', tag: 'react' },
			{ label: 'Next.js', tag: 'next.js' },
			{ label: 'Tailwind CSS', tag: 'tailwind css' },
			{ label: 'Shadcn UI', tag: 'shadcn ui' },
			{ label: 'TanStack Start', tag: 'tanstack start' },
			{ label: 'TanStack Query', tag: 'tanstack query' },
			{ label: 'Angular', tag: 'angular' },
			{ label: 'HTML / CSS', tag: 'html' }
		]
	},
	{
		id: 'backend',
		skills: [
			{ label: 'Node.js', tag: 'node.js' },
			{ label: 'tRPC' },
			{ label: 'Prisma', tag: 'prisma' },
			{ label: 'PostgreSQL', tag: 'postgresql' },
			{ label: 'REST API design' },
			{ label: 'NestJS', tag: 'nestjs' },
			{ label: 'Express.js', tag: 'express.js' },
			{ label: 'Laravel', tag: 'laravel' },
			{ label: 'ASP.NET', tag: 'asp.net' },
			{ label: 'MySQL', tag: 'mysql' }
		]
	},
	{
		id: 'testing',
		skills: [
			{ label: 'Vitest', tag: 'vitest' },
			{ label: 'Playwright', tag: 'playwright' },
			{ label: 'Zod', tag: 'zod' },
			{ label: 'GitHub Actions', tag: 'github actions' }
		]
	},
	{
		id: 'devops',
		skills: [
			{ label: 'Docker', tag: 'docker' },
			{ label: 'Cloudflare Workers', tag: 'cloudflare workers' },
			{ label: 'Coolify' },
			{ label: 'Hetzner Cloud' },
			{ label: 'AWS', tag: 'aws' },
			{ label: 'Linux' }
		]
	},
	{
		id: 'product',
		skills: [
			{ label: 'Arabic RTL + English (i18n)', tag: 'i18n' },
			{ label: 'Multi-tenancy', tag: 'multi-tenancy' },
			{ label: 'Role-based access control', tag: 'rbac' }
		]
	}
];

/** Display names for the post tags (the tags are lowercase in the front matter). */
const TAG_LABELS: Record<string, string> = {
	'agile methodologies': 'Agile',
	'angular material': 'Angular Material',
	'asp.net': 'ASP.NET',
	'aws s3': 'AWS S3',
	aws: 'AWS',
	'better auth': 'Better Auth',
	'c#': 'C#',
	'cloudflare workers': 'Cloudflare Workers',
	css: 'CSS',
	'express.js': 'Express.js',
	'github actions': 'GitHub Actions',
	html: 'HTML',
	'human computer interaction': 'HCI',
	i18n: 'i18n',
	javascript: 'JavaScript',
	jquery: 'jQuery',
	mysql: 'MySQL',
	'multi-tenancy': 'Multi-tenancy',
	'problem solving': 'Problem solving',
	nestjs: 'NestJS',
	'next.js': 'Next.js',
	'node.js': 'Node.js',
	php: 'PHP',
	postgresql: 'PostgreSQL',
	powershell: 'PowerShell',
	rbac: 'RBAC',
	scss: 'SCSS',
	'shadcn ui': 'Shadcn UI',
	sql: 'SQL',
	'tailwind css': 'Tailwind CSS',
	'tanstack query': 'TanStack Query',
	'tanstack start': 'TanStack Start',
	typeorm: 'TypeORM',
	typescript: 'TypeScript',
	webassembly: 'WebAssembly',
	winforms: 'WinForms'
};

export function tagLabel(tag: string): string {
	const key = tag.toLowerCase();
	return TAG_LABELS[key] ?? key.replace(/(^|[\s-])(\p{L})/gu, (_m, sep: string, ch: string) => sep + ch.toUpperCase());
}

/** The stacks in the project filter, in this order. Each one is a post tag. */
export const filterTags = ['react', 'next.js', 'typescript', 'node.js', 'postgresql', 'prisma', 'docker', 'angular', 'laravel', 'c#', 'vitest'];
