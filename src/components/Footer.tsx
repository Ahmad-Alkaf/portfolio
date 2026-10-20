import { SocialLinks } from './SocialLinks';
import { site } from '@/site.config';

export function Footer() {
	return (
		<footer className="site-footer">
			<div className="container footer-row">
				<p>
					© {new Date().getFullYear()}{' '}
					<a href={site.author.url} target="_blank" rel="noopener noreferrer">
						{site.author.name}
					</a>
					. Some rights reserved.
				</p>
				<SocialLinks />
			</div>
		</footer>
	);
}
