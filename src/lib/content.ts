// Reads the Markdown content at build time: the posts in _posts/ and the tab
// pages in _tabs/. The file names and the front matter are the same as in the
// old Jekyll site, so the URLs stay the same.

import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import { renderMarkdown, resolveImageSrc, type SkillLink } from './markdown';
import { site } from '@/site.config';

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, '_posts');
const TABS_DIR = path.join(ROOT, '_tabs');

type FrontMatter = Record<string, unknown>;

export type Post = {
	slug: string;
	url: string;
	title: string;
	/** YYYY-MM-DD */
	date: string;
	categories: string[];
	tags: string[];
	image?: { src: string; alt: string };
	html: string;
	description: string;
	excerpt: string;
	readingMinutes: number;
};

export type Tab = {
	name: string;
	url: string;
	title: string;
	order: number;
	/** Empty for a Markdown page. Else the Jekyll layout: categories, tags, or archives. */
	layout: string;
	content: string;
	mediaSubpath?: string;
};

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
		const mediaSubpath = asString(data.media_subpath);
		const rendered = renderMarkdown(content, { mediaSubpath });
		const date = (asString(data.date) ?? fileDate).slice(0, 10);
		posts.push({
			slug,
			url: `/posts/${slug}/`,
			title: asString(data.title) ?? slug,
			date,
			categories: asStringList(data.categories),
			tags: asStringList(data.tags),
			image: postImage(data, mediaSubpath),
			html: rendered.html,
			description: asString(data.description) ?? truncate(rendered.text, 200),
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
			const slug = slugify(name);
			const term = map.get(slug) ?? { name, slug, url: `/tags/${slug}/`, posts: [] };
			term.posts.push(post);
			map.set(slug, term);
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

export function getSkillLinks(): SkillLink[] {
	return getTags().map((tag) => ({ name: tag.name, href: tag.url, count: tag.posts.length }));
}

let tabsCache: Tab[] | undefined;

/** The tab pages in _tabs/, in their `order`. */
export function getTabs(): Tab[] {
	if (tabsCache) return tabsCache;
	const tabs: Tab[] = [];
	for (const file of fs.readdirSync(TABS_DIR)) {
		const match = file.match(/^(.+)\.(md|markdown)$/);
		if (!match) continue;
		const name = match[1] ?? '';
		const { data, content } = readMarkdownFile(path.join(TABS_DIR, file));
		const layout = asString(data.layout) ?? '';
		tabs.push({
			name,
			url: `/${name}/`,
			title: asString(data.title) ?? site.tabLabels[name] ?? name.charAt(0).toUpperCase() + name.slice(1),
			order: typeof data.order === 'number' ? data.order : 99,
			layout: layout === 'page' ? '' : layout,
			content,
			mediaSubpath: asString(data.media_subpath)
		});
	}
	tabs.sort((a, b) => a.order - b.order);
	tabsCache = tabs;
	return tabs;
}

/** The tabs that are Markdown pages (for example Resume). */
export function getPageTabs(): Tab[] {
	return getTabs().filter((tab) => tab.layout === '');
}

export function getTab(name: string): Tab | undefined {
	return getTabs().find((tab) => tab.name === name);
}

export function renderTab(tab: Tab) {
	return renderMarkdown(tab.content, { mediaSubpath: tab.mediaSubpath, skills: getSkillLinks() });
}
