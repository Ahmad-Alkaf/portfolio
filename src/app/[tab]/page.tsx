import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPageTabs, getTab, renderTab, truncate } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';

// The Markdown pages in _tabs/ (for example _tabs/resume.md -> /resume/).

type Props = { params: Promise<{ tab: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
	return getPageTabs().map((tab) => ({ tab: tab.name }));
}

function findTab(name: string) {
	const tab = getTab(name);
	return tab && tab.layout === '' ? tab : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const tab = findTab((await params).tab);
	if (!tab) return {};
	return pageMetadata({ title: tab.title, description: truncate(renderTab(tab).text, 200), path: tab.url });
}

export default async function TabPage({ params }: Props) {
	const tab = findTab((await params).tab);
	if (!tab) notFound();
	const { html } = renderTab(tab);
	return (
		<article>
			<h1 className="page-title">{tab.title}</h1>
			<div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
		</article>
	);
}
