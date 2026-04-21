// src/app/dashboard/blogs/columns.tsx
"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreVertical, Trash } from "lucide-react";
import { shortText } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Define the shape of your QueryTypes data
export type QueryTypes = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  sender: string;
  createdAt: string;
};

interface columnsProps {
  onDelete: (query: QueryTypes) => void;
}

export const getColumns = ({
  onDelete,
}: columnsProps): ColumnDef<QueryTypes>[] => [
  // Column for Dragging
  // {
  //   id: "drag",
  //   header: () => null,
  //   cell: ({ row }) => <DragHandle id={row.original.id} />,
  // },
  // Column for Row Selection
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // Sender
  {
    accessorKey: "name",
    header: "Contact",
    cell: ({ row }) => (
      <div className="min-w-[12rem]">
        <p className="font-semibold text-slate-900">{row.original.name}</p>
        <p className="mt-1 text-xs text-slate-500">{row.original.email}</p>
      </div>
    ),
  },

  {
    accessorKey: "sender",
    header: "Recipient",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="border-emerald-200 bg-emerald-50 text-emerald-700"
      >
        {row.original.sender}
      </Badge>
    ),
  },

  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <div className="max-w-[14rem] font-medium text-slate-700">
        {shortText(row.original.subject, 20) || "No subject"}
      </div>
    ),
  },

  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => (
      <div className="max-w-[22rem] min-w-[16rem]">
        <p className="line-clamp-2 text-sm leading-6 text-slate-600 transition-colors group-hover:text-slate-800 [overflow-wrap:anywhere]">
          {row.original.message}
        </p>
      </div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: "Received",
    cell: ({ row }) => {
      const createdAt = new Date(row.original.createdAt);
      const value = Number.isNaN(createdAt.getTime())
        ? "Unknown date"
        : formatDistanceToNow(createdAt, { addSuffix: true });

      return <div className="min-w-[8rem] text-sm text-slate-500">{value}</div>;
    },
  },

  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const query = row.original;
      return (
        <div data-row-action>
          <div className="flex md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => onDelete(query)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden md:flex md:gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(query)}
            >
              <Trash />
            </Button>
          </div>
        </div>
      );
    },
  },
];
