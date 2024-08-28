"use client";

import { ProfileCard } from "@/components/profile-card";
import ThemeSwitch from "@/components/ui/theme-switch";
import { useUser } from "@account-kit/react";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const user = useUser();

  if (!user) {
    redirect("/");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-24">
      <ProfileCard />
      <ThemeSwitch />
    </main>
  );
}
