"use client";

import { formatDistanceToNow } from "date-fns";
import { Mail, ArrowRight, Inbox, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { QueryTypes } from "../../(queries-page)/queries/columns";

// Deterministic colour based on first letter of sender's name
const avatarColours: Record<string, string> = {
  A: "bg-rose-100 text-rose-600",
  B: "bg-orange-100 text-orange-600",
  C: "bg-amber-100 text-amber-600",
  D: "bg-yellow-100 text-yellow-600",
  E: "bg-lime-100 text-lime-600",
  F: "bg-green-100 text-green-600",
  G: "bg-emerald-100 text-emerald-600",
  H: "bg-teal-100 text-teal-600",
  I: "bg-cyan-100 text-cyan-600",
  J: "bg-sky-100 text-sky-600",
  K: "bg-blue-100 text-blue-600",
  L: "bg-indigo-100 text-indigo-600",
  M: "bg-violet-100 text-violet-600",
  N: "bg-purple-100 text-purple-600",
  O: "bg-fuchsia-100 text-fuchsia-600",
  P: "bg-pink-100 text-pink-600",
  default: "bg-slate-100 text-slate-600",
};

function getAvatarClass(name: string) {
  const key = name?.[0]?.toUpperCase() ?? "default";
  return avatarColours[key] ?? avatarColours.default;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

interface Props {
  messages: QueryTypes[];
}

export default function RecentMessages({ messages }: Props) {
  return (
    <section
      className="py-3 border-opacity-20 
        transform transition-all duration-300 
     shadow-lg relative rounded-2xl border border-slate-200 bg-white overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sky-50">
            <Mail size={16} className="text-sky-600" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Recent Messages
            </h2>
            <p className="text-xs text-slate-400">Latest queries from users</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {messages.length > 0 && (
            <Badge
              variant="secondary"
              className="bg-sky-50 text-sky-600 border-sky-100 text-xs font-medium"
            >
              {messages.length} new
            </Badge>
          )}
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-white hover:text-white bg-gradient-to-tl from-sky-400 to-sky-500 text-xs gap-1"
          >
            <Link href="/dashboard/queries">
              View all <ArrowRight size={13} />
            </Link>
          </Button>
        </div>
      </div>

      {/* Body */}
      {messages.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="divide-y divide-slate-100">
          {messages.map((msg) => (
            <MessageRow key={msg.id} msg={msg} />
          ))}
        </ul>
      )}
    </section>
  );
}

function MessageRow({ msg }: { msg: QueryTypes }) {
  const timeAgo = formatDistanceToNow(new Date(msg.createdAt), {
    addSuffix: true,
  });

  return (
    <li className=" flex items-start gap-4 px-6 py-4 hover:bg-slate-50/70 transition-colors group">
      {/* Avatar */}
      <Avatar className="h-9 w-9 shrink-0 mt-0.5">
        <AvatarFallback
          className={`text-xs font-semibold ${getAvatarClass(msg.name)}`}
        >
          {getInitials(msg.name)}
        </AvatarFallback>
      </Avatar>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">
              {msg.name}
            </p>
            <p className="text-xs text-slate-400 truncate">{msg.email}</p>
          </div>
          <time className="text-xs text-slate-400 shrink-0 mt-0.5">
            {timeAgo}
          </time>
        </div>

        {/* Message preview */}
        <p className="mt-0.5 text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {msg.message}
        </p>
      </div>

      {/* Arrow on hover */}
      <MessageCircle
        size={14}
        className="text-slate-300 group-hover:text-sky-400 transition-colors shrink-0 mt-1 opacity-0 group-hover:opacity-100"
      />
    </li>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center px-6">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-50 mb-4">
        <Inbox size={24} className="text-slate-300" />
      </div>
      <p className="text-sm font-medium text-slate-500">No messages yet</p>
      <p className="text-xs text-slate-400 mt-1">
        New queries from users will appear here.
      </p>
    </div>
  );
}
