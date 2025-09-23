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
import { BlogTypes } from "../columns";

interface BlogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blog: BlogTypes;
  onSave: (updated: BlogTypes) => void;
  action: string;
}

export default function BlogDialog({
  open,
  onOpenChange,
  blog,
  onSave,
  action,
}: BlogDialogProps) {
  // handle close
  const handleDialogClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === "edit" ? "Update Blog" : "Delete Blog"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {action === "edit"
              ? "Update blog dialog"
              : "Delete blog confirmation"}
          </DialogDescription>
        </DialogHeader>
        <Separator className="mt-3 mb-2" />
        Are you sure you want to delete this record?
        <Separator className="mt-6 mb-5" />
        <DialogFooter>
          <div className="flex justify-end gap-2 items-center">
            <Button type="button" variant="outline" onClick={handleDialogClose}>
              Cancel
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={() => onSave(blog)}
              className="flex"
            >
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
