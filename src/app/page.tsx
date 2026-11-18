import Link from 'next/link';
import { ContactSection } from '@/components/ContactSection';
import { EmailLink } from '@/components/EmailLink';
import { ArrowRightIcon, FileTextIcon, GitHubIcon, LinkedInIcon, MailIcon, MapPinIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectFeature } from '@/components/ProjectFeature';
import { toProjectSummary } from '@/components/ProjectBits';
import { SkillGroups } from '@/components/SkillGroups';
import { getFeaturedPosts, getMorePosts, getPosts } from '@/lib/content';
import { pageMetadata, personJsonLd } from '@/lib/seo';
import { site } from '@/site.config';

export const metadata = pageMetadata({ path: '/' });

export default function HomePage() {
	const featured = getFeaturedPosts();
	const others = getMorePosts();
	const projectCount = getPosts().length;
	const [user, domain] = site.author.email;
	const github = site.social.find((link) => link.type === 'github');
	const linkedin = site.social.find((link) => link.type === 'linkedin');

	return (
		<>
			<JsonLd data={personJsonLd()} />
			<section className="hero" aria-labelledby="hero-title">
				<div className="hero-main">
					<p className="eyebrow hero-eyebrow">
						<span>{site.role}</span>
						<span className="hero-location">
							<MapPinIcon /> {site.location}
						</span>
					</p>
					<h1 id="hero-title" className="hero-title">
						{site.title}
					</h1>
					<p className="hero-lead">
						I build full-stack web products with <strong>TypeScript, React, Next.js, Node.js, and PostgreSQL</strong>, and I ship them to
						production.
					</p>
					<p className="hero-sub">
						4 years of experience. Five products live today, from a multi-tenant SaaS built in a team to a cloud point-of-sale system and
						browser-only tools that I run myself.
					</p>
					<div className="actions hero-actions">
						<EmailLink user={user} domain={domain} className="button button-primary">
							<MailIcon width={16} height={16} /> Email me
						</EmailLink>
						<Link href="/resume/" className="button button-ghost">
							<FileTextIcon /> Resume
						</Link>
						{github ? (
							<a href={github.url} className="button button-ghost" target="_blank" rel="noopener noreferrer me">
								<GitHubIcon width={16} height={16} /> GitHub
							</a>
						) : null}
						{linkedin ? (
							<a href={linkedin.url} className="button button-ghost" target="_blank" rel="noopener noreferrer me">
								<LinkedInIcon width={16} height={16} /> LinkedIn
							</a>
						) : null}
					</div>
				</div>
				<aside className="glance" aria-label="At a glance">
					<img src={site.avatar} alt={`Photo of ${site.author.name}`} width={96} height={96} className="glance-photo" fetchPriority="high" />
					<dl className="glance-list">
						{site.glance.map((row) => (
							<div key={row.label}>
								<dt>{row.label}</dt>
								<dd>{row.value}</dd>
							</div>
						))}
					</dl>
				</aside>
			</section>

			<section className="section" aria-labelledby="work-title" id="work">
				<header className="section-head">
					<p className="eyebrow">Selected work</p>
					<h2 id="work-title" className="section-title">
						Products in production
					</h2>
					<p className="section-text">Each one in short: the problem, what I built, and the result. The case study has the details.</p>
				</header>
				<div className="features">
					{featured.map((post) => (
						<ProjectFeature key={post.slug} post={post} />
					))}
				</div>
			</section>

			<section className="section" aria-labelledby="more-title">
				<header className="section-head section-head-row">
					<div>
						<p className="eyebrow">More projects</p>
						<h2 id="more-title" className="section-title">
							Earlier work
						</h2>
					</div>
					<Link href="/projects/" className="text-link">
						All {projectCount} projects, by stack <ArrowRightIcon />
					</Link>
				</header>
				<ul className="cards">
					{others.map((post) => (
						<li key={post.slug}>
							<ProjectCard post={toProjectSummary(post)} />
						</li>
					))}
				</ul>
			</section>

			<section className="section" aria-labelledby="skills-title">
				<header className="section-head">
					<p className="eyebrow">Skills</p>
					<h2 id="skills-title" className="section-title">
						What I work with
					</h2>
				</header>
				<SkillGroups />
			</section>

			<ContactSection />
		</>
	);
}
