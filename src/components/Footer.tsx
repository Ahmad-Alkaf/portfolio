import { ArrowUpRightIcon } from './icons';
import { SocialLinks } from './SocialLinks';
import { getDict, type Lang } from '@/i18n';
import { site } from '@/site.config';

export function Footer({ lang }: { lang: Lang }) {
	const t = getDict(lang);
	const [beforeBrand, afterBrand] = t.footer.brand;
	return (
		<footer className="site-footer">
			<div className="container footer-row">
				<div className="footer-text">
					<p>
						© {new Date().getFullYear()} {t.site.name}. {t.footer.rights}
					</p>
					<p className="muted">
						{beforeBrand}
						<a className="ext-link" href={site.brand.url} target="_blank" rel="noopener noreferrer">
							{site.brand.name}
							<ArrowUpRightIcon width={12} height={12} />
							<span className="visually-hidden">{t.common.newTab}</span>
						</a>
						{afterBrand}
					</p>
				</div>
				<SocialLinks lang={lang} />
			</div>
		</footer>
	);
}
