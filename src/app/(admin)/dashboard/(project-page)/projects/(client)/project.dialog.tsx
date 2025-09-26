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

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: ProjectTypes;
  onSave: (updated: ProjectTypes) => void;
  action: string;
}

export default function ProjectDialog({
  open,
  onOpenChange,
  project,
  onSave,
  action,
}: ProjectDialogProps) {
  // handle close
  const handleDialogClose = () => {
    onOpenChange(false);
  };

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
          <Button
            type="button"
            variant="destructive"
            onClick={() => onSave(project)}
            className="flex"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
