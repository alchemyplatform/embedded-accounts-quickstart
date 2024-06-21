"use client";

import { useAuthModal, useSignerStatus } from "@account-kit/react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export const LogInCard = () => {
  // [!region authenticating]
  const { openAuthModal } = useAuthModal();
  const { status } = useSignerStatus();
  const isAwaitingEmail = status === "AWAITING_EMAIL_AUTH";
  // [!endregion authenticating]

  return (
    <Card>
      {isAwaitingEmail ? (
        <div className="text-[18px] font-semibold">Check your email!</div>
      ) : (
        <form className="flex flex-col gap-8" onSubmit={openAuthModal}>
          <div className="text-[18px] font-semibold">
            Log in to the Embedded Accounts Demo!
          </div>
          <Button type="submit">Log in</Button>
        </form>
      )}
    </Card>
  );
};
