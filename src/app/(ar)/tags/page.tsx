import { TagsPage, tagsMetadata } from '@/views/TagPages';

export const metadata = tagsMetadata('ar');

export default function Page() {
	return <TagsPage lang="ar" />;
}
