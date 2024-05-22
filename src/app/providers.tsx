"use client";

import {
  AlchemyAccountProvider,
  AlchemyAccountsProviderProps,
} from "@alchemy/aa-alchemy/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, Suspense } from "react";
import { config, queryClient } from "@/config";
import { ThemeProvider } from "next-themes";

export const Providers = ({
  initialState,
  children,
}: PropsWithChildren<{
  initialState?: AlchemyAccountsProviderProps["initialState"];
}>) => {
  return (
    <ThemeProvider attribute="class">
      <Suspense>
        <QueryClientProvider client={queryClient}>
          <AlchemyAccountProvider
            config={config}
            queryClient={queryClient}
            initialState={initialState}
          >
            {children}
          </AlchemyAccountProvider>
        </QueryClientProvider>
      </Suspense>
    </ThemeProvider>
  );
};
