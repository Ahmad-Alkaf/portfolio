import { getDict } from '@/i18n';
import { ogImage, ogSize } from '@/lib/og';

// The share image of the site. It is in English for both languages (see src/lib/og.tsx).

const t = getDict('en');

export const dynamic = 'force-static';
export const alt = `${t.site.name}, ${t.site.role}`;
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
	return ogImage({
		eyebrow: 'Portfolio',
		title: t.site.name,
		text: 'Full-stack web products with TypeScript, React, Next.js, Node.js, and PostgreSQL. Public products live in production.',
		chips: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL']
	});
}
