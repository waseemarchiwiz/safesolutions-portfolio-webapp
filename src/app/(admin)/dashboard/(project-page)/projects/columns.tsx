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
import { iconsMap } from "@/app/(website)/project/data";

// Define the shape of your ServiceTypes data

export type ServiceTypes = {
  id?: number;
  title: string;
  description: string;
  features: string[];
  icon: keyof typeof iconsMap;
};

export type ProjectDetailTypes = {
  id?: number;
  name: string;
  version: string;
  lastUpdated: string;
  deploymentType: string;
  supportHours: string;
};

export type SupportTypes = {
  id?: number;
  title: string;
  description: string;
  icon: keyof typeof iconsMap;
};

export interface ProjectTypes {
  id?: number;
  name: string;
  description: string;
  slug: string;
  img: string;
  version?: string;
  lastUpdated?: string;
  type: "detailed" | "external";
  link?: string;
  services: ServiceTypes[];
  projectDetails: ProjectDetailTypes[];
  supports: SupportTypes[];
}

interface columnsProps {
  onEdit: (category: ProjectTypes) => void;
  onDelete: (category: ProjectTypes) => void;
}

export const getColumns = ({
  onEdit,
  onDelete,
}: columnsProps): ColumnDef<ProjectTypes>[] => [
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
  // {
  //   accessorKey: "image",
  //   header: "Logo",
  //   cell: ({ row }) => {
  //     const Icon = iconsMap[row?.original?.icon as keyof typeof iconsMap];
  //     return (
  //       <span className=" text-indigo-600">
  //         <Icon />
  //       </span>
  //     );
  //   },
  // },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
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
