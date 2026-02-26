"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { QueryTypes } from "../columns";
import { onSaveTypes } from "../../../types";
import { DeleteQueryAction } from "../(actions)/actions";
import { LoaderCircle } from "@/components/common/loader";

interface EditQueryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  query: QueryTypes | null;
  onSave: (result: onSaveTypes) => void;
  action: string;
}

export default function QueryDialog({
  open,
  onOpenChange,
  query,
  onSave,
  action,
}: EditQueryDialogProps) {
  // loading state
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (open && query) {
      setLoading(false);
    }
  }, [open, query]);

  // For delete
  const handeDelete = async () => {
    // data
    try {
      setLoading(true);
      // call delete action
      const result = await DeleteQueryAction(query?.id as number);
      console.log("result: ", result);
      onSave({ success: result.success, message: result.message });
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogDescription className="sr-only">
            This is Delete Query dialog
          </DialogDescription>
        </DialogHeader>
        <Separator className="mt-2 " />

        <h1 className="">
          Are you sure you want to delete{" "}
          <span className="font-semibold"> {query?.email} </span> record
        </h1>

        <Separator />

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={handleDialogClose}>
            Cancel
          </Button>

          <Button variant="destructive" onClick={() => handeDelete()}>
            {loading ? <LoaderCircle size={30} /> : "Yes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
