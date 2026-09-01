import { Redirect, Slot } from 'expo-router'
import { useAuth } from '@clerk/expo'
import AppSkeleton from '../../components/skeletons/AppSkeleton.jsx'

export default function AuthRoutesLayout() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) return <AppSkeleton />
  if (isSignedIn) return <Redirect href="/" />

  return <Slot />
}