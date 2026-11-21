// Reads the Markdown content at build time: the posts in _posts/ and the tab
// pages in _tabs/. The file names and the front matter are the same as in the
// old Jekyll site, so the URLs stay the same.
//
// Each content file has two language files:
//   <name>.md      the English text, and the facts of the project (date, tags, links, images, order)
//   <name>.ar.md   the Arabic text: the translated front matter fields and the body
// The facts are only in the English file, so the two languages cannot disagree.

import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';
import { renderMarkdown, resolveImageSrc } from './markdown';
import { isolateLatin, localePath, type Lang } from '@/i18n';
import { tagLabel } from '@/site.config';

const ROOT = process.cwd();
const POSTS_DIR = path.join(ROOT, '_posts');
const TABS_DIR = path.join(ROOT, '_tabs');

type FrontMatter = Record<string, unknown>;

export type Post = {
	lang: Lang;
	slug: string;
	/** The page URL in the language of the post: /posts/<slug>/ or /en/posts/<slug>/. */
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
	/** For example "live" (a product), "live demo" (a course project that is online), "open source", or "not deployed". */
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

export function tagItem(name: string, lang: Lang): TagItem {
	const slug = slugify(name);
	return { name, label: tagLabel(name), slug, url: localePath(lang, `/tags/${slug}/`) };
}

/** The file of the Arabic text: a/b.md -> a/b.ar.md. */
function arabicFile(file: string): string {
	return file.replace(/\.(md|markdown)$/, '.ar.$1');
}

/**
 * The front matter and the body of a post in Arabic. The text fields come from the
 * Arabic file (<name>.ar.md). All other fields come from the English file. The build
 * stops if the Arabic file or one of its text fields is missing, so no page is half translated.
 */
function readArabicPost(file: string, base: FrontMatter): { data: FrontMatter; content: string } {
	const arFile = arabicFile(file);
	const name = path.basename(arFile);
	if (!fs.existsSync(arFile)) throw new Error(`${path.basename(file)}: the Arabic file ${name} is missing`);
	const { data: ar, content } = readMarkdownFile(arFile);
	if (!content.trim()) throw new Error(`${name}: the post body is missing`);
	const text = (value: unknown, field: string, needed: boolean): string | undefined => {
		const result = asString(value);
		if (!result && needed) throw new Error(`${name}: ${field} is missing`);
		return result ? isolateLatin(result) : undefined;
	};
	const baseImage = asRecord(base.image);
	const baseShot = asRecord(base.screenshot);
	const baseCase = asRecord(base.case);
	const arCase = asRecord(ar.case);
	const hasCase = Object.keys(baseCase).length > 0;
	return {
		content,
		data: {
			...base,
			title: text(ar.title, 'title', false) ?? base.title,
			name: text(ar.name, 'name', false) ?? base.name,
			summary: text(ar.summary, 'summary', true),
			description: asString(ar.description),
			kind: text(ar.kind, 'kind', base.kind !== undefined),
			image:
				typeof base.image === 'object' && base.image
					? { ...baseImage, alt: text(asRecord(ar.image).alt, 'image.alt', Boolean(baseImage.alt)) }
					: base.image,
			screenshot: base.screenshot
				? { ...baseShot, alt: text(asRecord(ar.screenshot).alt, 'screenshot.alt', Boolean(baseShot.alt)) }
				: undefined,
			case: hasCase
				? {
						problem: text(arCase.problem, 'case.problem', true),
						built: text(arCase.built, 'case.built', true),
						result: text(arCase.result, 'case.result', true)
					}
				: undefined
		}
	};
}

const postsCache = new Map<Lang, Post[]>();

/** All posts in one language, the newest first. */
export function getPosts(lang: Lang): Post[] {
	const cached = postsCache.get(lang);
	if (cached) return cached;
	const posts: Post[] = [];
	for (const file of fs.readdirSync(POSTS_DIR)) {
		const match = file.match(/^(\d{4}-\d{2}-\d{2})-(.+)\.(md|markdown)$/);
		// <name>.ar.md is the Arabic text of <name>.md. It is not a post of its own.
		if (!match || /\.ar\.(md|markdown)$/.test(file)) continue;
		const [, fileDate = '', slug = ''] = match;
		const english = readMarkdownFile(path.join(POSTS_DIR, file));
		if (english.data.published === false) continue;
		if (english.data.featured !== undefined && typeof english.data.featured !== 'boolean') {
			throw new Error(`${file}: featured is true or false; the order on the home page comes from order`);
		}
		const { data, content } = lang === 'ar' ? readArabicPost(path.join(POSTS_DIR, file), english.data) : english;
		const mediaSubpath = asString(data.media_subpath);
		const rendered = renderMarkdown(content, { mediaSubpath, lang });
		const date = (asString(data.date) ?? fileDate).slice(0, 10);
		const tags = asStringList(data.tags);
		const links = asRecord(data.links);
		const summary = asString(data.summary) ?? truncate(rendered.text, 160);
		posts.push({
			lang,
			slug,
			url: localePath(lang, `/posts/${slug}/`),
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
			tagItems: rankTags(tags).map((tag) => tagItem(tag, lang)),
			html: rendered.html,
			description: asString(data.description) ?? summary,
			excerpt: truncate(rendered.text, 200),
			readingMinutes: Math.max(1, Math.floor(rendered.words / 180))
		});
	}
	posts.sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : b.date.localeCompare(a.date)));
	postsCache.set(lang, posts);
	return posts;
}

