import Link from 'next/link';
import { NavLinks, type NavItem } from './NavLinks';
import { ThemeToggle } from './ThemeToggle';
import { getTabs } from '@/lib/content';
import { site } from '@/site.config';

export function Header() {
	const items: NavItem[] = [{ href: '/', label: 'Home' }, ...getTabs().map((tab) => ({ href: tab.url, label: tab.title }))];
	return (
		<header className="site-header">
			<div className="container header-row">
				<Link href="/" className="brand">
					<img src={site.avatar} alt="" width={36} height={36} className="avatar" />
					<span>
						<span className="brand-name">{site.title}</span>
						<span className="brand-tagline">{site.tagline}</span>
					</span>
				</Link>
				<ThemeToggle />
			</div>
			<nav className="container" aria-label="Main">
				<NavLinks items={items} />
			</nav>
		</header>
	);
}
