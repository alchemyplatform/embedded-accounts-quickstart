"use client";

import { useAuthenticate, useSignerStatus } from "@alchemy/aa-alchemy/react";
import { FormEvent, useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

export const LogInCard = () => {
  const [email, setEmail] = useState<string>("");
  const onEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    [],
  );
  // [!region authenticating]
  const { authenticate } = useAuthenticate();
  const login = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    authenticate({ type: "email", email });
  };

  const { status } = useSignerStatus();
  const isAwaitingEmail = status === "AWAITING_EMAIL_AUTH";
  // [!endregion authenticating]

  return (
    <Card>
      {isAwaitingEmail ? (
        <div className="text-[18px] font-semibold">Check your email!</div>
      ) : (
        <form className="flex flex-col gap-8" onSubmit={login}>
          <div className="text-[18px] font-semibold">
            Log in to the Embedded Accounts Demo!
          </div>
          <div className="flex flex-col justify-between gap-6">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={onEmailChange}
            />
            <Button type="submit">Log in</Button>
          </div>
        </form>
      )}
    </Card>
  );
};
