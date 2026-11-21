import { PostPage, postMetadata, postStaticParams, type PostParams } from '@/views/PostPage';

export const dynamicParams = false;
export const generateStaticParams = postStaticParams;

export function generateMetadata(props: PostParams) {
	return postMetadata('en', props);
}

export default function Page({ params }: PostParams) {
	return <PostPage lang="en" params={params} />;
}
