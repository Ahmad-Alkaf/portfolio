import Link from 'next/link';
import { Fragment } from 'react';
import { EmailLink } from '@/components/EmailLink';
import { MailIcon, MapPinIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { PrintButton } from '@/components/PrintButton';
import { StatusBadge } from '@/components/ProjectBits';
import { SkillGroups } from '@/components/SkillGroups';
import { getProjects, getResume, truncate } from '@/lib/content';
import { renderMarkdown } from '@/lib/markdown';
import { pageMetadata, personJsonLd } from '@/lib/seo';
import { site } from '@/site.config';

// The Resume page. The text comes from _tabs/resume.md. The markers
// <!-- skills --> and <!-- projects --> show the grouped skills and the
// project list.

const resume = getResume();
const MARKER = /<!--\s*(skills|projects)\s*-->/;

export const metadata = pageMetadata({
	title: 'Resume',
	description: truncate(renderMarkdown(resume.content.split(MARKER)[0] ?? '').text, 200),
	path: '/resume/'
});

function host(url: string): string {
	return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

function ResumeProjects() {
	const posts = getProjects();
	return (
		<ul className="resume-projects">
			{posts.map((post) => (
				<li key={post.slug}>
					<p className="resume-project-head">
						<Link href={post.url} className="resume-project-title">
							{post.name}
						</Link>
						<span className="muted">
							{[post.kind, post.date.slice(0, 4)].filter(Boolean).join(' · ')}
						</span>
						<StatusBadge status={post.status} />
					</p>
					<p>{post.summary}</p>
					<p className="resume-project-meta muted">
						{post.tagItems
							.slice(0, 6)
							.map((tag) => tag.label)
							.join(' · ')}
						{post.links.live ? (
							<>
								{' · '}
								<a href={post.links.live} target="_blank" rel="noopener noreferrer">
									{host(post.links.live)}
								</a>
							</>
						) : null}
					</p>
				</li>
			))}
		</ul>
	);
}

export default function ResumePage() {
	const parts = resume.content.split(MARKER);
	const [user, domain] = site.author.email;
	return (
		<article className="resume">
			<JsonLd data={personJsonLd()} />
			<header className="resume-head">
				<img src={site.avatar} alt={`Photo of ${site.author.name}`} width={88} height={88} className="resume-photo" />
				<div className="resume-id">
					<h1 className="resume-name">{site.title}</h1>
					<p className="resume-role">{site.role}</p>
					<ul className="resume-contact">
						<li>
							<MapPinIcon /> {site.location}
						</li>
						<li>
							<EmailLink user={user} domain={domain} className="resume-email">
								<MailIcon width={16} height={16} />
								<span className="screen-only">Email</span>
								<span className="print-only print-email" data-user={user} data-domain={domain} />
							</EmailLink>
						</li>
						<li>
							<a href={site.url}>{host(site.url)}</a>
						</li>
						{site.social
							.filter((link) => link.type !== 'x')
							.map((link) => (
								<li key={link.type}>
									<a href={link.url} target="_blank" rel="noopener noreferrer me">
										{host(link.url)}
									</a>
								</li>
							))}
					</ul>
				</div>
				<div className="resume-tools screen-only">
					<PrintButton />
				</div>
			</header>
			<div className="prose resume-body">
				{parts.map((part, i) => {
					if (i % 2 === 1) {
						return <Fragment key={i}>{part === 'skills' ? <SkillGroups /> : <ResumeProjects />}</Fragment>;
					}
					const { html } = renderMarkdown(part, { mediaSubpath: resume.mediaSubpath });
					return <div key={i} dangerouslySetInnerHTML={{ __html: html }} />;
				})}
			</div>
		</article>
	);
}
