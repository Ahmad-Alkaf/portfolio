import { getPosts } from '@/lib/content';
import { isoDate } from '@/lib/format';
import { site } from '@/site.config';

// The Atom feed at /feed.xml (the same URL as the Jekyll site).

export const dynamic = 'force-static';

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export function GET() {
	const posts = getPosts();
	const updated = posts[0] ? isoDate(posts[0].date) : new Date().toISOString();
	const entries = posts
		.map((post) => {
			const link = `${site.url}${post.url}`;
			const categories = post.categories.map((name) => `<category term="${escapeXml(name)}" />`).join('');
			return `<entry><title>${escapeXml(post.title)}</title><link href="${link}" rel="alternate" type="text/html" title="${escapeXml(post.title)}" /><published>${isoDate(post.date)}</published><updated>${isoDate(post.date)}</updated><id>${link}</id><author><name>${escapeXml(site.author.name)}</name></author>${categories}<summary>${escapeXml(post.description)}</summary></entry>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
<id>${site.url}/</id>
<title>${escapeXml(site.title)}</title>
<subtitle>${escapeXml(site.description)}</subtitle>
<updated>${updated}</updated>
<author><name>${escapeXml(site.author.name)}</name><uri>${site.url}/</uri></author>
<link rel="self" type="application/atom+xml" href="${site.url}/feed.xml" />
<link rel="alternate" type="text/html" hreflang="${site.lang}" href="${site.url}/" />
<rights>© ${new Date().getFullYear()} ${escapeXml(site.author.name)}</rights>
<icon>/assets/img/favicons/favicon.ico</icon>
${entries}
</feed>
`;
	return new Response(xml, { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' } });
}
