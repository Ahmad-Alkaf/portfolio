'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** `also`: another path prefix that makes the item the current one (the posts, for "Projects"). */
export type NavItem = { href: string; label: string; also?: string };

export function NavLinks({ items }: { items: readonly NavItem[] }) {
	const pathname = usePathname();
	return (
		<ul className="nav-links">
			{items.map((item) => {
				const active = pathname.startsWith(item.href) || (item.also !== undefined && pathname.startsWith(item.also));
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
