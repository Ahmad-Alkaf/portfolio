// Site settings: identity, contact links, navigation, skills, and tag labels.

export const site = {
	title: 'Ahmed Alkaf',
	role: 'Full-stack software engineer',
	location: 'Jeddah, Saudi Arabia',
	description:
		'Ahmed Alkaf is a full-stack software engineer with 4 years of experience. He builds web products with TypeScript, React, Next.js, Node.js, and PostgreSQL. Projects, case studies, and resume.',
	url: 'https://ahmed.kaflabs.com',
	lang: 'en',
	timezone: 'Asia/Riyadh',
	avatar: '/assets/img/avatar.jpg',
	author: {
		name: 'Ahmed Alkaf',
		url: 'https://ahmed.kaflabs.com/',
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
	brand: { name: 'KafLabs', url: 'https://kaflabs.com' },
	nav: [
		{ href: '/projects/', label: 'Projects' },
		{ href: '/tags/', label: 'Skills' },
		{ href: '/resume/', label: 'Resume' }
	],
	// Facts for the "at a glance" panel (from the resume and the posts).
	glance: [
		{ label: 'Experience', value: '4 years, full-stack' },
		{ label: 'Core stack', value: 'TypeScript · React · Next.js · Node.js · PostgreSQL' },
		{ label: 'Public products', value: 'Etamyd · CornerTill · PDF Anvil · SetupForge · QR Anvil' },
		{ label: 'Other work', value: 'Internal systems in private repositories, not shown here' },
		{ label: 'Award', value: 'Gold Medal, RIPC 2023 (174 projects)' },
		{ label: 'Education', value: 'B.Sc. CIS, GPA 4.12 / 5' }
	]
} as const;

/** A skill in the grouped skills list. `tag` links it to /tags/<tag>/ when a project uses it. */
export type Skill = { label: string; tag?: string };

export const skillGroups: { name: string; skills: Skill[] }[] = [
	{
		name: 'Frontend',
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
		name: 'Backend & data',
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
		name: 'Testing & quality',
		skills: [
			{ label: 'Vitest', tag: 'vitest' },
			{ label: 'Playwright', tag: 'playwright' },
			{ label: 'Zod', tag: 'zod' },
			{ label: 'GitHub Actions', tag: 'github actions' }
		]
	},
	{
		name: 'DevOps & cloud',
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
		name: 'Product',
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
