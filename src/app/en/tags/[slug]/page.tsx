import { TagPage, tagMetadata, tagStaticParams, type TagParams } from '@/views/TagPages';

export const dynamicParams = false;
export const generateStaticParams = tagStaticParams;

export function generateMetadata(props: TagParams) {
	return tagMetadata('en', props);
}

export default function Page({ params }: TagParams) {
	return <TagPage lang="en" params={params} />;
}
