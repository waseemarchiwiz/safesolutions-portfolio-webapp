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

// Define the shape of your BlogTypes data
export type BlogTypes = {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  img?: string;
  images: [
    {
      id: number;
      image: string;
      blog_id: number;
    }
  ];
};

interface columnsProps {
  onEdit: (category: BlogTypes) => void;
  onDelete: (category: BlogTypes) => void;
}

export const getColumns = ({
  onEdit,
  onDelete,
}: columnsProps): ColumnDef<BlogTypes>[] => [
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
    accessorKey: "title",
    header: "Title",
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
