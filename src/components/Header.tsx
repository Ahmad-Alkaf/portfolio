import Link from 'next/link';
import { LangSwitch } from './LangSwitch';
import { NavLinks } from './NavLinks';
import { ThemeToggle } from './ThemeToggle';
import { getDict, localePath, type Lang } from '@/i18n';
import { site } from '@/site.config';

/** `notFound`: the page is a "not found" page, so the language switch goes to the other home page. */
export function Header({ lang, notFound = false }: { lang: Lang; notFound?: boolean }) {
	const t = getDict(lang);
	const nav = [
		{ href: localePath(lang, '/projects/'), label: t.nav.projects, also: localePath(lang, '/posts/') },
		{ href: localePath(lang, '/tags/'), label: t.nav.skills },
		{ href: localePath(lang, '/resume/'), label: t.nav.resume }
	];
	return (
		<header className="site-header">
			<div className="container header-row">
				<Link href={localePath(lang, '/')} className="brand">
					<img src={site.avatar} alt="" width={32} height={32} className="brand-avatar" />
					<span className="brand-name">{t.site.name}</span>
				</Link>
				<nav aria-label={t.nav.main} className="site-nav">
					<NavLinks items={nav} />
				</nav>
				<div className="header-actions">
					<LangSwitch lang={lang} home={notFound} />
					<ThemeToggle labels={{ toDark: t.common.toDark, toLight: t.common.toLight }} />
					<Link href={localePath(lang, '/#contact')} className="button button-small button-primary header-contact">
						{t.nav.contact}
					</Link>
				</div>
			</div>
		</header>
	);
}
