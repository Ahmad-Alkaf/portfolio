import Link from 'next/link';
import { CopyEmail } from './CopyEmail';
import { EmailLink } from './EmailLink';
import { FileTextIcon, GitHubIcon, LinkedInIcon, MailIcon } from './icons';
import { site } from '@/site.config';

/** The contact band at the end of the home page and the case studies. */
export function ContactSection({ id = 'contact' }: { id?: string }) {
	const [user, domain] = site.author.email;
	const github = site.social.find((link) => link.type === 'github');
	const linkedin = site.social.find((link) => link.type === 'linkedin');
	return (
		<section className="contact" id={id} aria-labelledby={`${id}-title`}>
			<div>
				<p className="eyebrow">Contact</p>
				<h2 id={`${id}-title`} className="contact-title">
					Hiring for a React, Next.js, or full-stack role?
				</h2>
				<p className="contact-text">Send me an email. My resume, GitHub, and LinkedIn are one click away.</p>
			</div>
			<div className="actions">
				<EmailLink user={user} domain={domain} className="button button-primary">
					<MailIcon width={16} height={16} /> Email me
				</EmailLink>
				<CopyEmail user={user} domain={domain} />
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
		</section>
	);
}
