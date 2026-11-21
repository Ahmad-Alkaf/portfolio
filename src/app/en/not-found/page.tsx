import { NotFoundPage, notFoundMetadata } from '@/views/NotFoundPage';

// The English "not found" page. scripts/postbuild.mjs moves the built page to out/en/404.html.

export const metadata = notFoundMetadata('en');

export default function Page() {
	return <NotFoundPage lang="en" />;
}
