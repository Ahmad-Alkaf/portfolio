import { ProjectsPage, projectsMetadata } from '@/views/ProjectsPage';

export const metadata = projectsMetadata('ar');

export default function Page() {
	return <ProjectsPage lang="ar" />;
}
