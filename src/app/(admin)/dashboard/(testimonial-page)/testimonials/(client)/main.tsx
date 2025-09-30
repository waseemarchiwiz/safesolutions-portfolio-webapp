"use client";

import React, { useState } from "react";
import { DataTable, LinkTypes } from "@/components/data-table";
import { useRouter } from "next/navigation";
import { getColumns, TestimonialTypes } from "../columns";
import { toast } from "sonner";
import { ReturnPayload } from "@/lib/types";
import { apiClient } from "@/lib/api-config/client";
import TestimonialDialog from "./testimonials.dialog";
import { onSaveTypes } from "../../../types";

interface MainTeamsProps {
  data: TestimonialTypes[];
  page: number;
  limit: number;
  total: number;
  linkInfo?: LinkTypes;
}

const MainTeams = ({ data, page, limit, total, linkInfo }: MainTeamsProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<TestimonialTypes | null>(
    null
  );
  const [action, setAction] = useState<string>("");
  const router = useRouter();

  // handle edit
  const handleEdit = (team: TestimonialTypes) => {
    setOpen(true);
    setAction("edit");
    setSelectedItem(team);
  };

  // handle delete
  const handleDelete = (team: TestimonialTypes) => {
    setAction("delete");
    setOpen(true);
    setSelectedItem(team);
  };

  // handle save
  const onSave = async (result: onSaveTypes) => {
    setOpen(false);
    // call delete action
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

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

      <TestimonialDialog
        open={open}
        onOpenChange={setOpen}
        testimonial={selectedItem as TestimonialTypes}
        onSave={onSave}
        action={action}
      />
    </>
  );
};

export default MainTeams;
