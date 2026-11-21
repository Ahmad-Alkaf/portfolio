import { feedResponse } from '@/lib/feed';

// The Arabic Atom feed at /feed.xml (the same URL as the Jekyll site). The English feed is /en/feed.xml.

export const dynamic = 'force-static';

export function GET() {
	return feedResponse('ar');
}
