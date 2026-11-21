import { HomePage, homeMetadata } from '@/views/HomePage';

export const metadata = homeMetadata('en');

export default function Page() {
	return <HomePage lang="en" />;
}
