"use client";

import React, { useState } from "react";
import { DataTable, LinkTypes } from "@/components/data-table";
import { useRouter } from "next/navigation";
import { CareerTypes, getColumns } from "../columns";
import { toast } from "sonner";
import { ReturnPayload } from "@/lib/types";
import { apiClient } from "@/lib/api-config/client";
import TeamDialog from "./career.dialog";

interface MainTeamsProps {
  data: CareerTypes[];
  page: number;
  limit: number;
  total: number;
  linkInfo?: LinkTypes;
}

const MainCareers = ({
  data,
  page,
  limit,
  total,
  linkInfo,
}: MainTeamsProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<CareerTypes | null>(null);
  const [action, setAction] = useState<string>("");
  const router = useRouter();

  // handle edit
  const handleEdit = (team: CareerTypes) => {
    setOpen(true);
    setAction("edit");
    setSelectedItem(team);
  };

  // handle delete
  const handleDelete = (team: CareerTypes) => {
    setAction("delete");
    setOpen(true);
    setSelectedItem(team);
  };

  // handle save
  const onSave = async (
    updated: CareerTypes,
    result?: { success?: boolean; message?: string }
  ) => {
    if (action === "edit") {
      if (result?.success) {
        toast.success(result.message);
        // close AFTER showing toast
        setTimeout(() => {
          setOpen(false);
          router.refresh();
        }, 300); // small delay avoids blink
        setOpen(false);
      }
    }

    if (action === "delete") {
      try {
        const result: ReturnPayload = await apiClient.delete(
          `/admin/delete/career/${updated?.id}`
        );
        if (result.success) {
          toast.success(result.message);
          // close AFTER showing toast
          setTimeout(() => {
            setOpen(false);
            router.refresh();
          }, 300); // small delay avoids blink
          setOpen(false);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to delete team member");
      }
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

      <TeamDialog
        open={open}
        onOpenChange={setOpen}
        career={selectedItem as CareerTypes}
        onSave={onSave}
        action={action}
      />
    </>
  );
};

export default MainCareers;
