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
import { ProjectTypes } from "../columns";
import { onSaveTypes } from "../../../types";
import { useEffect, useState } from "react";
import { DeleteProjectAction } from "../(actions)/actions";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ProjectTypes;
  onSave: (result: onSaveTypes) => void;
  action: string;
}

export default function ProjectDialog({
  open,
  onOpenChange,
  project,
  onSave,
  action,
}: ProjectDialogProps) {
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
      const result = await DeleteProjectAction(project?.id as number);
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
            {action === "edit" ? "Update Project" : "Delete Project"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {action === "edit"
              ? "Update Project dialog"
              : "Delete Project confirmation"}
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
            {loading ? "Loading..." : "Yes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
