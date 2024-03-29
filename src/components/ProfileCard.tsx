"use client";

import { MultiOwnerModularAccount } from "@alchemy/aa-accounts";
import { User, createAlchemySmartAccountClient } from "@alchemy/aa-alchemy";
import { useState } from "react";
import { optimismSepolia } from "viem/chains";
import { SendUOButton } from "./SendUOButton";

export interface ProfileCardProps {
  user: User;
  account: MultiOwnerModularAccount;
}

export const ProfileCard = ({ user, account }: ProfileCardProps) => {
  const [provider] = useState(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const gasManagerPolicyId =
      process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID;

    if (gasManagerPolicyId == null) {
      throw new Error("Missing gas policy ID");
    }

    return createAlchemySmartAccountClient({
      chain: optimismSepolia,
      rpcUrl: "/api/rpc",
      account,
      gasManagerConfig: {
        policyId: gasManagerPolicyId,
      },
    });
  });

  return (
    <div className="flex flex-row bg-slate-500 rounded-lg p-4">
      <div className="flex flex-col gap-4">
        <div className="text-lg">Welcome to your profile!</div>
        <div className="flex flex-col gap-2">
          <strong>Account Address</strong>
          <code className="break-words">
            <a
              href={`${optimismSepolia.blockExplorers.default.url}/address/${provider?.account.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center hover:bg-slate-700 p-2 rounded-lg transition ease-in-out duration-500 transform hover:scale-105"
            >
              {provider?.account.address}
            </a>
          </code>
        </div>
        <div className="flex flex-col gap-2">
          <strong>Email</strong>
          <code className="break-words">{user?.email}</code>
        </div>
        <SendUOButton provider={provider} />
      </div>
    </div>
  );
};
