"use client";

import { LogInCard } from "@/components/login-card";
import { ProfileCard } from "@/components/profile-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import ThemeSwitch from "@/components/ui/theme-switch";
import { useSignerStatus } from "@alchemy/aa-alchemy/react";

// [!region using-status]
export default function Home() {
  // use the various signer statuses to determine if we are:
  // loading - waiting for a request to resolve
  // connected - the user signed in with an email tied to a smart account
  // unconnected - we need to provide a login UI for the user to sign in
  const { isInitializing, isAuthenticating, isConnected, status } =
    useSignerStatus();
  const isLoading =
    isInitializing || (isAuthenticating && status !== "AWAITING_EMAIL_AUTH");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      {isLoading ? (
        <LoadingSpinner />
      ) : isConnected ? (
        <ProfileCard />
      ) : (
        <LogInCard />
      )}
      <ThemeSwitch />
    </main>
  );
}
// [!endregion using-status]
