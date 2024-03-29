"use client";

import { ProfileCard } from "@/components/ProfileCard";
import { SignInCard } from "@/components/SignInCard";
import { useAuthenticateUser } from "@/queries/authenticateUser";
import { AlchemySigner } from "@alchemy/aa-alchemy";
import { useState } from "react";
import { TurnkeyIframe } from "../components/TurnkeyIframe";

export default function Home() {
  const [signer] = useState<AlchemySigner | undefined>(() => {
    if (typeof window === "undefined") return undefined;

    return new AlchemySigner({
      client: {
        connection: {
          rpcUrl: "/api/rpc",
        },
        iframeConfig: {
          iframeContainerId: "turnkey-iframe-container-id",
        },
      },
    });
  });

  const { user, account, isLoadingUser } = useAuthenticateUser(signer);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center">
      {isLoadingUser ? (
        // Loading spinner
        <div className="flex items-center justify-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
            role="status"
          ></div>
        </div>
      ) : user != null && account != null ? (
        <ProfileCard user={user} account={account} />
      ) : (
        <SignInCard signer={signer} />
      )}
      <TurnkeyIframe />
    </main>
  );
}
