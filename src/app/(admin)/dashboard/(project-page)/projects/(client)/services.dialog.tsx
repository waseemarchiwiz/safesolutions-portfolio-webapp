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

interface serviceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: ServiceTypes;
  onSave: (updated: ServiceTypes) => void;
  action: string;
}

export default function ServiceDialog({
  open,
  onOpenChange,
  service,
  onSave,
  action,
}: serviceDialogProps) {
  // handle close
  const handleDialogClose = () => {
    onOpenChange(false);
  };

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
          <Button
            type="button"
            variant="destructive"
            onClick={() => onSave(service)}
            className="flex"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
