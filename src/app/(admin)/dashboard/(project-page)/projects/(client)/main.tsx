"use client";

import React, { useState } from "react";

import { DataTable, LinkTypes } from "@/components/data-table";
import { useRouter } from "next/navigation";
import { getColumns, ProjectTypes } from "../columns";
import { toast } from "sonner";
import ProjectDialog from "./project.dialog";
import { onSaveTypes } from "../../../types";

interface MainBlogsProps {
  data: ProjectTypes[];
  page: number;
  limit: number;
  total: number;
  linkInfo?: LinkTypes;
}

const MainBlogs = ({ data, page, limit, total, linkInfo }: MainBlogsProps) => {
  // open
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ProjectTypes | null>(null);
  // router
  const router = useRouter();
  const [action, setAction] = useState<string>("");
  // router
  // handle edit
  const handleEdit = (data: ProjectTypes) => {
    // setOpen(true);
    setAction("edit");
    setSelectedItem(data);
    router.push(`add-project?id=${data.id}`);
  };
  // handle delete
  const handleDelete = (data: ProjectTypes) => {
    setAction("delete");
    setOpen(true);
    setSelectedItem(data);
  };

  // handle on save
  const onSave = async (result: onSaveTypes) => {
    setOpen(false);
    if (result.success) {
      toast.success(result.message);
      setOpen(false);
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
      {/* ProjectTypes Dialog */}
      <ProjectDialog
        open={open}
        onOpenChange={setOpen}
        project={selectedItem as ProjectTypes}
        onSave={onSave}
        action={action}
      />
    </>
  );
};

export default MainBlogs;
