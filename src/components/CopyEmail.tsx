'use client';

import { useRef, useState } from 'react';
import { CheckIcon, CopyIcon } from './icons';

/**
 * Copies the email address. The address is put together only in the browser.
 * When the browser blocks the copy, the address shows as text that the reader can select.
 */
export function CopyEmail({ user, domain }: { user: string; domain: string }) {
	const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
	const [message, setMessage] = useState('');
	const [showAddress, setShowAddress] = useState(false);
	const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
	const address = `${user}@${domain}`;

	async function copy() {
		clearTimeout(timer.current);
		let ok = true;
		try {
			await navigator.clipboard.writeText(address);
		} catch {
			ok = false;
		}
		setState(ok ? 'copied' : 'failed');
		if (!ok) setShowAddress(true);
		setMessage('');
		requestAnimationFrame(() => setMessage(ok ? 'Email address copied' : `Copy failed. The address is ${address}`));
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
			{showAddress ? <span className="copy-address">{address}</span> : null}
		</span>
	);
}
