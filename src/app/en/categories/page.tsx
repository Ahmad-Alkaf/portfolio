import { ProjectsRedirectPage, projectsRedirectMetadata } from '@/views/RedirectPages';

export const metadata = projectsRedirectMetadata('en');

export default function Page() {
	return <ProjectsRedirectPage lang="en" />;
}
