"use client";

import { useAuthenticateUser } from "@/queries/authenticateUser";
import { AlchemySigner } from "@alchemy/aa-alchemy";
import { useCallback, useState } from "react";

export interface LoginCardProps {
  signer: AlchemySigner | undefined;
}

export const SignInCard = ({ signer }: LoginCardProps) => {
  const [email, setEmail] = useState<string>("");
  const onEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    []
  );

  const { isAuthenticatingUser, authenticateUser } =
    useAuthenticateUser(signer);

  return (
    <div className="flex flex-row bg-slate-500 rounded-lg p-4 justify-center min-w-80">
      {isAuthenticatingUser ? (
        <div>Check Your Email!</div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="text-lg">Sign in to the Embedded Accounts Demo!</div>
          <div className="flex flex-row justify-between gap-4">
            <input
              className="dark:bg-slate-700 dark:text-white p-2 rounded-lg"
              type="email"
              value={email}
              onChange={onEmailChange}
            />
            <button
              className="w-full hover:bg-slate-700 p-2 rounded-lg transition ease-in-out duration-500 transform hover:scale-105"
              onClick={() => authenticateUser({ type: "email", email })}
            >
              Sign in
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
