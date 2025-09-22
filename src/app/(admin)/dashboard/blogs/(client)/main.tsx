"use client";

import React, { useState } from "react";
import CategoryDialog from "@/components/layout/common/dialogs/category.dialog";
import { DataTable } from "@/components/data-table";
import { Category, getColumns } from "../columns";
import { toast } from "sonner";
import {
  DeleteCategoryAction,
  UpdateCategoryAction,
} from "../(actions)/categories.actions";
import { useRouter } from "next/navigation";

interface MainCategoriesProps {
  data: Category[];
  page: number;
  limit: number;
  total: number;
}

const MainCategories = ({ data, page, limit, total }: MainCategoriesProps) => {
  // open
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  // router
  const router = useRouter();
  const [action, setAction] = useState<string>("");
  // router
  // handle edit
  const handleEdit = (data: Category) => {
    setOpen(true);
    setAction("edit");
    setSelectedCategory(data);
  };
  // handle delete
  const handleDelete = (data: Category) => {
    setAction("delete");
    setOpen(true);
    setSelectedCategory(data);
  };

  // handle on save
  const onSave = async (updated: Category) => {
    setOpen(false);
    // check the action
    if (action === "edit") {
      try {
        // call delete action
        const result = await UpdateCategoryAction(updated);
        console.log("result: ", result);

        if (result.success) {
          router.refresh();
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    } else if (action === "delete") {
      try {
        // call delete action
        const result = await DeleteCategoryAction(
          updated.id,
          updated.imgPublicId as string
        );
        console.log("result: ", result);

        if (result.success) {
          router.refresh();
          toast.success(result.message);
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
      />
      {/* Category Dialog */}
      <CategoryDialog
        open={open}
        onOpenChange={setOpen}
        category={selectedCategory}
        onSave={onSave}
        action={action}
      />
    </>
  );
};

export default MainCategories;
