import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/expo';
import PageLoader from '../../components/PageLoader.jsx'

export default function RootLayout() {
	const { isLoaded, isSignedIn } = useAuth();

	if (!isLoaded) return <PageLoader />;
	if (!isSignedIn) return <Redirect href="/sign-in" />;

	return <Stack />;
}