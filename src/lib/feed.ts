import { getPosts } from './content';
import { isoDate } from './format';
import { getDict, localePath, plainText, type Lang } from '@/i18n';
import { site } from '@/site.config';

// The Atom feeds. /feed.xml is the Arabic feed (Arabic is the default language, and
// this is the feed URL of the old Jekyll site). /en/feed.xml is the English feed.

function escapeXml(value: string): string {
	return plainText(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export function feedResponse(lang: Lang): Response {
	const t = getDict(lang);
	const posts = getPosts(lang);
	const home = `${site.url}${localePath(lang, '/')}`;
	const self = `${site.url}${localePath(lang, '/feed.xml')}`;
	const author = escapeXml(t.site.name);
	const updated = posts[0] ? isoDate(posts[0].date) : new Date().toISOString();
	const entries = posts
		.map((post) => {
			const link = `${site.url}${post.url}`;
			const categories = post.categories.map((name) => `<category term="${escapeXml(name)}" />`).join('');
			return `<entry><title>${escapeXml(post.title)}</title><link href="${link}" rel="alternate" type="text/html" title="${escapeXml(post.title)}" /><published>${isoDate(post.date)}</published><updated>${isoDate(post.date)}</updated><id>${link}</id><author><name>${author}</name></author>${categories}<summary>${escapeXml(post.description)}</summary></entry>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="${lang}">
<id>${home}</id>
<title>${author}</title>
<subtitle>${escapeXml(t.site.description)}</subtitle>
<updated>${updated}</updated>
<author><name>${author}</name><uri>${home}</uri></author>
<link rel="self" type="application/atom+xml" href="${self}" />
<link rel="alternate" type="text/html" hreflang="${lang}" href="${home}" />
<rights>© ${new Date().getFullYear()} ${author}</rights>
<icon>/assets/img/favicons/favicon.ico</icon>
${entries}
</feed>
`;
	return new Response(xml, { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' } });
}
