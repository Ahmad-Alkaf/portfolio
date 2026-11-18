import Link from 'next/link';
import { NavLinks } from './NavLinks';
import { ThemeToggle } from './ThemeToggle';
import { site } from '@/site.config';

export function Header() {
	return (
		<header className="site-header">
			<div className="container header-row">
				<Link href="/" className="brand">
					<img src={site.avatar} alt="" width={32} height={32} className="brand-avatar" />
					<span className="brand-name">{site.title}</span>
				</Link>
				<nav aria-label="Main" className="site-nav">
					<NavLinks items={site.nav} />
				</nav>
				<div className="header-actions">
					<ThemeToggle />
					<Link href="/#contact" className="button button-small button-primary header-contact">
						Contact
					</Link>
				</div>
			</div>
		</header>
	);
}
