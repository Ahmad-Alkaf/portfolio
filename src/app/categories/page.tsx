import { RedirectPage } from '@/components/RedirectPage';
import { pageMetadata } from '@/lib/seo';

// The old Chirpy "Categories" page. The projects page replaces it.

export const metadata = pageMetadata({ title: 'Projects', path: '/projects/' });

export default function CategoriesPage() {
	return <RedirectPage to="/projects/" label="Projects" />;
}
