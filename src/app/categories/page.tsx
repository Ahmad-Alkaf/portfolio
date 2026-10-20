import Link from 'next/link';
import { getCategories } from '@/lib/content';
import { plural } from '@/lib/format';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({ title: 'Categories', path: '/categories/' });

export default function CategoriesPage() {
	const categories = getCategories();
	return (
		<>
			<h1 className="page-title">Categories</h1>
			<ul className="category-tree">
				{categories.map((category) => (
					<li key={category.slug} className="category">
						<p className="category-head">
							<Link href={category.url}>{category.name}</Link>
							<span className="meta">
								{category.children.length > 0 ? `${plural(category.children.length, 'category', 'categories')}, ` : ''}
								{plural(category.posts.length, 'post', 'posts')}
							</span>
						</p>
						{category.children.length > 0 ? (
							<ul className="category-children">
								{category.children.map((child) => (
									<li key={child.slug}>
										<Link href={child.url}>{child.name}</Link>
										<span className="meta">{plural(child.posts.length, 'post', 'posts')}</span>
									</li>
								))}
							</ul>
						) : null}
					</li>
				))}
			</ul>
		</>
	);
}
