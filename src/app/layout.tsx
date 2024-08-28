import { config } from "@/config";
import { cookieToInitialState } from "@account-kit/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Embedded Accounts Getting Started",
  description: "Embedded Accounts Quickstart Guide",
};

// [!region root-layout]
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // hydrate the initial state on the client
  const initialState = cookieToInitialState(
    config,
    headers().get("cookie") ?? undefined,
  );

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers initialState={initialState}>{children}</Providers>
      </body>
    </html>
  );
}
// [!endregion root-layout]
