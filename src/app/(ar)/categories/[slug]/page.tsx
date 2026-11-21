import { CategoryPage, categoryMetadata, categoryStaticParams, type CategoryParams } from '@/views/RedirectPages';

export const dynamicParams = false;
export const generateStaticParams = categoryStaticParams;

export function generateMetadata(props: CategoryParams) {
	return categoryMetadata('ar', props);
}

export default function Page({ params }: CategoryParams) {
	return <CategoryPage lang="ar" params={params} />;
}
