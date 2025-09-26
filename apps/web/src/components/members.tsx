import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

const DAO_CONTRACT = "cityhall.sputnik-dao.near";
interface Group {
  name: string;
  members: string[];
}

export function Members() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const nearClient = authClient.near.getNearClient();

  useEffect(() => {
    nearClient
      .view({
        contractId: DAO_CONTRACT,
        methodName: "get_policy",
      })
      .then((policy: any) => {
        const parsedGroups = policy.roles
          .filter((role: any) => role.kind.Group)
          .map((role: any) => ({
            name: role.name,
            members: role.kind.Group,
          }));
        setGroups(parsedGroups);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching policy:", error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading members...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Groups</h2>
      {groups.length > 0 ? (
        <div className="space-y-6">
          {groups.map((group) => (
            <div key={group.name} className="p-4 border rounded-lg">
              <h3 className="text-xl font-semibold mb-3">{group.name}</h3>
              {group.members.length > 0 ? (
                <ul className="space-y-2">
                  {group.members.map((member) => (
                    <li key={member} className="text-muted-foreground">
                      {member}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">
                  No members in this group
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No groups found.</p>
      )}
    </div>
  );
}
