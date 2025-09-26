import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const DAO_CONTRACT = "cityhall.sputnik-dao.near";

export function Join() {
  const [policy, setPolicy] = useState<any>(null);
  const [isMember, setIsMember] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const nearClient = authClient.near.getNearClient();

  useEffect(() => {
    nearClient
      .view({ contractId: DAO_CONTRACT, methodName: "get_policy" })
      .then((policy) => setPolicy(policy))
      .catch(() => setPolicy(null));
  }, []);

  const deposit = policy?.proposal_bond ?? "";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accountId = authClient.near.getAccountId();
    if (!accountId) {
      alert("Please sign in first");
      return;
    }

    setIsJoining(true);

    try {
      await nearClient.sendTx({
        receiverId: DAO_CONTRACT,
        actions: [
          nearClient.actions.functionCall({
            methodName: "add_proposal",
            args: {
              proposal: {
                description: `add ${accountId}`,
                kind: {
                  AddMemberToRole: {
                    member_id: accountId,
                    role: "Requestor",
                  },
                },
              },
            },
            gas: "30000000000000",
            deposit: deposit,
          }),
        ],
      });

      alert("Proposal submitted successfully!");
    } catch (error: any) {
      console.error("Full error object:", error);

      if (error?.message?.includes("Not enough balance")) {
        alert("Insufficient account balance");
      } else {
        alert(
          `Failed to create proposal: ${error?.message || "Please try again."}`
        );
      }
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex gap-2">
        <Button type="submit" disabled={isJoining || isMember}>
          {isJoining ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Submitting proposal...</span>
            </div>
          ) : (
            "Join"
          )}
        </Button>
      </form>
    </div>
  );
}
