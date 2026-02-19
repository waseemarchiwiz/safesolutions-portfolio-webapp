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
import {
  buildJobSchema,
  JobFormValues,
} from "../../add-career/(validation)/validation";
import { CareerTypes } from "../columns";
import { Textarea } from "@/components/ui/textarea";
import { DeleteCareerAction, UpdateCareerAction } from "../(actions)/actions";
import { onSaveTypes } from "../../../types";
import { LoaderCircle } from "@/components/common/loader";

interface EditCareerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  career: CareerTypes | null;
  onSave: (result: onSaveTypes) => void;
  action: string;
}

export default function EditCareerDialog({
  open,
  onOpenChange,
  career,
  onSave,
  action,
}: EditCareerDialogProps) {
  // use form
  const form = useForm<JobFormValues>({
    resolver: zodResolver(buildJobSchema), // allow edit mode (image optional)
    defaultValues: {
      title: career?.title || "",
      shortDescription: career?.shortDescription || "",
      slug: career?.slug,
      description: career?.jobDescription || "",
      location: career?.location || "",
      easyApply: career?.link || "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  const submitButtonText = action === "edit" ? "Save" : "Yes";

  const formSubmit = async (values: JobFormValues) => {
    // Map fields to backend names
    const payload = {
      ...values,
      id: career?.id as number,
    };

    try {
      const result = await UpdateCareerAction(payload);
      console.log("result--", result);
      if (result.success) {
        onSave({ success: result.success, message: result.message });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error saving team member:", error);
    }
  };

  // For delete
  const handeDelete = async () => {
    // data
    try {
      setLoading(true);
      // call delete action
      const result = await DeleteCareerAction(career?.id as number);
      console.log("result: ", result);
      onSave({ success: result.success, message: result.message });
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

  // Auto-generate slug from title
  const watchedTitle = form.watch("title");
  useEffect(() => {
    if (watchedTitle) {
      const slug = watchedTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
      form.setValue("slug", slug);
    }
  }, [watchedTitle, form]);

  useEffect(() => {
    if (open && career) {
      form.reset({
        title: career.title || "",
        shortDescription: career.shortDescription || "",
        slug: career.slug,
        description: career.jobDescription || "",
        location: career.location || "",
        easyApply: career.link || "",
      });
      setLoading(false);
    }
  }, [open, career, form]);

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
                {action === "edit" ? "Update Career" : "Confirmation"}
              </DialogTitle>
              <DialogDescription className="sr-only">
                This is update career dialog
              </DialogDescription>
            </DialogHeader>
            <Separator className="mt-3 mb-2" />

            {action === "edit" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
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
                  {/* slug */}
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter career slug" {...field} />
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
                  {/* Short Description */}
                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter short description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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

                {/* Full Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter full description"
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
                className={`${action === "edit" && "bg-sky-600 hover:bg-sky-700"} `}
                onClick={() => action !== "edit" && handeDelete()}
              >
                {loading || form.formState.isSubmitting ? (
                  <LoaderCircle size={20} />
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
