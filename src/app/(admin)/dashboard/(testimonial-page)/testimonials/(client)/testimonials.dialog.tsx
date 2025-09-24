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
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TestimonialTypes } from "../columns";
import { ReturnPayload } from "@/lib/types";
import { apiClient, baseURL } from "@/lib/api-config/client";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  EditTestimonialsFormValues,
  EditTestimonialsSchema,
} from "../(validation)/validation";

interface EditTestimonialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testimonial: TestimonialTypes | null;
  onSave: (
    updated: TestimonialTypes,
    result?: { success?: boolean; message?: string }
  ) => void;
  action: string;
}

export default function TestimonialDialog({
  open,
  onOpenChange,
  testimonial,
  onSave,
  action,
}: EditTestimonialDialogProps) {
  const form = useForm<EditTestimonialsFormValues>({
    resolver: zodResolver(EditTestimonialsSchema),
    defaultValues: {
      name: testimonial?.name || "",
      designation: testimonial?.designation || "",
      description: testimonial?.description || "",
      image: undefined,
    },
  });

  const [preview, setPreview] = useState<string>(testimonial?.image || "");
  const inputFileRef = useRef<HTMLInputElement>(null);

  const submitButtonText = action === "edit" ? "Save" : "Yes";

  const formSubmit = async (values: EditTestimonialsFormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("designation", values.designation);
    formData.append("description", values.description);
    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    try {
      const result: ReturnPayload = await apiClient.put(
        `/admin/update/testimonial/${testimonial?.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (result.success) {
        onSave(testimonial as TestimonialTypes, {
          success: result.success,
          message: result.message,
        });
      } else {
        onSave(testimonial as TestimonialTypes, {
          success: result.success,
          message: result.message,
        });
      }
    } catch (error) {
      console.error("Error saving testimonial member:", error);
      toast.error(error instanceof Error ? error.message : "Failed to update");
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (open && testimonial) {
      form.reset({
        name: testimonial.name || "",
        designation: testimonial.designation || "",
        description: testimonial.description || "",
        image: undefined,
      });
      setPreview(testimonial.image || "");
    }
  }, [open, testimonial, form]);

  const handleDialogClose = () => {
    form.reset();
    setPreview("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle>
                {action === "edit" ? "Update Testimonial" : "Confirmation"}
              </DialogTitle>
              <DialogDescription className="sr-only">
                This is update testimonial dialog
              </DialogDescription>
            </DialogHeader>
            <Separator className="mt-3 mb-2" />

            {action === "edit" ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Designation */}
                  <FormField
                    control={form.control}
                    name="designation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Designation *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your designation"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Short Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter short description"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image Upload */}
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormLabel>Image *</FormLabel>
                      <FormControl>
                        <Input
                          ref={inputFileRef}
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          onChange={handleImageChange}
                          className="cursor-pointer"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {preview && (
                  <div className="mt-2">
                    <Image
                      width={80}
                      height={80}
                      src={
                        preview.startsWith("data:")
                          ? preview
                          : `${baseURL}/${preview}`
                      }
                      alt="Preview"
                      className="rounded border"
                    />
                  </div>
                )}
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
                onClick={() => onSave(testimonial as TestimonialTypes)}
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
