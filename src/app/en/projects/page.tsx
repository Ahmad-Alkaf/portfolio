import { ProjectsPage, projectsMetadata } from '@/views/ProjectsPage';

export const metadata = projectsMetadata('en');

export default function Page() {
	return <ProjectsPage lang="en" />;
}
