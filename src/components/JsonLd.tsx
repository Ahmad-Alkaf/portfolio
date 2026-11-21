import { plainText } from '@/i18n/bidi';

/** Structured data for search engines. `<` is escaped, so a value cannot close the script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
	// plainText: the Arabic text has isolate characters for the screen, and the data must not have them.
	const json = plainText(JSON.stringify(data)).replace(/</g, '\\u003c');
	return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
