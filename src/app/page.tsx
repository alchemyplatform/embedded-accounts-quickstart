"use client";

import { SignInCard } from "../components/SignInCard";
import { TurnkeyIframe } from "../components/TurnkeyIframe";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center">
      <SignInCard />
      <TurnkeyIframe />
    </main>
  );
}
