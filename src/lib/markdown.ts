// Markdown to HTML, at build time.
//
// The posts were written for Jekyll (kramdown + the Chirpy theme). This file
// supports the few kramdown and Chirpy features that they use, so the
// Markdown files stay unchanged:
//
// - `{: .prompt-tip}` after a blockquote: a colored note box.
// - `![alt](path){: w="200"}`: image width.
// - `_caption_` on the line after an image: an image caption.
// - `media_subpath` in the front matter: the folder for relative image paths.
// - Image paths with spaces: `![alt](/ACTS Poster.webp)`.
// - `{% include embed/youtube.html id='...' %}`: a YouTube video.
// - `<i class="fas fa-map-marker-alt">`: a map pin icon.
// - External links open in a new tab (as jekyll-target-blank did).
//
// Local images get their intrinsic width and height, so a lazy image does not
// move the text when it loads.

import fs from 'node:fs';
import path from 'node:path';
import type { Element, ElementContent, Root as HastRoot, RootContent } from 'hast';
import { toString } from 'hast-util-to-string';
import type { Blockquote, Paragraph, Root as MdastRoot } from 'mdast';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkSmartypants from 'remark-smartypants';
import { unified } from 'unified';
import { SKIP, visit } from 'unist-util-visit';
import { site } from '@/site.config';

export type RenderOptions = {
	/** Folder for relative image paths (Chirpy `media_subpath`). */
	mediaSubpath?: string;
};

export type Rendered = {
	html: string;
	/** All the text of the document, on one line. */
	text: string;
	words: number;
};

const YOUTUBE_INCLUDE = /\{%\s*include\s+embed\/youtube\.html\s+id=['"]([\w-]+)['"]\s*%\}/g;
// An image whose path has a space: CommonMark needs the path in <...>.
const IMAGE_WITH_SPACE = /!\[([^\]]*)\]\(([^)<>"]*\s[^)<>"]*)\)/g;

function preprocess(source: string): string {
	return source
		.replace(
			YOUTUBE_INCLUDE,
			(_match, id: string) =>
				`\n\n<div class="video"><iframe src="https://www.youtube.com/embed/${id}" title="YouTube video player" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>\n\n`
		)
		.replace(IMAGE_WITH_SPACE, (_match, alt: string, dest: string) => `![${alt}](<${dest.trim()}>)`);
}

type Ial = { classes: string[]; attrs: Record<string, string> };

function parseIal(body: string): Ial {
	const classes: string[] = [];
	const attrs: Record<string, string> = {};
	for (const match of body.matchAll(/\.([\w-]+)|([\w-]+)=(?:"([^"]*)"|'([^']*)')/g)) {
		if (match[1]) classes.push(match[1]);
		else if (match[2]) attrs[match[2]] = match[3] ?? match[4] ?? '';
	}
	return { classes, attrs };
}

/** kramdown attribute lists: `{: .prompt-tip}` and `{: w="200"}`. */
function remarkKramdown() {
	return (tree: MdastRoot) => {
		// A block attribute list on the line after a blockquote is parsed as the
		// last line of the blockquote paragraph.
		visit(tree, 'blockquote', (node: Blockquote) => {
			const last = node.children.at(-1);
			if (last?.type !== 'paragraph') return;
			const text = last.children.at(-1);
			if (text?.type !== 'text') return;
			const match = text.value.match(/\s*\{:\s*([^}]*)\}\s*$/);
			if (!match) return;
			text.value = text.value.slice(0, match.index).trimEnd();
			if (text.value === '') last.children.pop();
			const { classes } = parseIal(match[1] ?? '');
			node.data = { ...node.data, hProperties: { className: classes } };
		});

		// A span attribute list directly after an image.
		visit(tree, 'paragraph', (node: Paragraph) => {
			node.children.forEach((child, i) => {
				const next = node.children[i + 1];
				if (child.type !== 'image' || next?.type !== 'text') return;
				const match = next.value.match(/^\{:\s*([^}]*)\}/);
				if (!match) return;
				next.value = next.value.slice(match[0].length);
				const { attrs } = parseIal(match[1] ?? '');
				const props: Record<string, string> = {};
				if (attrs.w) props.width = attrs.w;
				if (attrs.h) props.height = attrs.h;
				child.data = { ...child.data, hProperties: props };
			});
		});
	};
}

function safeDecode(value: string): string {
	try {
		return decodeURI(value);
	} catch {
		return value;
	}
}

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const sizeCache = new Map<string, { width: number; height: number } | undefined>();

/** The pixel size of a WebP or PNG file, from its header. Other formats: undefined. */
function readImageSize(file: string): { width: number; height: number } | undefined {
	let data: Buffer;
	try {
		data = fs.readFileSync(file);
	} catch {
		return undefined;
	}
	if (data.length >= 24 && data.toString('ascii', 1, 4) === 'PNG') {
		return { width: data.readUInt32BE(16), height: data.readUInt32BE(20) };
	}
	if (data.length >= 30 && data.toString('ascii', 0, 4) === 'RIFF' && data.toString('ascii', 8, 12) === 'WEBP') {
		const chunk = data.toString('ascii', 12, 16);
		if (chunk === 'VP8X') return { width: 1 + data.readUIntLE(24, 3), height: 1 + data.readUIntLE(27, 3) };
		if (chunk === 'VP8 ') return { width: data.readUInt16LE(26) & 0x3fff, height: data.readUInt16LE(28) & 0x3fff };
		if (chunk === 'VP8L') {
			const bits = data.readUInt32LE(21);
			return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
		}
	}
	return undefined;
}

