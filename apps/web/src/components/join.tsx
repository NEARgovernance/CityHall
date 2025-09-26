import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { DoorClosed, DoorOpen } from "lucide-react";

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
        <Button
          type="submit"
          disabled={isJoining || isMember}
          size="lg"
          className="relative overflow-hidden bg-[#00ec97] hover:bg-[#00d085] text-black font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
        >
          {isJoining ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              <span>Submitting proposal...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-lg">Register</span>
              <div className="relative flex items-center h-5 w-5">
                <DoorClosed className="absolute h-5 w-5 transition-opacity duration-300 group-hover:opacity-0" />
                <DoorOpen className="absolute h-5 w-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>
          )}

          {/* Shine effect */}
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </Button>
      </form>
    </div>
  );
}
