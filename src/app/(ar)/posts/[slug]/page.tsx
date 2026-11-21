import { PostPage, postMetadata, postStaticParams, type PostParams } from '@/views/PostPage';

export const dynamicParams = false;
export const generateStaticParams = postStaticParams;

export function generateMetadata(props: PostParams) {
	return postMetadata('ar', props);
}

export default function Page({ params }: PostParams) {
	return <PostPage lang="ar" params={params} />;
}
