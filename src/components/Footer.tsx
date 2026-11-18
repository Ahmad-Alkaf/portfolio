import { SocialLinks } from './SocialLinks';
import { site } from '@/site.config';

export function Footer() {
	return (
		<footer className="site-footer">
			<div className="container footer-row">
				<div className="footer-text">
					<p>
						© {new Date().getFullYear()} {site.author.name}. All rights reserved.
					</p>
					<p className="muted">
						Personal products published under{' '}
						<a href={site.brand.url} target="_blank" rel="noopener noreferrer">
							{site.brand.name}
						</a>
						. <a href="/feed.xml">Atom feed</a>.
					</p>
				</div>
				<SocialLinks />
			</div>
		</footer>
	);
}
