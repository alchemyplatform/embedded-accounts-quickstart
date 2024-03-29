import { useSendUserOperation } from "@/queries/sendUserOperation";
import { MultiOwnerModularAccount } from "@alchemy/aa-accounts";
import { AlchemySmartAccountClient } from "@alchemy/aa-alchemy";
import { Chain, Transport } from "viem";
import { optimismSepolia } from "viem/chains";

export interface SendUOButtonProps {
  provider:
    | AlchemySmartAccountClient<Transport, Chain, MultiOwnerModularAccount>
    | undefined;
}

export const SendUOButton = ({ provider }: SendUOButtonProps) => {
  const {
    sendUserOperation,
    txnHash,
    isPendingUserOperation,
    isSendUserOperationError,
  } = useSendUserOperation(provider);

  return (
    <div className="flex flex-col">
      {txnHash == null && !isPendingUserOperation && (
        <button
          className="w-full hover:bg-slate-700 p-2 rounded-lg transition ease-in-out duration-500 transform hover:scale-105"
          onClick={() => sendUserOperation()}
        >
          {isSendUserOperationError
            ? "Error sending money. Try again!"
            : "Send money to Vitalik!"}
        </button>
      )}
      {isPendingUserOperation && (
        <div className="w-full flex flex-row items-center justify-center gap-2 bg-slate-700 p-2 rounded-lg">
          <div>Sending...</div>
          <div className="flex items-center justify-center">
            <div
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            ></div>
          </div>
        </div>
      )}
      {txnHash != null && (
        <a
          href={`${optimismSepolia.blockExplorers.default.url}/tx/${txnHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full text-center hover:bg-slate-700 p-2 rounded-lg transition ease-in-out duration-500 transform hover:scale-105"
        >
          See Txn Details
        </a>
      )}
    </div>
  );
};
