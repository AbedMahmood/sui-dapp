import { Transaction } from "@mysten/sui/transactions";
import { Button } from "@radix-ui/themes";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import { DEVNET_PACKAGE_ID } from "../utils/constants";
import "../assets/createObject.css";

export default function CreateObject({
  onCreated = () => {},
}: {
  onCreated?: (id: string) => void;
}) {
  const counterPackageId = DEVNET_PACKAGE_ID;
  const suiClient = useSuiClient();

  const { mutate: signAndExecute, isPending } = useSignAndExecuteTransaction();
  const [error, setError] = useState<string | null>(null);
  const [waitingForTxn, setWaitingForTxn] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<any | null>(null);

  async function create() {
    setError(null);
    setWaitingForTxn(true);

    try {
      const tx = new Transaction();

      tx.moveCall({
        target: `${counterPackageId}::object::create`,
        arguments: [],
      });

      signAndExecute(
        { transaction: tx },
        {
          onSuccess: async ({ digest }) => {
            try {
              const { effects } = await suiClient.waitForTransaction({
                digest,
                options: {
                  showEffects: true,
                  showObjectChanges: true,
                  showEvents: true,
                  showBalanceChanges: true,
                },
              });

              if (effects?.status.status === "success") {
                const objectId = effects.created?.[0]?.reference?.objectId;
                if (objectId) {
                  onCreated(objectId);
                } else {
                  setError("Created object id not found in transaction effects.");
                }
                setTransactionDetails(effects);
              } else {
                setError(`Transaction failed: ${effects?.status.error || "Unknown error"}`);
              }
            } catch (e) {
              setError(`Error fetching transaction effects: ${e instanceof Error ? e.message : String(e)}`);
            } finally {
              setWaitingForTxn(false);
            }
          },
          onError: (e) => {
            setError(`Transaction failed: ${e.message || e.toString()}`);
            setWaitingForTxn(false);
          },
        }
      );
    } catch (e) {
      setError(`Unexpected error: ${e instanceof Error ? e.message : String(e)}`);
      setWaitingForTxn(false);
    }
  }

  return (
    <div className="transaction-wrapper">
      {!transactionDetails ? (
        <div className="create-section">
          <Button
            size="3"
            onClick={create}
            disabled={waitingForTxn || isPending}
            variant="solid"
          >
            {waitingForTxn || isPending ? (
              <ClipLoader size={20} color="#fff" />
            ) : (
              "Create Object"
            )}
          </Button>
        </div>
      ) : (
        <div className="transaction-section">
          <h2 className="transaction-title">Transaction Details</h2>
          <pre className="transaction-details">
            {JSON.stringify(transactionDetails, null, 2)}
          </pre>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