/** The intrinsic size of an image in public/, for a site path such as /assets/img/a%20b.webp. */
function localImageSize(src: string): { width: number; height: number } | undefined {
	if (!src.startsWith('/') || src.startsWith('//')) return undefined;
	if (!sizeCache.has(src)) {
		const file = path.join(PUBLIC_DIR, safeDecode(src.split(/[?#]/)[0] ?? ''));
		sizeCache.set(src, file.startsWith(PUBLIC_DIR) ? readImageSize(file) : undefined);
	}
	return sizeCache.get(src);
}

export function resolveImageSrc(src: string, mediaSubpath?: string): string {
	if (/^([a-z]+:)?\/\//i.test(src) || src.startsWith('data:')) return src;
	const path = mediaSubpath ? `${mediaSubpath.replace(/\/+$/, '')}/${src.replace(/^\/+/, '')}` : src;
	return encodeURI(safeDecode(path));
}

function isExternal(href: string): boolean {
	return /^https?:\/\//i.test(href) && !href.startsWith(site.url);
}

function classList(node: Element): string[] {
	const value = node.properties.className;
	return Array.isArray(value) ? value.map(String) : [];
}

function isBlank(node: ElementContent): boolean {
	return node.type === 'text' && node.value.trim() === '';
}

const MAP_PIN: Element = {
	type: 'element',
	tagName: 'svg',
	properties: {
		className: ['icon'],
		viewBox: '0 0 24 24',
		width: '16',
		height: '16',
		fill: 'none',
		stroke: 'currentColor',
		strokeWidth: '2',
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		ariaHidden: 'true'
	},
	children: [
		{ type: 'element', tagName: 'path', properties: { d: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' }, children: [] },
		{ type: 'element', tagName: 'circle', properties: { cx: '12', cy: '10', r: '3' }, children: [] }
	]
};

/** The site-specific HTML changes (images, links, captions, icons, tables). */
function rehypeSite(options: RenderOptions) {
	return (tree: HastRoot) => {
		visit(tree, (node, index, parent) => {
			if (!parent || index === undefined) return;

			if (node.type !== 'element') return;

			if (node.tagName === 'img' && typeof node.properties.src === 'string') {
				node.properties.src = resolveImageSrc(node.properties.src, options.mediaSubpath);
				// The intrinsic size reserves the space. A `{: w="200"}` width keeps the aspect ratio.
				const size = node.properties.height === undefined ? localImageSize(node.properties.src) : undefined;
				if (size) {
					const width = Number(node.properties.width ?? size.width) || size.width;
					node.properties.width = String(width);
					node.properties.height = String(Math.round((width * size.height) / size.width));
				}
				node.properties.loading ??= 'lazy';
				node.properties.decoding = 'async';
				return;
			}

			if (node.tagName === 'a' && typeof node.properties.href === 'string') {
				const href = node.properties.href;
				if (isExternal(href)) {
					node.properties.target = '_blank';
					node.properties.rel = ['noopener', 'noreferrer'];
				} else if (/^\/[^?#]*[^/?#]$/.test(href) && !/\.[a-z0-9]+$/i.test(href)) {
					// An internal page link: add the trailing slash of the site URLs (/posts/ACTS -> /posts/ACTS/).
					node.properties.href = `${href}/`;
				}
				return;
			}

			if (node.tagName === 'i' && classList(node).includes('fa-map-marker-alt')) {
				parent.children[index] = structuredClone(MAP_PIN);
				return SKIP;
			}

			// An image, a line break, and an emphasis: an image with a caption.
			if (node.tagName === 'p') {
				const parts = node.children.filter((child) => !isBlank(child));
				const [img, caption] = parts;
				if (
					parts.length === 2 &&
					img?.type === 'element' &&
					img.tagName === 'img' &&
					caption?.type === 'element' &&
					caption.tagName === 'em'
				) {
					node.tagName = 'figure';
					node.children = [img, { type: 'element', tagName: 'figcaption', properties: {}, children: caption.children }];
				}
				return;
			}

			// Wide tables scroll inside their own box on small screens.
			if (node.tagName === 'table') {
				const wrapper: Element = {
					type: 'element',
					tagName: 'div',
					properties: { className: ['table-wrap'] },
					children: [node]
				};
				parent.children[index] = wrapper as RootContent & ElementContent;
				return [SKIP, index + 1];
			}
			return undefined;
		});
	};
}

export function renderMarkdown(source: string, options: RenderOptions = {}): Rendered {
	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(remarkKramdown)
		.use(remarkSmartypants)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeRaw)
		.use(rehypeSlug)
		.use(rehypeSite, options)
		.use(rehypeStringify);

	const hast = processor.runSync(processor.parse(preprocess(source)));
	const html = processor.stringify(hast);

	const text = toString(hast).replace(/\s+/g, ' ').trim();

	return { html, text, words: text ? text.split(' ').length : 0 };
}
