import { PostCard } from '@/components/PostCard';
import { SocialLinks } from '@/components/SocialLinks';
import { getPosts } from '@/lib/content';
import { pageMetadata } from '@/lib/seo';
import { site } from '@/site.config';

export const metadata = pageMetadata({ path: '/' });

export default function HomePage() {
	const posts = getPosts();
	return (
		<>
			<section className="intro">
				<img src={site.avatar} alt={site.author.name} width={112} height={112} className="avatar intro-avatar" />
				<div>
					<h1>{site.title}</h1>
					<p className="intro-tagline">{site.tagline}</p>
					<p className="intro-text">{site.description}</p>
					<SocialLinks />
				</div>
			</section>
			<h2 className="section-title">Projects</h2>
			<ul className="cards">
				{posts.map((post) => (
					<PostCard key={post.slug} post={post} />
				))}
			</ul>
		</>
	);
}
