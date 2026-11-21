import { ProjectsRedirectPage, projectsRedirectMetadata } from '@/views/RedirectPages';

export const metadata = projectsRedirectMetadata('ar');

export default function Page() {
	return <ProjectsRedirectPage lang="ar" />;
}
