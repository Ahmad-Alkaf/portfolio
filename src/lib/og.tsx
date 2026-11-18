import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/site.config';

// The share images (Open Graph and Twitter), drawn at build time.

export const ogSize = { width: 1200, height: 630 };

const INK = '#f3efe8';
const MUTED = '#b3aa9f';
const ACCENT = '#fb923c';
const PAPER = '#141210';
const LINE = '#3a342d';

function avatarDataUri(): string {
	const file = path.join(process.cwd(), 'public', site.avatar);
	return `data:image/jpeg;base64,${fs.readFileSync(file).toString('base64')}`;
}

export function ogImage({ eyebrow, title, text, chips }: { eyebrow: string; title: string; text: string; chips: string[] }) {
	const titleSize = title.length > 34 ? 64 : 80;
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					background: PAPER,
					color: INK,
					padding: '64px 72px',
					borderTop: `12px solid ${ACCENT}`
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
					<img src={avatarDataUri()} width={64} height={64} style={{ borderRadius: 999 }} alt="" />
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<div style={{ fontSize: 30, color: INK }}>{site.title}</div>
						<div style={{ fontSize: 22, color: MUTED }}>{site.role}</div>
					</div>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
					<div style={{ fontSize: 24, color: ACCENT, letterSpacing: 2, textTransform: 'uppercase' }}>{eyebrow}</div>
					<div style={{ fontSize: titleSize, lineHeight: 1.05, letterSpacing: -2 }}>{title}</div>
					<div style={{ fontSize: 30, lineHeight: 1.35, color: MUTED, maxWidth: 1000 }}>{text}</div>
				</div>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<div style={{ display: 'flex', gap: 12 }}>
						{chips.slice(0, 5).map((chip) => (
							<div key={chip} style={{ fontSize: 22, padding: '8px 16px', border: `2px solid ${LINE}`, borderRadius: 999, color: INK }}>
								{chip}
							</div>
						))}
					</div>
					<div style={{ fontSize: 24, color: MUTED }}>{site.url.replace('https://', '')}</div>
				</div>
			</div>
		),
		ogSize
	);
}
