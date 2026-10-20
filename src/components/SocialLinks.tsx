import { EmailLink } from './EmailLink';
import { GitHubIcon, LinkedInIcon, MailIcon, XIcon } from './icons';
import { site } from '@/site.config';

const ICONS = { github: GitHubIcon, x: XIcon, linkedin: LinkedInIcon } as const;

export function SocialLinks() {
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
				<EmailLink user={user} domain={domain} className="icon-button">
					<MailIcon />
				</EmailLink>
			</li>
		</ul>
	);
}
