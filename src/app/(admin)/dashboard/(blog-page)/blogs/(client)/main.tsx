"use client";

import React, { useState } from "react";

import { DataTable, LinkTypes } from "@/components/data-table";
import { useRouter } from "next/navigation";
import BlogDialog from "./blog.dialog";
import { BlogTypes, getColumns } from "../columns";
import { toast } from "sonner";
import { onSaveTypes } from "../../../types";

interface MainBlogsProps {
  data: BlogTypes[];
  page: number;
  limit: number;
  total: number;
  linkInfo?: LinkTypes;
}

const MainBlogs = ({ data, page, limit, total, linkInfo }: MainBlogsProps) => {
  // open
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<BlogTypes | null>(null);
  // router
  const router = useRouter();
  const [action, setAction] = useState<string>("");
  // router
  // handle edit
  const handleEdit = (data: BlogTypes) => {
    // setOpen(true);
    setAction("edit");
    setSelectedItem(data);
    router.push(`add-blog?id=${data.id}`);
  };
  // handle delete
  const handleDelete = (data: BlogTypes) => {
    setAction("delete");
    setOpen(true);
    setSelectedItem(data);
  };

  // handle on save
  const onSave = async (result: onSaveTypes) => {
    setOpen(false);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  // columns
  const columns = getColumns({ onEdit: handleEdit, onDelete: handleDelete });
  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        page={page}
        limit={limit}
        total={total}
        linkInfo={linkInfo}
      />
      {/* BlogTypes Dialog */}
      <BlogDialog
        open={open}
        onOpenChange={setOpen}
        blog={selectedItem as BlogTypes}
        onSave={onSave}
        action={action}
      />
    </>
  );
};

export default MainBlogs;
