import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/expo';
import { View } from 'react-native';
import AppSkeleton from '../../components/skeletons/AppSkeleton.jsx'
import NavBar from '../../components/navBar.jsx'

export default function RootLayout() {
	const { isLoaded, isSignedIn } = useAuth();

	if (!isLoaded) return <AppSkeleton />;
	if (!isSignedIn) return <Redirect href="/sign-in" />;

	return (
		<View style={{ flex: 1 }}>
			<Stack screenOptions={{ headerShown: false }} />
			<NavBar />
		</View>
	);
}