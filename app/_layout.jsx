//app/_layout.jsx
import { ClerkProvider, useAuth } from '@clerk/expo'
import { tokenCache } from '@clerk/expo/token-cache'
import { Slot, Redirect, usePathname } from 'expo-router'
import { SafeAreaProvider } from "react-native-safe-area-context"
import SafeScreen from "../components/SafeScreen"
import { createContext, useContext, useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { ErrorDialogProvider } from '../components/ErrorDialog.jsx'
import PageLoader from '../components/PageLoader.jsx'

const ONBOARDING_KEY = 'derman-go-onboarding-complete'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

// Shared context so any screen can flip the onboarding flag
// and have OnboardingGate see it immediately.
const OnboardingContext = createContext(null)

export function useOnboarding() {
  const ctx = useContext(OnboardingContext)
  if (!ctx) throw new Error('useOnboarding must be used inside OnboardingGate')
  return ctx
}

function OnboardingGate({ children }) {
  const [hasFinishedOnboarding, setHasFinishedOnboarding] = useState(null)

  const pathname = usePathname()
  const { isSignedIn, isLoaded } = useAuth()

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

  const completeOnboarding = async () => {
    try {
      await SecureStore.setItemAsync(ONBOARDING_KEY, 'true')
    } finally {
      // Update state immediately — don't wait on a re-read
      setHasFinishedOnboarding(true)
    }
  }

if (hasFinishedOnboarding === null || !isLoaded) {
    return <PageLoader />
}

  if (!hasFinishedOnboarding && pathname !== '/getStarted') {
    return <Redirect href="/getStarted" />
  }

  return (
    <OnboardingContext.Provider value={{ hasFinishedOnboarding, completeOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  )
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