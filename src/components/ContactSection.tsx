import Link from 'next/link';
import { CopyEmail } from './CopyEmail';
import { EmailLink } from './EmailLink';
import { FileTextIcon, GitHubIcon, LinkedInIcon, MailIcon } from './icons';
import { getDict, localePath, type Lang } from '@/i18n';
import { site } from '@/site.config';

/** The contact band at the end of the home page and the case studies. */
export function ContactSection({ lang, id = 'contact' }: { lang: Lang; id?: string }) {
	const t = getDict(lang);
	const [user, domain] = site.author.email;
	const github = site.social.find((link) => link.type === 'github');
	const linkedin = site.social.find((link) => link.type === 'linkedin');
	return (
		<section className="contact" id={id} aria-labelledby={`${id}-title`}>
			<div>
				<p className="eyebrow">{t.contact.eyebrow}</p>
				<h2 id={`${id}-title`} className="contact-title">
					{t.contact.title}
				</h2>
				<p className="contact-text">{t.contact.text}</p>
			</div>
			<div className="actions">
				<EmailLink user={user} domain={domain} fallbackHref={localePath(lang, '/#contact')} className="button button-primary">
					<MailIcon width={16} height={16} /> {t.common.emailMe}
				</EmailLink>
				<CopyEmail user={user} domain={domain} labels={{ copy: t.contact.copy, copied: t.contact.copied, copyFailed: t.contact.copyFailed }} />
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
		</section>
	);
}
