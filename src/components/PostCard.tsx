import Link from 'next/link';
import type { Post } from '@/lib/content';
import { formatDate } from '@/lib/format';

export function PostCard({ post }: { post: Post }) {
	return (
		<li className="card">
			<Link href={post.url} className="card-link">
				{post.image ? (
					<div className="card-image">
						<img src={post.image.src} alt={post.image.alt} loading="lazy" decoding="async" />
					</div>
				) : null}
				<div className="card-body">
					<h2 className="card-title">{post.title}</h2>
					<p className="card-excerpt">{post.excerpt}</p>
					<p className="meta">
						<time dateTime={post.date}>{formatDate(post.date)}</time>
						{post.categories.length > 0 ? <span> · {post.categories.join(', ')}</span> : null}
					</p>
				</div>
			</Link>
		</li>
	);
}
