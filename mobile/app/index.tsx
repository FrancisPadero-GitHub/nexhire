/**
 * Root Index — App entry point that redirects to onboarding.
 * In a production app, this would check auth state and route accordingly.
 */
import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    // Redirect to onboarding on app launch
    // In production: check AsyncStorage for onboarding completion + auth token
    const timeout = setTimeout(() => {
      router.replace("/onboarding");
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return null;
}
