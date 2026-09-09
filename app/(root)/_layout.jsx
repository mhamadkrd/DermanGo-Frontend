//(root)/_layout
import { Redirect, Stack, usePathname } from 'expo-router';
import { useAuth } from '@clerk/expo';
import { View } from 'react-native';
import PageLoader from '../../components/PageLoader.jsx'
import NavBar from '../../components/navBar.jsx'

const HIDE_NAVBAR_ROUTES = ['/pharmacy-dashboard']

export default function RootLayout() {
	const { isLoaded, isSignedIn } = useAuth();
	const pathname = usePathname()

	if (!isLoaded) return <PageLoader />;
	if (!isSignedIn) return <Redirect href="/sign-in" />;

	const showNavBar = !HIDE_NAVBAR_ROUTES.includes(pathname)

	return (
		<View style={{ flex: 1 }}>
			<Stack screenOptions={{ headerShown: false }} />
			{showNavBar && <NavBar />}
		</View>
	);
}