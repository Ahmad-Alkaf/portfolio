// Mixed-direction text. In an Arabic (right-to-left) sentence, a Latin name next to a
// neutral character can show in the wrong order: "C#" shows as "#C", ".NET" as "NET.",
// and "React، Next.js" puts the items left to right. A Unicode isolate around each Latin
// run stops this: the run is left-to-right inside, and the text around it does not see it.

const LRI = '⁦';
const PDI = '⁩';

// One Latin word: letters and digits with inner punctuation (Next.js, PHP-FPM, CI/CD),
// an optional first "." or "@" (.NET), and an optional last "+" or "#" (C#, C++).
const TOKEN = String.raw`[.@]?[A-Za-z0-9]+(?:[.'’_@:/+-]+[A-Za-z0-9]+)*[+#]*`;
// A run: words with one space between them ("Cloudflare Workers", "Laravel 12") and
// the joiners "+", "/", and "&" ("React + TypeScript"). The first word must have a letter.
const RUN = new RegExp(String.raw`(?<![A-Za-z0-9])(?=[.@]?[0-9]*[A-Za-z])${TOKEN}(?: (?:[+/&] )?${TOKEN})*`, 'g');
const ISOLATES = /[⁦⁩]/g;

/** The text with no isolate characters, for metadata, feeds, and comparisons. */
export function plainText(text: string): string {
	return text.replace(ISOLATES, '');
}

// A one-letter Arabic word before a Latin name ("و React", "بـ TypeScript"): the space between
// them becomes a no-break space, so the letter does not stay alone at the end of a line.
const PARTICLE = /(^|[\s(])(و|بـ|لـ|كـ|الـ) (?=\u2066)/g;

/**
 * The text with each Latin run in a left-to-right isolate. For Arabic text only.
 * The text of the site goes through this function at build time, so the Markdown
 * files and the dictionary have plain text with no invisible characters.
 */
export function isolateLatin(text: string): string {
	return plainText(text)
		.replace(RUN, (run) => `${LRI}${run}${PDI}`)
		.replace(PARTICLE, '$1$2\u00A0');
}
