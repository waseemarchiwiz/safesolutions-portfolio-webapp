"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ServiceTypes } from "../columns";
import { onSaveTypes } from "../../../types";
import { useEffect, useState } from "react";
import { DeleteServiceAction } from "../(actions)/actions";
import { LoaderCircle } from "@/components/common/loader";

interface serviceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: ServiceTypes;
  onSave: (result: onSaveTypes) => void;
  action: string;
}

export default function ServiceDialog({
  open,
  onOpenChange,
  service,
  onSave,
  action,
}: serviceDialogProps) {
  // loading state
  const [loading, setLoading] = useState<boolean>(false);

  // handle close
  const handleDialogClose = () => {
    onOpenChange(false);
  };

  // For delete
  const handeDelete = async () => {
    // data
    try {
      setLoading(true);
      // call delete action
      const result = await DeleteServiceAction(service?.id as number);
      console.log("result: ", result);
      onSave({ success: result.success, message: result.message });
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      setLoading(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === "edit" ? "Update Service" : "Delete Service"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {action === "edit"
              ? "Update Service dialog"
              : "Delete Service confirmation"}
          </DialogDescription>
        </DialogHeader>
        <Separator className="" />
        Are you sure you want to delete this record?
        <Separator className="" />
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button type={"button"} variant={"destructive"} onClick={handeDelete}>
            {loading ? <LoaderCircle size={30} /> : "Yes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
