import { Redirect, Slot } from 'expo-router'
import { useAuth } from '@clerk/expo'
import PageLoader from '../../components/PageLoader.jsx'

export default function AuthRoutesLayout() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) return <PageLoader />
  if (isSignedIn) return <Redirect href="/" />

  return <Slot />
}