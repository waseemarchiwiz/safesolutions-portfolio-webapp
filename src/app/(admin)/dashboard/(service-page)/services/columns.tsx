// src/app/dashboard/blogs/columns.tsx
"use client";

import React from "react";
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
import Image from "next/image";

// Define the shape of your ServiceTypes data
export interface ServiceTypes {
  id: number;
  title: string;
  slug: string;
  description: string;
  features?: string[];
  link?: string;
  overview?: string;
  technologies?: string[];
  industries?: string[];
  useCases?: string[];
  url: string; // if you decide to keep logo/image
  publicId: string;
  createdAt: string; // if you decide to keep createdAt
  updatedAt: string; // if you decide to keep updatedAt
}

interface columnsProps {
  onEdit: (category: ServiceTypes) => void;
  onDelete: (category: ServiceTypes) => void;
}

export const getColumns = ({
  onEdit,
  onDelete,
}: columnsProps): ColumnDef<ServiceTypes>[] => [
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
      <div className="font-medium p-1">
        <Image
          width={100}
          height={150}
          src={(row.original.url as string) || "/placeholder.png"}
          alt={row.original.title as string}
          className=" rounded-full w-10 h-10"
        />
      </div>
    ),
  },

  {
    accessorKey: "tab",
    header: "Service",
    cell: ({ row }) => <div className="font-medium">{row.original.title}</div>,
  },
  // Column for Slug
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="font-mono">
        {shortText(row.original.description || "Empty", 30)}
      </div>
    ),
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
