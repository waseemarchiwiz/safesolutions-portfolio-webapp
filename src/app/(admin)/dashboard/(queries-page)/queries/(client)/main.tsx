"use client";

import { useState } from "react";
import { DataTable, LinkTypes } from "@/components/data-table";
import { getColumns, QueryTypes } from "../columns";
import { toast } from "sonner";
import QueryDialog from "./query.dialog";
import { onSaveTypes } from "../../../types";
import QuerySheet from "./query-sheet";

interface MainTeamsProps {
  data: QueryTypes[];
  page: number;
  limit: number;
  total: number;
  linkInfo?: LinkTypes;
}

const MainQueries = ({
  data,
  page,
  limit,
  total,
  linkInfo,
}: MainTeamsProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<QueryTypes | null>(null);
  const [action, setAction] = useState<string>("");

  const handlePreview = (query: QueryTypes) => {
    setSelectedItem(query);
    setSheetOpen(true);
  };

  const handleDelete = (query: QueryTypes) => {
    setAction("delete");
    setSheetOpen(false);
    setOpen(true);
    setSelectedItem(query);
  };

  const onSave = async (result: onSaveTypes) => {
    setOpen(false);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  const columns = getColumns({ onDelete: handleDelete });

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        page={page}
        limit={limit}
        total={total}
        linkInfo={linkInfo ? linkInfo : undefined}
        onRowClick={handlePreview}
        getRowClassName={() =>
          "group transition-colors hover:bg-sky-50/70 data-[state=selected]:bg-sky-50"
        }
      />

      <QuerySheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        query={selectedItem}
        onDelete={handleDelete}
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

export default MainQueries;
