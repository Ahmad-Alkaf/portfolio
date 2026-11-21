import { EmailLink } from './EmailLink';
import { GitHubIcon, LinkedInIcon, MailIcon, XIcon } from './icons';
import { getDict, localePath, type Lang } from '@/i18n';
import { site } from '@/site.config';

const ICONS = { github: GitHubIcon, x: XIcon, linkedin: LinkedInIcon } as const;

/** Icon links: GitHub, LinkedIn, X, and email. */
export function SocialLinks({ lang }: { lang: Lang }) {
	const t = getDict(lang);
	const [user, domain] = site.author.email;
	return (
		<ul className="social">
			{site.social.map((link) => {
				const Icon = ICONS[link.type];
				return (
					<li key={link.type}>
						<a href={link.url} target="_blank" rel="noopener noreferrer me" aria-label={link.label} title={link.label} className="icon-button">
							<Icon />
						</a>
					</li>
				);
			})}
			<li>
				<EmailLink user={user} domain={domain} fallbackHref={localePath(lang, '/#contact')} className="icon-button" label={t.common.email}>
					<MailIcon />
				</EmailLink>
			</li>
		</ul>
	);
}
