import { z } from "zod";
import { AlchemyGasManagerConfig } from "@alchemy/aa-alchemy";
import {
  SupportedAccountTypes,
  cookieStorage,
  createConfig,
} from "@alchemy/aa-alchemy/config";
import {
  SmartAccountClientOptsSchema,
  arbitrumSepolia,
} from "@alchemy/aa-core";
import { QueryClient } from "@tanstack/react-query";

export const chain = arbitrumSepolia;

export const queryClient = new QueryClient();
export const config = createConfig({
  rpcUrl: "/api/rpc/chain/" + chain.id,
  signerConnection: {
    rpcUrl: "/api/rpc/",
  },
  chain,
  ssr: true,
  storage: cookieStorage,
});

export const accountType: SupportedAccountTypes = "MultiOwnerModularAccount";
export const gasManagerConfig: AlchemyGasManagerConfig = {
  policyId: process.env.NEXT_PUBLIC_ALCHEMY_GAS_MANAGER_POLICY_ID!,
};
type SmartAccountClienOptions = z.infer<typeof SmartAccountClientOptsSchema>;
export const accountClientOptions: Partial<SmartAccountClienOptions> = {
  txMaxRetries: 20,
};
