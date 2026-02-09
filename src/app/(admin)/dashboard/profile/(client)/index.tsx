"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  LogOut,
  User,
  Mail,
  BadgeCheck,
  BadgeX,
  Copy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Adjust these imports to your project
import { authClient, signOut } from "@/lib/auth-client";

// Session Types
type UserSessionTypes = {
  session: {
    id: string;
    token: string;
    userId: string;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
    expiresAt: Date | string;
  };
  user: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: Date | string;
    updatedAt: Date | string;
  };
};

function toTextDate(value?: Date | string | null) {
  if (!value) return "—";
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString();
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // ignore
  }
}

export default function Profile() {
  // router
  const router = useRouter();
  // session
  const session = authClient.useSession();
  // loading state
  const loading = session.isPending;
  // get the session data
  const data = (session.data ?? null) as UserSessionTypes | null;
  // get the user
  const user = data?.user;

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };
  return (
    <TooltipProvider>
      <main className="min-h-screen bg-background">
        <div className="mx-auto w-full max-w-6xl px-4 py-10">
          {/* Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                <h1 className="text-2xl font-semibold tracking-tight">
                  Admin Profile
                </h1>
                {!loading ? (
                  <Badge variant="secondary" className="rounded-full">
                    Single Admin
                  </Badge>
                ) : (
                  <Skeleton className="h-5 w-20 rounded-full" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                View your account and session details. Access is restricted to
                the single admin.
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                className=" bg-sky-700 text-white hover:bg-sky-600 hover:text-white"
                variant="outline"
                onClick={handleLogout}
                disabled={loading}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Loading state */}
          {loading ? (
            <div className="grid gap-6 md:grid-cols-1">
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-36" />
                  <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            </div>
          ) : (
            // Content
            <div className="grid gap-6 md:grid-cols-1">
              {/* Account Card */}
              <Card className="overflow-hidden">
                <CardHeader className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-muted-foreground" />
                    Account
                  </CardTitle>
                  <CardDescription>Your personal information.</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 rounded-xl border bg-card p-4">
                    <div className="grid h-11 w-11 place-items-center rounded-full border bg-muted">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {user?.name ?? "—"}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user?.email ?? "—"}
                      </p>
                    </div>
                    <div className="ml-auto">
                      {user?.emailVerified ? (
                        <Badge className="gap-1">
                          <BadgeCheck className="h-3.5 w-3.5" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <BadgeX className="h-3.5 w-3.5" />
                          Not verified
                        </Badge>
                      )}
                    </div>
                  </div>

                  <InfoRow
                    icon={<Mail className="h-4 w-4 text-muted-foreground" />}
                    label="Email"
                    value={user?.email ?? "—"}
                    copyValue={user?.email}
                  />

                  <InfoRow
                    label="User ID"
                    value={user?.id ?? "—"}
                    copyValue={user?.id}
                  />
                  <InfoRow
                    label="Created"
                    value={toTextDate(user?.createdAt)}
                  />
                  <InfoRow
                    label="Updated"
                    value={toTextDate(user?.updatedAt)}
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </TooltipProvider>
  );
}

function InfoRow({
  label,
  value,
  icon,
  copyValue,
  helper,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  copyValue?: string | null;
  helper?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl border bg-card p-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          {icon}
          <p className="text-xs font-medium text-muted-foreground">{label}</p>

          {helper ? (
            <Badge variant="outline" className="ml-1 rounded-full text-[10px]">
              info
            </Badge>
          ) : null}
        </div>

        <p className="mt-1 break-words text-sm">{value}</p>

        {helper ? (
          <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
        ) : null}
      </div>

      {copyValue ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0"
              onClick={() => copyToClipboard(copyValue)}
              aria-label={`Copy ${label}`}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy</TooltipContent>
        </Tooltip>
      ) : null}
    </div>
  );
}
