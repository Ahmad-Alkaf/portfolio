import { feedResponse } from '@/lib/feed';

// The English Atom feed at /en/feed.xml.

export const dynamic = 'force-static';

export function GET() {
	return feedResponse('en');
}
