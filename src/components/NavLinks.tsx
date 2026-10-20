'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type NavItem = { href: string; label: string };

export function NavLinks({ items }: { items: NavItem[] }) {
	const pathname = usePathname();
	return (
		<ul className="nav-links">
			{items.map((item) => {
				const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
				return (
					<li key={item.href}>
						<Link href={item.href} aria-current={active ? 'page' : undefined}>
							{item.label}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
