"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { ReturnPayload } from "@/lib/types";
import { apiClient } from "@/lib/api-config/client";
import { toast } from "sonner";
import {
  buildJobSchema,
  JobFormValues,
} from "../../add-career/(validation)/validation";
import { CareerTypes } from "../columns";

interface EditCareerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  career: CareerTypes | null;
  onSave: (
    updated: CareerTypes,
    result?: { success?: boolean; message?: string }
  ) => void;
  action: string;
}

export default function EditCareerDialog({
  open,
  onOpenChange,
  career,
  onSave,
  action,
}: EditCareerDialogProps) {
  const form = useForm<JobFormValues>({
    resolver: zodResolver(buildJobSchema), // ✅ allow edit mode (image optional)
    defaultValues: {
      title: career?.title || "",
      shortDescription: career?.short_description || "",
      description: career?.job_description || "",
      location: career?.location || "",
      easyApply: career?.link || "",
    },
  });

  const submitButtonText = action === "edit" ? "Save" : "Yes";

  const formSubmit = async (values: JobFormValues) => {
    // 🔹 Map fields to backend names
    const payload = {
      title: values.title,
      short_description: values.shortDescription,
      job_description: values.description,
      location: values.location,
      link: values.easyApply,
    };

    try {
      const result: ReturnPayload = await apiClient.put(
        `admin/update/career/${career?.id}`,
        payload
      );

      if (result.success) {
        onSave(career as CareerTypes, {
          success: result.success,
          message: result.message,
        });
        toast.success(result.message);
        onOpenChange(false);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error updating career:", error);
      toast.error("Failed to update career");
    }
  };

  useEffect(() => {
    if (open && career) {
      form.reset({
        title: career.title || "",
        shortDescription: career.short_description || "",
        description: career.job_description || "",
        location: career.location || "",
        easyApply: career.link || "",
      });
    }
  }, [open, career, form]);

  const handleDialogClose = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Career</DialogTitle>
          <DialogDescription className="sr-only">
            This is update career dialog
          </DialogDescription>
        </DialogHeader>
        <Separator className="mt-3 mb-2" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter career title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Short Description */}
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter short description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Full Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Easy Apply */}
            <FormField
              control={form.control}
              name="easyApply"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Easy Apply</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter apply link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleDialogClose}
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="min-w-[120px] bg-indigo-500 hover:bg-indigo-400"
              >
                {form.formState.isSubmitting ? "Processing" : submitButtonText}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
