'use client';

import { PrinterIcon } from './icons';

/** Opens the print dialog. The print style gives a clean one-column resume, and "Save as PDF" makes a file. */
export function PrintButton({ label }: { label: string }) {
	return (
		<button type="button" className="button button-ghost" onClick={() => window.print()}>
			<PrinterIcon /> {label}
		</button>
	);
}
