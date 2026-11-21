import Link from 'next/link';
import { ContactSection } from '@/components/ContactSection';
import { EmailLink } from '@/components/EmailLink';
import { ArrowRightIcon, FileTextIcon, GitHubIcon, LinkedInIcon, MailIcon, MapPinIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectFeature } from '@/components/ProjectFeature';
import { toProjectSummary } from '@/components/ProjectBits';
import { SkillGroups } from '@/components/SkillGroups';
import { getDict, localePath, type Lang } from '@/i18n';
import { getFeaturedPosts, getMorePosts, getPosts } from '@/lib/content';
import { pageMetadata, personJsonLd } from '@/lib/seo';
import { site } from '@/site.config';

export function homeMetadata(lang: Lang) {
	return pageMetadata({ lang, path: '/' });
}

export function HomePage({ lang }: { lang: Lang }) {
	const t = getDict(lang);
	const featured = getFeaturedPosts(lang);
	const others = getMorePosts(lang);
	const projectCount = getPosts(lang).length;
	const [user, domain] = site.author.email;
	const github = site.social.find((link) => link.type === 'github');
	const linkedin = site.social.find((link) => link.type === 'linkedin');
	const [leadStart, leadStack, leadEnd] = t.home.lead;

	return (
		<>
			<JsonLd data={personJsonLd(lang)} />
			<section className="hero" aria-labelledby="hero-title">
				<div className="hero-main">
					<p className="eyebrow hero-eyebrow">
						<span>{t.site.role}</span>
						<span className="hero-location">
							<MapPinIcon /> {t.site.location}
						</span>
					</p>
					<h1 id="hero-title" className="hero-title">
						{t.site.name}
					</h1>
					<p className="hero-lead">
						{leadStart}
						<strong>{leadStack}</strong>
						{leadEnd}
					</p>
					<p className="hero-sub">{t.home.sub}</p>
					<div className="actions hero-actions">
						<EmailLink user={user} domain={domain} fallbackHref={localePath(lang, '/#contact')} className="button button-primary">
							<MailIcon width={16} height={16} /> {t.common.emailMe}
						</EmailLink>
						<Link href={localePath(lang, '/resume/')} className="button button-ghost">
							<FileTextIcon /> {t.common.resume}
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
				<aside className="glance" aria-label={t.home.glanceLabel}>
					<img src={site.avatar} alt={t.common.photoAlt} width={96} height={96} className="glance-photo" fetchPriority="high" />
					<dl className="glance-list">
						{t.home.glance.map((row) => (
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
					<p className="eyebrow">{t.home.work.eyebrow}</p>
					<h2 id="work-title" className="section-title">
						{t.home.work.title}
					</h2>
					<p className="section-text">{t.home.work.text}</p>
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
						<p className="eyebrow">{t.home.more.eyebrow}</p>
						<h2 id="more-title" className="section-title">
							{t.home.more.title}
						</h2>
					</div>
					<Link href={localePath(lang, '/projects/')} className="text-link">
						{t.home.more.all(projectCount)} <ArrowRightIcon />
					</Link>
				</header>
				<ul className="cards cards-two">
					{others.map((post) => (
						<li key={post.slug}>
							<ProjectCard post={toProjectSummary(post)} />
						</li>
					))}
				</ul>
			</section>

			<section className="section" aria-labelledby="skills-title">
				<header className="section-head">
					<p className="eyebrow">{t.home.skills.eyebrow}</p>
					<h2 id="skills-title" className="section-title">
						{t.home.skills.title}
					</h2>
				</header>
				<SkillGroups lang={lang} />
			</section>

			<ContactSection lang={lang} />
		</>
	);
}
