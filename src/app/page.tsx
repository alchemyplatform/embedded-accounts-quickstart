"use client";

import { LogInCard } from "@/components/login-card";
import { ProfileCard } from "@/components/profile-card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import ThemeSwitch from "@/components/ui/theme-switch";
import { useSignerStatus } from "@alchemy/aa-alchemy/react";

export default function Home() {
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
