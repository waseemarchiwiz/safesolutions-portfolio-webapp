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
import { useEffect, useState } from "react";
import { ReturnPayload } from "@/lib/types";
import { apiClient } from "@/lib/api-config/client";
import { toast } from "sonner";
import { CompanyTypes } from "../columns";
import {
  CompanyFormValues,
  companySchema,
} from "../../add-company/(validation)/validation";
import { onSaveTypes } from "../../../types";
import { DeleteCompanyAction, UpdateCompanyAction } from "../(actions)/actions";

interface CompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  company: CompanyTypes | null;
  onSave: (result: onSaveTypes) => void;
  action: string;
}

export default function CompanyDialog({
  open,
  onOpenChange,
  company,
  onSave,
  action,
}: CompanyDialogProps) {
  // form
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: company?.name || "",
      email: company?.email || "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  const submitButtonText = action === "edit" ? "Save" : "Yes";

  const formSubmit = async (values: CompanyFormValues) => {
    //  Map fields to backend names

    const payload = {
      ...values,
      id: company?.id as number,
    };

    try {
      const result = await UpdateCompanyAction(payload);
      console.log("Result===,", result);
      if (result.success) {
        onSave({
          success: result.success,
          message: result.message,
        });
      } else {
        onSave({
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
      setLoading(false);
    }
  }, [open, company, form]);

  const handleDialogClose = () => {
    form.reset();
    onOpenChange(false);
  };

  // For delete
  const handeDelete = async () => {
    // data
    try {
      setLoading(true);
      // call delete action
      const result = await DeleteCompanyAction(company?.id as number);
      console.log("result: ", result);
      onSave({ success: result.success, message: result.message });
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
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
                disabled={form.formState.isSubmitting}
                type={action === "edit" ? "submit" : "button"}
                variant={action === "edit" ? "default" : "destructive"}
                onClick={() => action !== "edit" && handeDelete()}
              >
                {loading || form.formState.isSubmitting
                  ? "Loading..."
                  : submitButtonText}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
