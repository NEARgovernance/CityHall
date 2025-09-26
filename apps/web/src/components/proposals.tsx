import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const DAO_CONTRACT = "cityhall.sputnik-dao.near";

export function Proposals() {
  const [proposals, setProposals] = useState<any>(null);
  const nearClient = authClient.near.getNearClient();

  useEffect(() => {
    nearClient
      .view({
        contractId: DAO_CONTRACT,
        methodName: "get_proposals",
        args: {
          from_index: 0,
          limit: 50,
        },
      })
      .then((proposals) => setProposals(proposals))
      .catch((error) => {
        console.error("Error fetching proposals:", error);
        setProposals(null);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Proposals</h2>
      {proposals ? (
        proposals.length > 0 ? (
          <ul className="space-y-4">
            {proposals.map((proposal: any) => (
              <li key={proposal.id} className="p-4 border rounded-lg">
                <h3 className="text-xl font-semibold mb-2">
                  Proposal #{proposal.id}
                </h3>
                <p className="mb-2">{proposal.description}</p>
                <p className="text-sm text-gray-500">
                  Status: {proposal.status}
                </p>
                <p className="text-sm text-gray-500">
                  Proposer: {proposal.proposer}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No proposals found.</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
