"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";
import { AddBlogFormValues, addBlogSchema } from "../(validation)/validation";
import EditorClient from "./editor";
import { apiClient } from "@/lib/api-config/client";
import { ReturnPayload } from "@/lib/types";

export default function AddBlogForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [previews, setPreviews] = useState<string[]>([]);

  const form = useForm<AddBlogFormValues>({
    resolver: zodResolver(addBlogSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "", // ✅ must initialize as string
      images: [], // ✅ must initialize as array
    },
  });

  const inputFileRef = useRef<HTMLInputElement>(null);

  // image preview handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      form.setValue("images", files, { shouldValidate: true });
      // create previews
      const fileReaders = files.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          })
      );
      Promise.all(fileReaders).then((urls) => setPreviews(urls));
    }
  };

  const handleFormReset = () => {
    form.reset();
    setPreviews([]);
    if (inputFileRef.current) inputFileRef.current.value = "";
  };

  async function onSubmit(values: AddBlogFormValues) {
    console.log("blog data to submit:", values);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("content", values.content);

    // ✅ append all images
    values.images.forEach((file, idx) => {
      formData.append("image", file);
    });

    try {
      const result: ReturnPayload = await apiClient.post(
        "admin/store/blog",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (result.success) {
        handleFormReset();
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      toast.error("Error adding blog. Please try again.");
    }
  }

  return (
    <div className={cn("mx-6", className)} {...props}>
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter blog title" {...field} />
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

              {/* Image Upload (Multiple) */}
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Images *</FormLabel>
                    <FormControl>
                      <Input
                        ref={inputFileRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        multiple
                        onChange={handleImageChange}
                        className="cursor-pointer"
                      />
                    </FormControl>
                    <FormMessage />
                    {previews.length > 0 && (
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {previews.map((src, idx) => (
                          <Image
                            key={idx}
                            width={250}
                            height={150}
                            src={src}
                            alt={`Preview ${idx + 1}`}
                            className="rounded border"
                          />
                        ))}
                      </div>
                    )}
                  </FormItem>
                )}
              />

              {/* Rich Text Editor */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content *</FormLabel>
                    <FormControl>
                      <EditorClient
                        initialValue={field.value || "<p>Welcome!</p>"}
                        onEditorChange={(val) => field.onChange(val)} // ✅ update RHF
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex justify-end space-x-4 mt-5">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleFormReset}
                  disabled={form.formState.isSubmitting}
                  className="hover:text-indigo-500"
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="min-w-[120px] bg-indigo-500 hover:bg-indigo-400"
                >
                  {form.formState.isSubmitting ? "Adding..." : "Add Blog"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
