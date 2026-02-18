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
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { FaqTypes } from "../columns";
import {
  FaqFormValues,
  FaqSchema,
} from "../../add-faq/(validation)/validation";
import { onSaveTypes } from "../../../types";
import { DeleteFAQAction, UpdateFAQAction } from "../(actions)/actions";
import { Loader2 } from "lucide-react";
import { LoaderCircle } from "@/components/common/loader";

interface EditfaqDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  faq: FaqTypes | null;
  onSave: (result: onSaveTypes) => void;
  action: string;
}

export default function FaqDialog({
  open,
  onOpenChange,
  faq,
  onSave,
  action,
}: EditfaqDialogProps) {
  // use form
  const form = useForm<FaqFormValues>({
    resolver: zodResolver(FaqSchema), // allow edit mode (image optional)
    defaultValues: {
      question: faq?.question || "",
      answer: faq?.answer || "",
    },
  });
  const [loading, setLoading] = useState<boolean>(false);

  const submitButtonText = action === "edit" ? "Save" : "Yes";

  const formSubmit = async (values: FaqFormValues) => {
    // 🔹 Map fields to backend names

    const payload = {
      ...values,
      id: faq?.id as number,
    };

    try {
      const result = await UpdateFAQAction(payload);

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
      setLoading(false);
    }
  }, [open, faq, form]);

  // For delete
  const handeDelete = async () => {
    // data
    try {
      setLoading(true);
      // call delete action
      const result = await DeleteFAQAction(faq?.id as number);
      console.log("result: ", result);
      onSave({ success: result.success, message: result.message });
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

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
                disabled={form.formState.isSubmitting}
                type={action === "edit" ? "submit" : "button"}
                variant={action === "edit" ? "default" : "destructive"}
                onClick={() => action !== "edit" && handeDelete()}
                className={`${action === "edit" && "bg-sky-600 hover:bg-sky-700"}`}
              >
                {loading || form.formState.isSubmitting ? (
                  <LoaderCircle size={30} />
                ) : (
                  submitButtonText
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
