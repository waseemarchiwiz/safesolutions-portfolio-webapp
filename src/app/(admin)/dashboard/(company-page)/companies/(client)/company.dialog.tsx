"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { CompanyTypes } from "../columns";
import {
  CompanyFormValues,
  companySchema,
} from "../../add-company/(validation)/validation";

interface CompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  company: CompanyTypes | null;
  onSave: (
    updated: CompanyTypes,
    result?: { success: boolean; message: string }
  ) => void;
  action: string;
}

export default function CompanyDialog({
  open,
  onOpenChange,
  company,
  onSave,
  action,
}: CompanyDialogProps) {
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema), // ✅ allow edit mode (image optional)
    defaultValues: {
      name: company?.name || "",
      email: company?.email || "",
    },
  });

  const submitButtonText = action === "edit" ? "Save" : "Yes";

  const formSubmit = async (values: CompanyFormValues) => {
    // 🔹 Map fields to backend names
    try {
      const result: ReturnPayload = await apiClient.put(
        `/admin/update/email/${company?.id}`,
        values
      );

      if (result.success) {
        onSave(company as CompanyTypes, {
          success: result.success,
          message: result.message,
        });
      } else {
        onSave(company as CompanyTypes, {
          success: result.success,
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Error updating company:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update");
    }
  };

  useEffect(() => {
    if (open && company) {
      form.reset({
        name: company.name || "",
        email: company.email || "",
      });
    }
  }, [open, company, form]);

  const handleDialogClose = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>
                {action === "edit" ? "Update company" : "Confirmation"}
              </DialogTitle>
              <DialogDescription className="sr-only">
                This is update company dialog
              </DialogDescription>
            </DialogHeader>
            <Separator className="mt-2 mb-5" />

            {action === "edit" ? (
              <>
                {/* Title */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Full answer */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <h1 className="mt-5">
                Are you sure you want to delete this record
              </h1>
            )}

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
                type={action === "edit" ? "submit" : "button"}
                disabled={form.formState.isSubmitting}
                className="min-w-[120px] bg-indigo-500 hover:bg-indigo-400"
                onClick={() => onSave(company as CompanyTypes)}
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
