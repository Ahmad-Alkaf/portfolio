import { ResumePage, resumeMetadata } from '@/views/ResumePage';

export const metadata = resumeMetadata('en');

export default function Page() {
	return <ResumePage lang="en" />;
}
