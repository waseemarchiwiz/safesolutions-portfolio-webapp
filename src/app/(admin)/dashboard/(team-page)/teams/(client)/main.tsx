"use client";

import React, { useState } from "react";
import { DataTable, LinkTypes } from "@/components/data-table";
import { getColumns, TeamTypes } from "../columns";
import { toast } from "sonner";
import TeamDialog from "./team.dialog";
import { onSaveTypes } from "../../../types";

interface MainTeamsProps {
  data: TeamTypes[];
  page: number;
  limit: number;
  total: number;
  linkInfo?: LinkTypes;
}

const MainTeams = ({ data, page, limit, total, linkInfo }: MainTeamsProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<TeamTypes | null>(null);
  const [action, setAction] = useState<string>("");

  // handle edit
  const handleEdit = (team: TeamTypes) => {
    setOpen(true);
    setAction("edit");
    setSelectedItem(team);
  };

  // handle delete
  const handleDelete = (team: TeamTypes) => {
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

      <TeamDialog
        open={open}
        onOpenChange={setOpen}
        team={selectedItem as TeamTypes}
        onSave={onSave}
        action={action}
      />
    </>
  );
};

export default MainTeams;
