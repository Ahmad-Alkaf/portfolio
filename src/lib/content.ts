// Reads the Markdown content at build time: the posts in _posts/ and the tab
// pages in _tabs/. The file names and the front matter are the same as in the
// old Jekyll site, so the URLs stay the same.

import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import { renderMarkdown, resolveImageSrc } from './markdown';
import { tagLabel } from '@/site.config';

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, '_posts');
const TABS_DIR = path.join(ROOT, '_tabs');

type FrontMatter = Record<string, unknown>;

export type Post = {
	slug: string;
	url: string;
	/** The full title, for the post page, the share image, and the feed. */
	title: string;
	/** The short name, for the cards and the lists. Front matter `name:`, else the title. */
	name: string;
	/** YYYY-MM-DD */
	date: string;
	categories: string[];
	tags: string[];
	image?: { src: string; alt: string };
	/** One line: what the project is. */
	summary: string;
	/** For example "Personal product" or "Academic capstone". */
	kind?: string;
	/** For example "live", "public repo", "open source", or "not deployed". */
	status?: string;
	/** Show the project in "Products in production" on the home page, in its `order`. */
	featured: boolean;
	/** The order on the projects page and the resume. Empty: after the ordered posts, newest first. */
	order?: number;
	/** Also show a card in "More projects" on the home page. */
	more: boolean;
	links: { live?: string; source?: string };
	screenshot?: { src: string; small?: string; alt: string; domain?: string };
	caseStudy?: { problem: string; built: string; result: string };
	tagItems: TagItem[];
	html: string;
	description: string;
	excerpt: string;
	readingMinutes: number;
};

export type TagItem = { name: string; label: string; slug: string; url: string };

export type Term = { name: string; slug: string; url: string; posts: Post[] };

export type Category = Term & { children: Term[] };

function readMarkdownFile(file: string): { data: FrontMatter; content: string } {
	const raw = fs.readFileSync(file, 'utf8');
	const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)([\s\S]*)$/);
	if (!match) return { data: {}, content: raw };
	const data = (parseYaml(match[1] ?? '') ?? {}) as FrontMatter;
	return { data, content: match[2] ?? '' };
}

function asString(value: unknown): string | undefined {
	if (typeof value === 'string') return value;
	if (typeof value === 'number') return String(value);
	return undefined;
}

function asStringList(value: unknown): string[] {
	if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
	const single = asString(value);
	return single ? [single] : [];
}

/** The same slug rule as Jekyll (default mode): letters and digits, joined by "-". */
export function slugify(name: string): string {
	return name
		.toLowerCase()
		.replace(/[^\p{M}\p{L}\p{Nd}]+/gu, '-')
		.replace(/^-+|-+$/g, '');
}

export function truncate(text: string, max: number): string {
	if (text.length <= max) return text;
	const cut = text.slice(0, max);
	const space = cut.lastIndexOf(' ');
	return `${(space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,;:.—-]+$/, '')}…`;
}

function postImage(data: FrontMatter, mediaSubpath?: string): Post['image'] {
	const image = data.image;
	if (!image) return undefined;
	if (typeof image === 'string') return { src: resolveImageSrc(image, mediaSubpath), alt: '' };
	if (typeof image === 'object') {
		const { path: imagePath, alt } = image as { path?: unknown; alt?: unknown };
		const src = asString(imagePath);
		if (src) return { src: resolveImageSrc(src, mediaSubpath), alt: asString(alt) ?? '' };
	}
	return undefined;
}

function asRecord(value: unknown): Record<string, unknown> {
	return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function postScreenshot(data: FrontMatter, mediaSubpath?: string): Post['screenshot'] {
	const shot = asRecord(data.screenshot);
	const src = asString(shot.path);
	if (!src) return undefined;
	const small = asString(shot.small);
	return {
		src: resolveImageSrc(src, mediaSubpath),
		small: small ? resolveImageSrc(small, mediaSubpath) : undefined,
		alt: asString(shot.alt) ?? '',
		domain: asString(shot.domain)
	};
}

function postCase(data: FrontMatter): Post['caseStudy'] {
	const c = asRecord(data.case);
	const problem = asString(c.problem);
	const built = asString(c.built);
	const result = asString(c.result);
	return problem && built && result ? { problem, built, result } : undefined;
}

// The tags that a reader looks for first. They go to the front of the chip lists.
const TAG_RANK = [
	'react',
	'next.js',
	'typescript',
	'tanstack start',
	'node.js',
	'nestjs',
	'angular',
	'laravel',
	'postgresql',
	'prisma',
	'mysql',
	'webassembly',
	'docker',
	'c#',
	'asp.net',
	'java',
	'android'
];

function rankTags(tags: string[]): string[] {
	const rank = (tag: string) => {
		const i = TAG_RANK.indexOf(tag.toLowerCase());
		return i === -1 ? TAG_RANK.length : i;
	};
	return tags.map((tag, i) => ({ tag, i })).sort((a, b) => rank(a.tag) - rank(b.tag) || a.i - b.i).map(({ tag }) => tag);
}

export function tagItem(name: string): TagItem {
	const slug = slugify(name);
	return { name, label: tagLabel(name), slug, url: `/tags/${slug}/` };
}

let postsCache: Post[] | undefined;

/** All posts, the newest first. */
export function getPosts(): Post[] {
	if (postsCache) return postsCache;
	const posts: Post[] = [];
	for (const file of fs.readdirSync(POSTS_DIR)) {
		const match = file.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.(md|markdown)$/);
		if (!match) continue;
		const [, fileDate = '', slug = ''] = match;
		const { data, content } = readMarkdownFile(path.join(POSTS_DIR, file));
		if (data.published === false) continue;
		if (data.featured !== undefined && typeof data.featured !== 'boolean') {
			throw new Error(`${file}: featured is true or false; the order on the home page comes from order`);
		}
		const mediaSubpath = asString(data.media_subpath);
		const rendered = renderMarkdown(content, { mediaSubpath });
		const date = (asString(data.date) ?? fileDate).slice(0, 10);
		const tags = asStringList(data.tags);
		const links = asRecord(data.links);
		const summary = asString(data.summary) ?? truncate(rendered.text, 160);
		posts.push({
			slug,
			url: `/posts/${slug}/`,
			title: asString(data.title) ?? slug,
			name: asString(data.name) ?? asString(data.title) ?? slug,
			date,
			categories: asStringList(data.categories),
			tags,
			image: postImage(data, mediaSubpath),
			summary,
			kind: asString(data.kind),
			status: asString(data.status),
			featured: data.featured === true,
			order: typeof data.order === 'number' ? data.order : undefined,
			more: data.more === true,
			links: { live: asString(links.live), source: asString(links.source) },
			screenshot: postScreenshot(data, mediaSubpath),
			caseStudy: postCase(data),
			tagItems: rankTags(tags).map(tagItem),
			html: rendered.html,
			description: asString(data.description) ?? summary,
			excerpt: truncate(rendered.text, 200),
			readingMinutes: Math.max(1, Math.floor(rendered.words / 180))
		});
	}
	posts.sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : b.date.localeCompare(a.date)));
	postsCache = posts;
	return posts;
}

