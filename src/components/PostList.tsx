import Link from 'next/link';
import type { Post } from '@/lib/content';
import { formatDate } from '@/lib/format';

/** A short list of posts: the title and the date. */
export function PostList({ posts }: { posts: Post[] }) {
	return (
		<ul className="post-list">
			{posts.map((post) => (
				<li key={post.slug}>
					<Link href={post.url}>{post.title}</Link>
					<time dateTime={post.date}>{formatDate(post.date)}</time>
				</li>
			))}
		</ul>
	);
}
