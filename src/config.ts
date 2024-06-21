import {
  SupportedAccountTypes,
  cookieStorage,
  createConfig,
} from "@account-kit/core";
import { type AlchemyAccountsProviderProps } from "@account-kit/react";
import { arbitrumSepolia } from "@alchemy/aa-core";
import { QueryClient } from "@tanstack/react-query";

// [!region create-accounts-config]
// NOTE: feel free to change the chain here!
export const chain = arbitrumSepolia;
export const config = createConfig({
  // this is for requests to the specific chain RPC
  rpcUrl: "/api/rpc/chain/" + chain.id,
  signerConnection: {
    // this is for Alchemy Signer requests
    rpcUrl: "/api/rpc/",
  },
  chain,
  ssr: true,
  storage: cookieStorage,
});
// [!endregion create-accounts-config]

// [!region other-config-vars]
// There are 2 sections which means: email will be the top portion of the Modal
// and the other 2 will fall below a divider line. Each section is separated by
// an -or- divider
export const uiConfig: AlchemyAccountsProviderProps["uiConfig"] = {
  auth: {
    sections: [
      [{ type: "email" }],
      [{ type: "passkey" }, { type: "injected" }],
    ],
    // after a user signs up, this will prompt the user to add a passkey
    // to their account
    addPasskeyOnSignup: true,
  },
};
// provide a query client for use by the alchemy accounts provider
export const queryClient = new QueryClient();
// configure the account type we wish to use once
export const accountType: SupportedAccountTypes = "MultiOwnerModularAccount";
// setup the gas policy for sponsoring transactions
export const gasManagerConfig = {
  policyId: process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID!,
};
// additional options for our account client
export const accountClientOptions = {
  txMaxRetries: 20,
};
// [!endregion other-config-vars]
