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
import { onSaveTypes } from "../../../types";
import { DeleteBlogAction } from "../(actions)/actions";
import { useEffect, useState } from "react";
import Loading from "../loading";

interface BlogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blog: BlogTypes;
  onSave: (result: onSaveTypes) => void;
  action: string;
}

export default function BlogDialog({
  open,
  onOpenChange,
  blog,
  onSave,
  action,
}: BlogDialogProps) {
  // loading
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
      const result = await DeleteBlogAction(blog.id);
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
            {action === "edit" ? "Update Blog" : "Delete Blog"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {action === "edit"
              ? "Update blog dialog"
              : "Delete blog confirmation"}
          </DialogDescription>
        </DialogHeader>
        <Separator className="" />
        Are you sure you want to delete this record?
        <Separator className="" />
        <DialogFooter>
          <div className="flex justify-end gap-2 items-center">
            <Button type="button" variant="outline" onClick={handleDialogClose}>
              Cancel
            </Button>

            <Button
              type={"button"}
              variant={"destructive"}
              onClick={handeDelete}
            >
              {loading ? "Deleting..." : "Yes"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