export function getPost(slug: string): Post | undefined {
	return getPosts().find((post) => post.slug === slug);
}

function byName(a: { name: string }, b: { name: string }): number {
	return a.name.localeCompare(b.name, 'en', { sensitivity: 'base', numeric: true });
}

/** All tags (shown as "Skills"), sorted by name. */
export function getTags(): Term[] {
	const map = new Map<string, Term>();
	for (const post of getPosts()) {
		for (const name of post.tags) {
			const item = tagItem(name);
			const term = map.get(item.slug) ?? { name: item.label, slug: item.slug, url: item.url, posts: [] };
			term.posts.push(post);
			map.set(item.slug, term);
		}
	}
	return [...map.values()].sort(byName);
}

/** The categories tree: the first category of a post is the parent, the second is the child. */
export function getCategories(): Category[] {
	const parents = new Map<string, Category>();
	for (const post of getPosts()) {
		const [parentName, childName] = post.categories;
		if (!parentName) continue;
		const parentSlug = slugify(parentName);
		const parent = parents.get(parentSlug) ?? {
			name: parentName,
			slug: parentSlug,
			url: `/categories/${parentSlug}/`,
			posts: [],
			children: []
		};
		parent.posts.push(post);
		if (childName) {
			const childSlug = slugify(childName);
			let child = parent.children.find((item) => item.slug === childSlug);
			if (!child) {
				child = { name: childName, slug: childSlug, url: `/categories/${childSlug}/`, posts: [] };
				parent.children.push(child);
			}
			child.posts.push(post);
		}
		parents.set(parentSlug, parent);
	}
	const list = [...parents.values()].sort(byName);
	for (const parent of list) parent.children.sort(byName);
	return list;
}

/** Each category page (parents and children), by slug. */
export function getCategoryPages(): Term[] {
	const pages = new Map<string, Term>();
	for (const parent of getCategories()) {
		pages.set(parent.slug, parent);
		for (const child of parent.children) {
			const existing = pages.get(child.slug);
			if (existing) {
				for (const post of child.posts) if (!existing.posts.includes(post)) existing.posts.push(post);
			} else {
				pages.set(child.slug, child);
			}
		}
	}
	return [...pages.values()];
}

/** The featured projects, in their `order` (the same order as on the projects page). */
export function getFeaturedPosts(): Post[] {
	const featured = getProjects().filter((post) => post.featured);
	const unordered = featured.filter((post) => post.order === undefined);
	if (unordered.length > 0) {
		throw new Error(`A featured post needs an order: ${unordered.map((post) => post.slug).join(', ')}`);
	}
	return featured;
}

/** All posts in their `order` (live products first). Posts with no `order` come last, newest first. */
export function getProjects(): Post[] {
	const rank = (post: Post) => post.order ?? Number.MAX_SAFE_INTEGER;
	return [...getPosts()].sort((a, b) => rank(a) - rank(b));
}

/** The projects for the "More projects" cards on the home page, in their `order`. */
export function getMorePosts(): Post[] {
	return getProjects().filter((post) => post.more && !post.featured);
}

/** Where an old category URL goes now: the project of a one-project category, else the projects page. */
export function categoryTarget(category: Term): string {
	const [only] = category.posts;
	return category.posts.length === 1 && only && category.slug !== 'projects' ? only.url : '/projects/';
}

/** The Resume page source (_tabs/resume.md). */
export function getResume(): { title: string; content: string; mediaSubpath?: string } {
	const { data, content } = readMarkdownFile(path.join(TABS_DIR, 'resume.md'));
	return { title: asString(data.title) ?? 'Resume', content, mediaSubpath: asString(data.media_subpath) };
}
