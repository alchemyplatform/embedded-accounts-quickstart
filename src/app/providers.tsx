"use client";

import { config, queryClient } from "@/config";
import {
  AlchemyAccountProvider,
  AlchemyAccountsProviderProps,
} from "@account-kit/react";
import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

// [!region providers]
export const Providers = ({
  initialState,
  children,
}: PropsWithChildren<{
  initialState?: AlchemyAccountsProviderProps["initialState"];
}>) => {
  // providers:
  // 1. theme provider makes it easy to switch between light and dark mode
  // 2. alchemy account provider gives us access to react hooks everywhere
  return (
    <ThemeProvider attribute="class">
      <AlchemyAccountProvider
        config={config}
        queryClient={queryClient}
        initialState={initialState}
      >
        {children}
      </AlchemyAccountProvider>
    </ThemeProvider>
  );
};
// [!endregion providers]
