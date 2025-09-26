import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { User } from "lucide-react";

interface Profile {
  name?: string;
  description?: string;
  image?: {
    url?: string;
    ipfs_cid?: string;
  };
  backgroundImage?: {
    url?: string;
    ipfs_cid?: string;
  };
  linktree?: Record<string, string>;
}

export default function UserMenu() {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nearProfile, setNearProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      try {
        const { data: sessionData } = await authClient.getSession();
        setSession(sessionData);

        if (sessionData) {
          try {
            const { data: response } = await authClient.near.getProfile();
            setNearProfile(response);
          } catch (err) {
            console.log("No NEAR profile found for user");
            setNearProfile(null);
          }
        }
      } catch (error) {
        console.error("Failed to fetch session:", error);
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessionAndProfile();
  }, []);

  if (isLoading) {
    return <Skeleton className="h-9 w-32" />;
  }

  if (!session) {
    return (
      <Button variant="outline" asChild className="min-h-9 min-w-[80px]">
        <Link to="/login">Sign In</Link>
      </Button>
    );
  }

  // Get avatar URL
  const avatarUrl = nearProfile?.image?.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${nearProfile.image.ipfs_cid}`
    : nearProfile?.image?.url || null;

  // Get account ID from session
  const accountId = session.user.name || session.user.email || "Unknown";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 min-h-9 px-3"
        >
          {/* Avatar */}
          <div className="h-5 w-5 rounded-full overflow-hidden bg-muted flex items-center justify-center flex-shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={accountId}
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-3 w-3 text-muted-foreground" />
            )}
          </div>

          {/* Account ID */}
          <span className="text-sm font-medium truncate max-w-[120px]">
            {accountId}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-4">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Account Info */}
        <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
          <span className="text-sm font-medium">{accountId}</span>
          {nearProfile?.name && (
            <span className="text-xs text-muted-foreground">
              {nearProfile.name}
            </span>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Sign Out */}
        <DropdownMenuItem
          className="text-destructive focus:text-destructive cursor-pointer"
          onClick={async () => {
            try {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: async () => {
                    await authClient.near.disconnect();
                    navigate({ to: "/" });
                  },
                },
              });
            } catch (error) {
              console.error("Sign out error:", error);
              navigate({ to: "/" });
            }
          }}
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