export function getPost(slug: string, lang: Lang): Post | undefined {
	return getPosts(lang).find((post) => post.slug === slug);
}

function byName(a: { name: string }, b: { name: string }): number {
	return a.name.localeCompare(b.name, 'en', { sensitivity: 'base', numeric: true });
}

/** All tags (shown as "Skills"), sorted by name. */
export function getTags(lang: Lang): Term[] {
	const map = new Map<string, Term>();
	for (const post of getPosts(lang)) {
		for (const name of post.tags) {
			const item = tagItem(name, lang);
			const term = map.get(item.slug) ?? { name: item.label, slug: item.slug, url: item.url, posts: [] };
			term.posts.push(post);
			map.set(item.slug, term);
		}
	}
	return [...map.values()].sort(byName);
}

/** The categories tree: the first category of a post is the parent, the second is the child. */
export function getCategories(lang: Lang): Category[] {
	const parents = new Map<string, Category>();
	for (const post of getPosts(lang)) {
		const [parentName, childName] = post.categories;
		if (!parentName) continue;
		const parentSlug = slugify(parentName);
		const parent = parents.get(parentSlug) ?? {
			name: parentName,
			slug: parentSlug,
			url: localePath(lang, `/categories/${parentSlug}/`),
			posts: [],
			children: []
		};
		parent.posts.push(post);
		if (childName) {
			const childSlug = slugify(childName);
			let child = parent.children.find((item) => item.slug === childSlug);
			if (!child) {
				child = { name: childName, slug: childSlug, url: localePath(lang, `/categories/${childSlug}/`), posts: [] };
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
export function getCategoryPages(lang: Lang): Term[] {
	const pages = new Map<string, Term>();
	for (const parent of getCategories(lang)) {
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
export function getFeaturedPosts(lang: Lang): Post[] {
	const featured = getProjects(lang).filter((post) => post.featured);
	const unordered = featured.filter((post) => post.order === undefined);
	if (unordered.length > 0) {
		throw new Error(`A featured post needs an order: ${unordered.map((post) => post.slug).join(', ')}`);
	}
	return featured;
}

/** All posts in their `order` (live products first). Posts with no `order` come last, newest first. */
export function getProjects(lang: Lang): Post[] {
	const rank = (post: Post) => post.order ?? Number.MAX_SAFE_INTEGER;
	return [...getPosts(lang)].sort((a, b) => rank(a) - rank(b));
}

/** The projects for the "More projects" cards on the home page, in their `order`. */
export function getMorePosts(lang: Lang): Post[] {
	return getProjects(lang).filter((post) => post.more && !post.featured);
}

/** Where an old category URL goes now: the project of a one-project category, else the projects page. */
export function categoryTarget(category: Term, lang: Lang): string {
	const [only] = category.posts;
	return category.posts.length === 1 && only && category.slug !== 'projects' ? only.url : localePath(lang, '/projects/');
}

/** The Resume page source: _tabs/resume.md (English) or _tabs/resume.ar.md (Arabic). */
export function getResume(lang: Lang): { content: string; mediaSubpath?: string } {
	const english = path.join(TABS_DIR, 'resume.md');
	const file = lang === 'ar' ? arabicFile(english) : english;
	if (!fs.existsSync(file)) throw new Error(`The resume file ${path.basename(file)} is missing`);
	const { content } = readMarkdownFile(file);
	// The image folder is a fact, so it comes from the English file.
	return { content, mediaSubpath: asString(readMarkdownFile(english).data.media_subpath) };
}
