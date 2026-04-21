"use client";

import type { ReactNode } from "react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Clock3,
  Mail,
  MessageSquareText,
  Send,
  Trash2,
  UserRound,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { QueryTypes } from "../columns";

interface QuerySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  query: QueryTypes | null;
  onDelete: (query: QueryTypes) => void;
}

const avatarColours: Record<string, string> = {
  A: "bg-rose-100 text-rose-700 ring-rose-200",
  B: "bg-orange-100 text-orange-700 ring-orange-200",
  C: "bg-amber-100 text-amber-700 ring-amber-200",
  D: "bg-yellow-100 text-yellow-700 ring-yellow-200",
  E: "bg-lime-100 text-lime-700 ring-lime-200",
  F: "bg-green-100 text-green-700 ring-green-200",
  G: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  H: "bg-teal-100 text-teal-700 ring-teal-200",
  I: "bg-cyan-100 text-cyan-700 ring-cyan-200",
  J: "bg-sky-100 text-sky-700 ring-sky-200",
  K: "bg-blue-100 text-blue-700 ring-blue-200",
  L: "bg-indigo-100 text-indigo-700 ring-indigo-200",
  M: "bg-violet-100 text-violet-700 ring-violet-200",
  N: "bg-fuchsia-100 text-fuchsia-700 ring-fuchsia-200",
  O: "bg-pink-100 text-pink-700 ring-pink-200",
  default: "bg-slate-100 text-slate-700 ring-slate-200",
};

function getAvatarClass(name: string) {
  const key = name?.[0]?.toUpperCase() ?? "default";
  return avatarColours[key] ?? avatarColours.default;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

function getRelativeTime(createdAt?: string) {
  if (!createdAt) {
    return "Unknown time";
  }

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "Unknown time";
  }

  return formatDistanceToNow(date, { addSuffix: true });
}

function getAbsoluteTime(createdAt?: string) {
  if (!createdAt) {
    return "Unknown date";
  }

  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return format(date, "PPP 'at' p");
}

function getReplyLink(query: QueryTypes | null) {
  if (!query) {
    return "#";
  }

  const subject = query.subject?.trim()
    ? `Re: ${query.subject.trim()}`
    : "Re: Website Query";

  return `mailto:${query.email}?subject=${encodeURIComponent(subject)}`;
}

export default function QuerySheet({
  open,
  onOpenChange,
  query,
  onDelete,
}: QuerySheetProps) {
  const name = query?.name || "Unknown sender";
  const subject = query?.subject?.trim() || "No subject provided";
  const message = query?.message?.trim() || "No message content provided.";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full gap-0 overflow-hidden border-l-0 bg-slate-100 p-0 shadow-2xl sm:max-w-xl lg:max-w-2xl"
      >
        <SheetHeader className="relative overflow-hidden border-b border-sky-400/30 bg-sky-700 px-6 py-6 text-left text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_35%)]" />
          <div className="relative flex items-start gap-4">
            <Avatar className="h-14 w-14 ring-4 ring-white/25">
              <AvatarFallback
                className={`text-base font-semibold ${getAvatarClass(name)}`}
              >
                {getInitials(name) || "Q"}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge className="border-white/20 bg-white/15 text-white shadow-none">
                  Live Query
                </Badge>
                <Badge className="border-white/20 bg-slate-950/20 text-white shadow-none">
                  # {query?.id ?? "--"}
                </Badge>
              </div>
              <SheetTitle className="text-2xl font-semibold tracking-tight text-white">
                {name}
              </SheetTitle>
              <SheetDescription className="mt-1 text-sm text-sky-50">
                Opened {getRelativeTime(query?.createdAt)}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
          <div className="space-y-4">
            <Card className="overflow-hidden rounded-2xl border-slate-200/80 bg-white/95 py-0 shadow-sm">
              <CardContent className="grid gap-4 p-5 sm:grid-cols-2">
                <DetailItem
                  icon={<UserRound className="size-4 text-sky-600" />}
                  label="Sender Name"
                  value={name}
                />
                <DetailItem
                  icon={<Mail className="size-4 text-sky-600" />}
                  label="Sender Email"
                  value={query?.email || "Not provided"}
                />
                <DetailItem
                  icon={<Send className="size-4 text-emerald-600" />}
                  label="Recipient"
                  value={query?.sender || "Not provided"}
                />
                <DetailItem
                  icon={<Clock3 className="size-4 text-amber-600" />}
                  label="Received"
                  value={getAbsoluteTime(query?.createdAt)}
                />
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200/80 bg-white/95 py-0 shadow-sm">
              <CardContent className="p-5">
                <SectionLabel
                  icon={<MessageSquareText className="size-4 text-sky-600" />}
                  title="Subject"
                />
                <div className="mt-3 rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-4">
                  <p className="text-sm font-medium leading-6 text-slate-900">
                    {subject}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-slate-200/80 bg-white/95 py-0 shadow-sm">
              <CardContent className="p-5">
                <SectionLabel
                  icon={
                    <MessageSquareText className="size-4 text-emerald-600" />
                  }
                  title="Message"
                />
                <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700 [overflow-wrap:anywhere]">
                    {message}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        <SheetFooter className="border-t border-slate-200 bg-white/95 px-4 py-4 sm:flex-row sm:justify-between sm:px-6">
          <Button
            asChild
            className="bg-sky-600 text-white hover:bg-sky-700"
            disabled={!query}
          >
            <a href={getReplyLink(query)}>
              <Mail className="size-4" />
              Reply by Email
            </a>
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={() => query && onDelete(query)}
            disabled={!query}
          >
            <Trash2 className="size-4" />
            Delete Query
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function SectionLabel({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
        {icon}
      </span>
      <span>{title}</span>
    </div>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-slate-500 uppercase">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-3 break-words text-sm font-medium leading-6 text-slate-900">
        {value}
      </p>
    </div>
  );
}
