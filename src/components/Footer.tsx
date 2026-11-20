import { ArrowUpRightIcon } from './icons';
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
						<a className="ext-link" href={site.brand.url} target="_blank" rel="noopener noreferrer">
							{site.brand.name}
							<ArrowUpRightIcon width={12} height={12} />
							<span className="visually-hidden"> (opens in a new tab)</span>
						</a>
						.
					</p>
				</div>
				<SocialLinks />
			</div>
		</footer>
	);
}
