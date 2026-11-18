/** Structured data for search engines. `<` is escaped, so a value cannot close the script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
	const json = JSON.stringify(data).replace(/</g, '\\u003c');
	return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
