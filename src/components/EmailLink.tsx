'use client';

import type { ReactNode } from 'react';

/** A mailto link that builds the address only on click, so it is not in the HTML. */
export function EmailLink({ user, domain, className, children }: { user: string; domain: string; className?: string; children: ReactNode }) {
	return (
		<a
			href="#email"
			className={className}
			aria-label="Email"
			title="Email"
			onClick={(event) => {
				event.preventDefault();
				window.location.href = `mailto:${user}@${domain}`;
			}}
		>
			{children}
		</a>
	);
}
