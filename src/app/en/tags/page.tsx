import { TagsPage, tagsMetadata } from '@/views/TagPages';

export const metadata = tagsMetadata('en');

export default function Page() {
	return <TagsPage lang="en" />;
}
