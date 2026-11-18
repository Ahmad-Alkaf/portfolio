'use client';

import type { ReactNode } from 'react';

/**
 * A mailto link that builds the address only on click, so the address is not
 * in the HTML. Without JavaScript, the link goes to the contact section.
 */
export function EmailLink({
	user,
	domain,
	className,
	label,
	children
}: {
	user: string;
	domain: string;
	className?: string;
	/** The accessible name, for an icon-only link. */
	label?: string;
	children: ReactNode;
}) {
	return (
		// A plain <a>: the click handler opens the mail app. The href is only the no-JavaScript fallback.
		// eslint-disable-next-line @next/next/no-html-link-for-pages
		<a
			href="/#contact"
			className={className}
			aria-label={label}
			title={label}
			onClick={(event) => {
				event.preventDefault();
				window.location.href = `mailto:${user}@${domain}`;
			}}
		>
			{children}
		</a>
	);
}
