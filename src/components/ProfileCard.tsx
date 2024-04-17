"use client";

import { MultiOwnerModularAccount } from "@alchemy/aa-accounts";
import { User } from "@alchemy/aa-alchemy";
import { useSmartAccountClient } from "@alchemy/aa-alchemy/react";
import { SendUOButton } from "./SendUOButton";

export interface ProfileCardProps {
  user: User;
  account: MultiOwnerModularAccount;
}

export const ProfileCard = ({ user, account }: ProfileCardProps) => {
  const { client } = useSmartAccountClient({
    type: "MultiOwnerModularAccount",
  });

  return (
    <div className="flex flex-row rounded-lg bg-white p-10 dark:bg-[#0F172A]">
      <div className="flex flex-col gap-8">
        <div className="text-lg font-semibold">Welcome to your profile!</div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div>Account address</div>
            <div className="text-wrap rounded-lg p-3 dark:bg-[#1F2937] dark:text-[#CBD5E1]">
              {client?.account.address}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div>Email</div>
            <div className="text-wrap rounded-lg p-3 dark:bg-[#1F2937] dark:text-[#CBD5E1]">
              {user?.email}
            </div>
          </div>
        </div>
        <SendUOButton />
      </div>
    </div>
  );
};
