// src/app/dashboard/blogs/columns.tsx
"use client";

import { type ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreVertical, Pen, Trash } from "lucide-react";
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
  onEdit: (query: QueryTypes) => void;
  onDelete: (query: QueryTypes) => void;
}

export const getColumns = ({
  onEdit,
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
    header: "Name",
    cell: ({ row }) => (
      <Badge className="bg-sky-700">{row.original.name}</Badge>
    ),
  },
  // Sender
  {
    accessorKey: "sender",
    header: "Sender",
    cell: ({ row }) => <div className="font-mono">{row.original.email}</div>,
  },
  // Receiver
  {
    accessorKey: "receiver",
    header: "Receiver",
    cell: ({ row }) => (
      <Badge className="bg-emerald-700">{row.original.sender}</Badge>
    ),
  },
  // Column for Subject
  {
    accessorKey: "subject",
    header: "Subject",
    cell: ({ row }) => (
      <div className="font-mono">{shortText(row.original.subject, 40)}</div>
    ),
  },

  // Column for Message
  {
    accessorKey: "message",
    header: "Message",
    cell: ({ row }) => (
      <div className="font-mono">{shortText(row.original.message, 40)}</div>
    ),
  },

  // Column for Actions
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const query = row.original;
      return (
        <>
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
        </>
      );
    },
  },
];
