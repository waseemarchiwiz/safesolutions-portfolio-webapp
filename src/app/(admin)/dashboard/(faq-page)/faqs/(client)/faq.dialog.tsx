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
import { Textarea } from "@/components/ui/textarea";
import { FaqTypes } from "../columns";
import {
  FaqFormValues,
  FaqSchema,
} from "../../add-faq/(validation)/validation";

interface EditfaqDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faq: FaqTypes | null;
  onSave: (
    updated: FaqTypes,
    result?: { success?: boolean; message?: string }
  ) => void;
  action: string;
}

export default function FaqDialog({
  open,
  onOpenChange,
  faq,
  onSave,
  action,
}: EditfaqDialogProps) {
  const form = useForm<FaqFormValues>({
    resolver: zodResolver(FaqSchema), // ✅ allow edit mode (image optional)
    defaultValues: {
      question: faq?.question || "",
      answer: faq?.answer || "",
    },
  });

  const submitButtonText = action === "edit" ? "Save" : "Yes";

  const formSubmit = async (values: FaqFormValues) => {
    // 🔹 Map fields to backend names
    try {
      const result: ReturnPayload = await apiClient.put(
        `admin/update/faq/${faq?.id}`,
        values
      );

      if (result.success) {
        onSave(faq as FaqTypes, {
          success: result.success,
          message: result.message,
        });
      } else {
        onSave(faq as FaqTypes, {
          success: result.success,
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Error updating faq:", error);
      toast.error("Failed to update faq");
    }
  };

  useEffect(() => {
    if (open && faq) {
      form.reset({
        question: faq.question || "",
        answer: faq.answer || "",
      });
    }
  }, [open, faq, form]);

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
                {action === "edit" ? "Update faq" : "Confirmation"}
              </DialogTitle>
              <DialogDescription className="sr-only">
                This is update faq dialog
              </DialogDescription>
            </DialogHeader>
            <Separator className="mt-2 mb-5" />

            {action === "edit" ? (
              <>
                {/* Title */}
                <FormField
                  control={form.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your question" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Full answer */}
                <FormField
                  control={form.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Answer *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter full anwer"
                          className="min-h-[100px]"
                          {...field}
                        />
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
                onClick={() => onSave(faq as FaqTypes)}
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
