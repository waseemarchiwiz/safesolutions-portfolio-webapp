"use client";

import React, { useState } from "react";
import { DataTable, LinkTypes } from "@/components/data-table";
import { useRouter } from "next/navigation";
import { CompanyTypes, getColumns } from "../columns";
import { toast } from "sonner";
import { ReturnPayload } from "@/lib/types";
import { apiClient } from "@/lib/api-config/client";
import CompanyDialog from "./company.dialog";
import { onSaveTypes } from "../../../types";

interface MainTeamsProps {
  data: CompanyTypes[];
  page: number;
  limit: number;
  total: number;
  linkInfo?: LinkTypes;
}

const MainCompany = ({
  data,
  page,
  limit,
  total,
  linkInfo,
}: MainTeamsProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<CompanyTypes | null>(null);
  const [action, setAction] = useState<string>("");
  const router = useRouter();

  // handle edit
  const handleEdit = (company: CompanyTypes) => {
    setOpen(true);
    setAction("edit");
    setSelectedItem(company);
  };

  // handle delete
  const handleDelete = (company: CompanyTypes) => {
    setAction("delete");
    setOpen(true);
    setSelectedItem(company);
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
        linkInfo={linkInfo}
      />

      <CompanyDialog
        open={open}
        onOpenChange={setOpen}
        company={selectedItem as CompanyTypes}
        onSave={onSave}
        action={action}
      />
    </>
  );
};

export default MainCompany;
