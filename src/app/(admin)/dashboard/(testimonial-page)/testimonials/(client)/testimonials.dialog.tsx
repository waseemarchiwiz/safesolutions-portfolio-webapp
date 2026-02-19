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
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { TestimonialTypes } from "../columns";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  EditTestimonialsFormValues,
  EditTestimonialsSchema,
} from "../(validation)/validation";
import { onSaveTypes } from "../../../types";
import {
  DeleteTestimonialsAction,
  UpdateTestimonialsAction,
} from "../(actions)/actions";
import { Loader, LoaderCircle } from "@/components/common/loader";
import { Loader2 } from "lucide-react";

interface EditTestimonialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testimonial: TestimonialTypes | null;
  onSave: (result: onSaveTypes) => void;
  action: string;
}

export default function TestimonialDialog({
  open,
  onOpenChange,
  testimonial,
  onSave,
  action,
}: EditTestimonialDialogProps) {
  // use form
  const form = useForm<EditTestimonialsFormValues>({
    resolver: zodResolver(EditTestimonialsSchema),
    defaultValues: {
      name: testimonial?.name || "",
      slug: testimonial?.slug || "",
      designation: testimonial?.designation || "",
      description: testimonial?.description || "",
      image: undefined,
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>(testimonial?.url || "");
  const inputFileRef = useRef<HTMLInputElement>(null);

  const submitButtonText = action === "edit" ? "Save" : "Yes";

  const formSubmit = async (values: EditTestimonialsFormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("slug", values.slug);
    formData.append("designation", values.designation);
    formData.append("description", values.description);

    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    if (testimonial?.id) {
      formData.append("id", String(testimonial?.id));
    }

    try {
      const result = await UpdateTestimonialsAction(formData);
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
        slug: testimonial.slug || "",
        description: testimonial.description || "",
        image: undefined,
      });
      setPreview(testimonial.url || "");
      setLoading(false);
    }
  }, [open, testimonial, form]);

  const handleDialogClose = () => {
    form.reset();
    setPreview("");
    onOpenChange(false);
  };

  // For delete
  const handeDelete = async () => {
    // data
    try {
      setLoading(true);
      // call delete action
      const result = await DeleteTestimonialsAction(testimonial?.id as number);
      console.log("result: ", result);
      onSave({ success: result.success, message: result.message });
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

  // Auto-generate slug from title
  const watchedName = form.watch("name");
  useEffect(() => {
    if (watchedName) {
      const slug = watchedName
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
      form.setValue("slug", slug);
    }
  }, [watchedName, form]);

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
            <Separator />

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

                  {/* slug */}
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter slug" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
                      src={testimonial?.url as string}
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
                disabled={form.formState.isSubmitting}
                type={action === "edit" ? "submit" : "button"}
                variant={action === "edit" ? "default" : "destructive"}
                onClick={() => action !== "edit" && handeDelete()}
                className={` ${action === "edit" && "bg-sky-600 hover:bg-sky-600"} `}
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
