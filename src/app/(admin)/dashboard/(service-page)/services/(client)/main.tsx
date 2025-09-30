"use client";

import React, { useState } from "react";

import { DataTable, LinkTypes } from "@/components/data-table";
import { useRouter } from "next/navigation";
import { getColumns, ServiceTypes } from "../columns";
import { toast } from "sonner";
import { ReturnPayload } from "@/lib/types";
import { apiClient } from "@/lib/api-config/client";
import ServiceDialog from "./services.dialog";
import { onSaveTypes } from "../../../types";

interface MainServicesProps {
  data: ServiceTypes[];
  page: number;
  limit: number;
  total: number;
  linkInfo?: LinkTypes;
}

const MainServices = ({
  data,
  page,
  limit,
  total,
  linkInfo,
}: MainServicesProps) => {
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
  const onSave = async (result: onSaveTypes) => {
    setOpen(false);
    console.log("result: ", result);
    if (result.success) {
      toast.success(result.message);
      setOpen(false);
    } else {
      toast.error(result.message);
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

export default MainServices;
