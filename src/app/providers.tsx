"use client";

import {
  AlchemyAccountProvider,
  AlchemyAccountsProviderProps,
} from "@alchemy/aa-alchemy/react";
import { PropsWithChildren } from "react";
import { config, queryClient } from "@/config";
import { ThemeProvider } from "next-themes";

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
