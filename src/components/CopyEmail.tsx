'use client';

import { useRef, useState } from 'react';
import { CheckIcon, CopyIcon } from './icons';

/** Copies the email address. The address is put together only in the browser. */
export function CopyEmail({ user, domain }: { user: string; domain: string }) {
	const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
	const [message, setMessage] = useState('');
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

	async function copy() {
		clearTimeout(timer.current);
		let ok = true;
		try {
			await navigator.clipboard.writeText(`${user}@${domain}`);
		} catch {
			ok = false;
		}
		setState(ok ? 'copied' : 'failed');
		setMessage('');
		requestAnimationFrame(() => setMessage(ok ? 'Email address copied' : 'Copy failed'));
		timer.current = setTimeout(() => {
			setState('idle');
			setMessage('');
		}, 2500);
	}

	return (
		<span className="copy">
			<button type="button" className="button button-ghost" onClick={copy} data-state={state}>
				{state === 'copied' ? <CheckIcon /> : <CopyIcon />}
				Copy email
			</button>
			<span className="copy-tip" role="status">
				{message}
			</span>
		</span>
	);
}
