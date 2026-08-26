import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Redirect } from 'expo-router';

const ONBOARDING_KEY = 'derman-go-onboarding-complete';

export default function AppEntry() {
  const [hasFinishedOnboarding, setHasFinishedOnboarding] = useState(null);

  useEffect(() => {
    const loadOnboardingState = async () => {
      try {
        const savedState = await SecureStore.getItemAsync(ONBOARDING_KEY);
        setHasFinishedOnboarding(savedState === 'true');
      } catch {
        setHasFinishedOnboarding(false);
      }
    };

    loadOnboardingState();
  }, []);

  if (hasFinishedOnboarding === null) return null;

  return <Redirect href={hasFinishedOnboarding ? '/sign-in' : '/getStarted'} />;
}
