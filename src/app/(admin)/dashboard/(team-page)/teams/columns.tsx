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
import Image from "next/image";

// Define the shape of your TeamTypes data
export type TeamTypes = {
  id: number;
  name: string;
  role: string;
  slug: string;
  image: string;
  github: string;
  linkedin: string;
  twitter: string;
  createdAt: string;
  updatedAt: string;
};

interface columnsProps {
  onEdit: (category: TeamTypes) => void;
  onDelete: (category: TeamTypes) => void;
}

export const getColumns = ({
  onEdit,
  onDelete,
}: columnsProps): ColumnDef<TeamTypes>[] => [
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
  // Column for Title
  {
    accessorKey: "image",
    header: "Profile",
    cell: ({ row }) => (
      <div className="font-medium  p-1">
        <Image
          width={100}
          height={150}
          src={row.original.image as string}
          alt={row.original.image}
          className="rounded-full w-10 h-10"
        />
      </div>
    ),
  },
  // Column for Name
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="font-mono">{row.original.name}</div>,
  },
  // Column for Role
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div className="font-mono">{row.original.role}</div>,
  },
  // Column for Actions
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
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
                <DropdownMenuItem onClick={() => onEdit(category)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-red-500"
                  onClick={() => onDelete(category)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden md:flex md:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(category)}
            >
              <Pen />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(category)}
            >
              <Trash />
            </Button>
          </div>
        </>
      );
    },
  },
];
