'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from './icons';

type Item = { src: string; alt: string; caption: string };

/**
 * Lets the reader open each image of a post larger, in a native modal
 * <dialog>. The dialog gives focus containment, Esc, and focus return. Arrow
 * keys and the buttons move between the images of the post.
 */
export function Lightbox({ scope }: { scope: string }) {
	const dialog = useRef<HTMLDialogElement>(null);
	const [items, setItems] = useState<Item[]>([]);
	const [index, setIndex] = useState(0);

	const open = useCallback((i: number) => {
		setIndex(i);
		const element = dialog.current;
		if (element && !element.open) element.showModal();
	}, []);

	useEffect(() => {
		const root = document.querySelector(scope);
		if (!root) return;
		const images = [...root.querySelectorAll('img')].filter((img) => !img.closest('a, button, .no-zoom'));
		const found: Item[] = [];
		const buttons: HTMLButtonElement[] = [];
		images.forEach((img, i) => {
			const caption = img.closest('figure')?.querySelector('figcaption')?.textContent?.trim() ?? '';
			found.push({ src: img.currentSrc || img.src, alt: img.alt, caption: caption || img.alt });
			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'zoom';
			button.setAttribute('aria-label', `Enlarge image${img.alt ? `: ${img.alt}` : ''}`);
			img.replaceWith(button);
			button.append(img);
			button.addEventListener('click', () => open(i));
			buttons.push(button);
		});
		// The list of images is read from the DOM once, after the post renders.
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setItems(found);
		return () => {
			for (const button of buttons) {
				const img = button.querySelector('img');
				if (img) button.replaceWith(img);
			}
		};
	}, [scope, open]);

	useEffect(() => {
		const element = dialog.current;
		if (!element || 'closedBy' in HTMLDialogElement.prototype) return;
		// Light dismiss for browsers without the closedby attribute: a click on the backdrop closes the dialog.
		const onClick = (event: MouseEvent) => {
			if (event.target !== element) return;
			const r = element.getBoundingClientRect();
			const inside = r.top <= event.clientY && event.clientY <= r.bottom && r.left <= event.clientX && event.clientX <= r.right;
			if (!inside) element.close();
		};
		element.addEventListener('click', onClick);
		return () => element.removeEventListener('click', onClick);
	}, []);

	const count = items.length;
	const item = items[index];
	const step = (delta: number) => setIndex((i) => (i + delta + count) % count);

	return (
		<dialog
			ref={dialog}
			className="lightbox"
			aria-label="Image viewer"
			{...({ closedby: 'any' } as object)}
			onKeyDown={(event) => {
				if (count < 2) return;
				if (event.key === 'ArrowRight') step(1);
				if (event.key === 'ArrowLeft') step(-1);
			}}
		>
			<div className="lightbox-bar">
				<p className="lightbox-caption">
					{item?.caption}
					{count > 1 ? <span className="lightbox-count"> {index + 1} / {count}</span> : null}
				</p>
				<button type="button" className="icon-button" onClick={() => dialog.current?.close()} aria-label="Close image viewer">
					<CloseIcon />
				</button>
			</div>
			{item ? <img className="lightbox-image" src={item.src} alt={item.alt} /> : null}
			{count > 1 ? (
				<div className="lightbox-nav">
					<button type="button" className="icon-button" onClick={() => step(-1)} aria-label="Previous image">
						<ChevronLeftIcon />
					</button>
					<button type="button" className="icon-button" onClick={() => step(1)} aria-label="Next image">
						<ChevronRightIcon />
					</button>
				</div>
			) : null}
		</dialog>
	);
}
