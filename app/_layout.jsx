import { ClerkProvider, useAuth } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'
import { Slot, Redirect, usePathname } from 'expo-router'
import { SafeAreaProvider } from "react-native-safe-area-context"
import SafeScreen from "../components/SafeScreen"
import { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { ErrorDialogProvider } from '../components/ErrorDialog.jsx'
import AppSkeleton from '../components/skeletons/AppSkeleton.jsx'

const ONBOARDING_KEY = 'derman-go-onboarding-complete'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

function OnboardingGate({ children }) {
  const [hasFinishedOnboarding, setHasFinishedOnboarding] = useState(null)

  const pathname = usePathname()

  const { isSignedIn, isLoaded } = useAuth()

  useEffect(() => {
    console.log(
      'App start — isLoaded:',
      isLoaded,
      'isSignedIn:',
      isSignedIn
    )
  }, [isLoaded, isSignedIn])

  useEffect(() => {
    const loadOnboardingState = async () => {
      try {
        const savedState = await SecureStore.getItemAsync(ONBOARDING_KEY)

        setHasFinishedOnboarding(savedState === 'true')
      } catch {
        setHasFinishedOnboarding(false)
      }
    }

    loadOnboardingState()
  }, [])

  // Show skeleton while Clerk or onboarding state is loading
  if (hasFinishedOnboarding === null || !isLoaded) {
    return <AppSkeleton />
  }

  // User hasn't completed onboarding
  if (!hasFinishedOnboarding && pathname !== '/getStarted') {
    return <Redirect href="/getStarted" />
  }

  return children
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeScreen>

        <ClerkProvider
          publishableKey={publishableKey}
          tokenCache={tokenCache}
        >

          <ErrorDialogProvider>

            <OnboardingGate>
              <Slot />
            </OnboardingGate>

          </ErrorDialogProvider>

        </ClerkProvider>

      </SafeScreen>
    </SafeAreaProvider>
  )
}