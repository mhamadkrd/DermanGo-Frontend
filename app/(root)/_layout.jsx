import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/expo';
import { View } from 'react-native';
import PageLoader from '../../components/PageLoader.jsx'
import NavBar from '../../components/navBar.jsx'

export default function RootLayout() {
	const { isLoaded, isSignedIn } = useAuth();

	if (!isLoaded) return <PageLoader />;
	if (!isSignedIn) return <Redirect href="/sign-in" />;

	return (
		<View style={{ flex: 1 }}>
			<Stack screenOptions={{ headerShown: false }} />
			<NavBar />
		</View>
	);
}