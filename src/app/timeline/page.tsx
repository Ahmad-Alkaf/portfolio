import { RedirectPage } from '@/components/RedirectPage';
import { pageMetadata } from '@/lib/seo';

// The old Chirpy "Timeline" page. The projects page (newest first) replaces it.

export const metadata = pageMetadata({ title: 'Projects', path: '/projects/' });

export default function TimelinePage() {
	return <RedirectPage to="/projects/" label="Projects" />;
}
