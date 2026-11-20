import { ogImage, ogSize } from '@/lib/og';
import { site } from '@/site.config';

export const dynamic = 'force-static';
export const alt = `${site.title}, ${site.role}`;
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
	return ogImage({
		eyebrow: 'Portfolio',
		title: `${site.title}`,
		text: 'Full-stack web products with TypeScript, React, Next.js, Node.js, and PostgreSQL. Public products live in production.',
		chips: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL']
	});
}
