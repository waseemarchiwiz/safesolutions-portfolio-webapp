"use client";

import React, { useState } from "react";

import { DataTable, LinkTypes } from "@/components/data-table";
import { useRouter } from "next/navigation";
import { getColumns, ServiceTypes } from "../columns";
import { toast } from "sonner";
import { ReturnPayload } from "@/lib/types";
import { apiClient } from "@/lib/api-config/client";
import ServiceDialog from "./services.dialog";

interface MainBlogsProps {
  data: ServiceTypes[];
  page: number;
  limit: number;
  total: number;
  linkInfo?: LinkTypes;
}

const MainBlogs = ({ data, page, limit, total, linkInfo }: MainBlogsProps) => {
  // open
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ServiceTypes | null>(null);
  // router
  const router = useRouter();
  const [action, setAction] = useState<string>("");
  // router
  // handle edit
  const handleEdit = (data: ServiceTypes) => {
    // setOpen(true);
    setAction("edit");
    setSelectedItem(data);
    router.push(`add-service?id=${data.id}`);
  };
  // handle delete
  const handleDelete = (data: ServiceTypes) => {
    setAction("delete");
    setOpen(true);
    setSelectedItem(data);
  };

  // handle on save
  const onSave = async (updated: ServiceTypes) => {
    setOpen(false);
    // check the action
    // if (action === "edit") {
    //   try {
    //     // call delete action
    //     const result = await UpdateServiceTypesAction(updated);
    //     console.log("result: ", result);
    //     if (result.success) {
    //       router.refresh();
    //       toast.success(result.message);
    //     } else {
    //       toast.error(result.message);
    //     }
    //   } catch (error) {
    //     console.log("Error:", error);
    //   }
    // } else

    if (action === "delete") {
      try {
        // call delete action
        const result: ReturnPayload = await apiClient.delete(
          `/admin/service/${updated?.id}`
        );
        console.log("result: ", result);
        if (result.success) {
          toast.success(result.message);
          router.refresh();
          setOpen(false);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  console.log("data in main: ", data);

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
      {/* ServiceTypes Dialog */}
      <ServiceDialog
        open={open}
        onOpenChange={setOpen}
        service={selectedItem as ServiceTypes}
        onSave={onSave}
        action={action}
      />
    </>
  );
};

export default MainBlogs;
