import { Bricolage_Grotesque, Geist, Geist_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google';

// next/font downloads the fonts at build time and serves them from this site.
// The fallback faces are in globals.css ("Font fallbacks"). They have the metrics of the
// web fonts, so the text keeps its size when a font loads, also on Linux and Android.
// Turbopack ignores adjustFontFallback: false without a fallback list, so the list is necessary.
const display = Bricolage_Grotesque({
	subsets: ['latin'],
	variable: '--font-display',
	display: 'swap',
	adjustFontFallback: false,
	fallback: ['Bricolage Metric Fallback', 'Bricolage Roboto Fallback']
});
const sans = Geist({
	subsets: ['latin'],
	variable: '--font-body',
	display: 'swap',
	adjustFontFallback: false,
	fallback: ['Geist Metric Fallback', 'Geist Roboto Fallback']
});
// Geist Mono has a fixed 0.6 em advance, and so has its fallback face.
const mono = Geist_Mono({
	subsets: ['latin'],
	variable: '--font-code',
	display: 'swap',
	preload: false,
	adjustFontFallback: false,
	fallback: ['Geist Mono Metric Fallback']
});

// The Arabic text face (see DESIGN.md). The Latin fonts have no Arabic letters, so the browser
// takes each Arabic letter from this font, and each Latin letter from the Latin fonts.
// The font has no variable file: these four weights are the ones that the page styles use.
// (next/font reads the options at build time, so each call has the list as a literal.)

// Arabic pages: the browser gets the font files early (preload), because all the text needs them.
const arabic = IBM_Plex_Sans_Arabic({
	subsets: ['arabic'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-arabic',
	display: 'swap',
	adjustFontFallback: false,
	fallback: ['Plex Arabic Fallback']
});

// English pages: the same font with no preload. The browser gets a file only if the page
// has Arabic text (the label of the language switch, and an Arabic name in a post).
const arabicLazy = IBM_Plex_Sans_Arabic({
	subsets: ['arabic'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-arabic',
	display: 'swap',
	preload: false,
	adjustFontFallback: false,
	fallback: ['Plex Arabic Fallback']
});

const latin = `${display.variable} ${sans.variable} ${mono.variable}`;

/** The font classes for <html>, for each language. */
export const fontClass = {
	ar: `${latin} ${arabic.variable}`,
	en: `${latin} ${arabicLazy.variable}`
} as const;
