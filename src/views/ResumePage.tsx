import Link from 'next/link';
import { Fragment } from 'react';
import { EmailLink } from '@/components/EmailLink';
import { MailIcon, MapPinIcon } from '@/components/icons';
import { JsonLd } from '@/components/JsonLd';
import { PrintButton } from '@/components/PrintButton';
import { StatusBadge } from '@/components/ProjectBits';
import { SkillGroups } from '@/components/SkillGroups';
import { getDict, localePath, localText, type Lang } from '@/i18n';
import { getProjects, getResume, truncate } from '@/lib/content';
import { renderMarkdown } from '@/lib/markdown';
import { pageMetadata, personJsonLd } from '@/lib/seo';
import { site } from '@/site.config';

// The Resume page. The text comes from _tabs/resume.md (English) and
// _tabs/resume.ar.md (Arabic). The markers <!-- skills --> and <!-- projects -->
// show the grouped skills and the project list.

const MARKER = /<!--\s*(skills|projects)\s*-->/;

export function resumeMetadata(lang: Lang) {
	const resume = getResume(lang);
	return pageMetadata({
		lang,
		title: getDict(lang).resume.title,
		description: truncate(renderMarkdown(resume.content.split(MARKER)[0] ?? '', { lang }).text, 200),
		path: '/resume/'
	});
}

function host(url: string): string {
	return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

function ResumeProjects({ lang }: { lang: Lang }) {
	const posts = getProjects(lang);
	return (
		<ul className="resume-projects">
			{posts.map((post) => (
				<li key={post.slug}>
					<p className="resume-project-head">
						<Link href={post.url} className="resume-project-title">
							{post.name}
						</Link>
						<span className="muted">{[post.kind, post.date.slice(0, 4)].filter(Boolean).join(' · ')}</span>
						<StatusBadge status={post.status} lang={lang} />
					</p>
					<p>{post.summary}</p>
					<p className="resume-project-meta muted">
						{localText(
							lang,
							post.tagItems
								.slice(0, 6)
								.map((tag) => tag.label)
								.join(' · ')
						)}
						{post.links.live ? (
							<>
								{' · '}
								<a href={post.links.live} target="_blank" rel="noopener noreferrer" dir="ltr">
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

export function ResumePage({ lang }: { lang: Lang }) {
	const t = getDict(lang);
	const resume = getResume(lang);
	const parts = resume.content.split(MARKER);
	const [user, domain] = site.author.email;
	return (
		<article className="resume">
			<JsonLd data={personJsonLd(lang)} />
			<header className="resume-head">
				<img src={site.avatar} alt={t.common.photoAlt} width={88} height={88} className="resume-photo" />
				<div className="resume-id">
					<h1 className="resume-name">{t.site.name}</h1>
					<p className="resume-role">{t.site.role}</p>
					<ul className="resume-contact">
						<li>
							<MapPinIcon /> {t.site.location}
						</li>
						<li>
							<EmailLink user={user} domain={domain} fallbackHref={localePath(lang, '/#contact')} className="resume-email">
								<MailIcon width={16} height={16} />
								<span className="screen-only">{t.common.email}</span>
								<span className="print-only print-email" dir="ltr" data-user={user} data-domain={domain} />
							</EmailLink>
						</li>
						<li>
							<a href={`${site.url}${localePath(lang, '/')}`} dir="ltr">
								{host(`${site.url}${localePath(lang, '/')}`)}
							</a>
						</li>
						{site.social
							.filter((link) => link.type !== 'x')
							.map((link) => (
								<li key={link.type}>
									<a href={link.url} target="_blank" rel="noopener noreferrer me" dir="ltr">
										{host(link.url)}
									</a>
								</li>
							))}
					</ul>
				</div>
				<div className="resume-tools screen-only">
					<PrintButton label={t.resume.print} />
				</div>
			</header>
			<div className="prose resume-body">
				{parts.map((part, i) => {
					if (i % 2 === 1) {
						return <Fragment key={i}>{part === 'skills' ? <SkillGroups lang={lang} /> : <ResumeProjects lang={lang} />}</Fragment>;
					}
					const { html } = renderMarkdown(part, { mediaSubpath: resume.mediaSubpath, lang });
					return <div key={i} dangerouslySetInnerHTML={{ __html: html }} />;
				})}
			</div>
		</article>
	);
}
