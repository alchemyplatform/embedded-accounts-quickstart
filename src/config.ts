import { SmartAccountClientOptsSchema } from "@aa-sdk/core";
import { SupportedAccountTypes } from "@account-kit/core";
import { arbitrumSepolia } from "@account-kit/infra";
import { cookieStorage, createConfig } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";
import { z } from "zod";

// [!region create-accounts-config]
// NOTE: feel free to change the chain here!
export const chain = arbitrumSepolia;
export const config = createConfig(
  {
    // this is for requests to the specific chain RPC
    rpcUrl: "/api/rpc/chain/" + chain.id,
    signerConnection: {
      // this is for Alchemy Signer requests
      rpcUrl: "/api/rpc/",
    },
    chain,
    ssr: true,
    storage: cookieStorage,
    // setup the gas policy for sponsoring transactions
    policyId: process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID!,
  },
  {
    auth: {
      sections: [[{ type: "email" }], [{ type: "passkey" }]],
    },
  },
);
// [!endregion create-accounts-config]

// [!region other-config-vars]
// provide a query client for use by the alchemy accounts provider
export const queryClient = new QueryClient();
// configure the account type we wish to use once
export const accountType: SupportedAccountTypes = "MultiOwnerModularAccount";

// additional options for our account client
type SmartAccountClientOptions = z.infer<typeof SmartAccountClientOptsSchema>;
export const accountClientOptions: Partial<SmartAccountClientOptions> = {
  txMaxRetries: 20,
};
// [!endregion other-config-vars]
