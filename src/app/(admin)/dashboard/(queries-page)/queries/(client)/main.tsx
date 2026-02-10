"use client";

import React, { useState } from "react";
import { DataTable, LinkTypes } from "@/components/data-table";
import { getColumns, QueryTypes } from "../columns";
import { toast } from "sonner";
import QueryDialog from "./query.dialog";
import { onSaveTypes } from "../../../types";

interface MainTeamsProps {
  data: QueryTypes[];
  page: number;
  limit: number;
  total: number;
  linkInfo?: LinkTypes;
}

const MainFaq = ({ data, page, limit, total, linkInfo }: MainTeamsProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<QueryTypes | null>(null);
  const [action, setAction] = useState<string>("");

  // handle edit
  const handleEdit = (team: QueryTypes) => {
    setOpen(true);
    setAction("edit");
    setSelectedItem(team);
  };

  // handle delete
  const handleDelete = (team: QueryTypes) => {
    setAction("delete");
    setOpen(true);
    setSelectedItem(team);
  };

  // handle save
  const onSave = async (result: onSaveTypes) => {
    setOpen(false);
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
        linkInfo={linkInfo ? linkInfo : undefined}
      />

      <QueryDialog
        open={open}
        onOpenChange={setOpen}
        query={selectedItem as QueryTypes}
        onSave={onSave}
        action={action}
      />
    </>
  );
};

export default MainFaq;
