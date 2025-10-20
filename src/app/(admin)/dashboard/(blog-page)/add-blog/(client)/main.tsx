"use client";

import React, { useEffect, useRef, useState } from "react";
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
import { AddBlogFormValues, buildBlogSchema } from "../(validation)/validation";
import EditorClient from "./editor";
import { useRouter, useSearchParams } from "next/navigation";
import { BlogTypes } from "../../blogs/columns";
import { AddBlogAction, UpdateBlogAction } from "../(actions)/action";

// Types
export type ImagesTypes = { id: number; image: string; blog_id: number };

type PreviewType = ImagesTypes | { image: string }; // backend or new upload

interface BlogFormPropTypes {
  blog?: BlogTypes;
}

export default function BlogForm({ blog }: BlogFormPropTypes) {
  const [previews, setPreviews] = useState<PreviewType[]>([]);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // search params
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const form = useForm<AddBlogFormValues>({
    resolver: zodResolver(buildBlogSchema(!!editId)), // ✅ pass true if editing
    defaultValues: {
      title: blog?.title || "",
      description: blog?.description || "",
      content: blog?.content || "",
      slug: blog?.slug || "",
      images: [],
    },
  });

  // 🔹 Handle new image uploads
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      form.setValue("images", files, { shouldValidate: true });
      const readers = files.map(
        (file) =>
          new Promise<{ image: string }>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () =>
              resolve({ image: reader.result as string });
            reader.readAsDataURL(file);
          })
      );
      Promise.all(readers).then((urls) => setPreviews(urls));
    }
  };

  console.log("preview", previews);

  const handleFormReset = () => {
    form.reset();
    setPreviews([]);
    if (inputFileRef.current) inputFileRef.current.value = "";
  };

  // Submit (Add or Edit depending on uuid)
  async function onSubmit(values: AddBlogFormValues) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("content", values.content);
    formData.append("slug", values.slug);

    if (values.images && values.images.length > 0) {
      values.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    if (editId && editId !== null) formData.append("id", editId);

    try {
      const result = editId
        ? await UpdateBlogAction(formData)
        : await AddBlogAction(formData);
      console.log("resul-===--", result);

      if (result.success) {
        handleFormReset();
        toast.success(result.message);
        router.replace("blogs");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Error saving blog. Please try again.");
    }
  }

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

  // 🔹 Load previews if blog has images
  useEffect(() => {
    if (blog?.images) {
      setPreviews(blog.images as ImagesTypes[]);
    } else {
      setPreviews([]);
    }
  }, [blog?.images]);

  return (
    <div className={cn("mx-6")}>
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                {/* Slug */}
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug *</FormLabel>
                      <FormControl>
                        <Input placeholder="blog-slug" {...field} />
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

              {/* Images */}
              <FormField
                control={form.control}
                name="images"
                render={() => (
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
                      <div className="mt-2 flex items-center gap-5 flex-wrap">
                        {previews.map((p, idx) => {
                          return (
                            <Image
                              key={"id" in p ? p.id : idx}
                              width={250}
                              height={250}
                              src={p.image as string}
                              alt={`Preview ${idx + 1}`}
                              className="w-50 h-50 rounded border object-cover"
                            />
                          );
                        })}
                      </div>
                    )}
                  </FormItem>
                )}
              />

              {/* Content (TinyMCE) */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content *</FormLabel>
                    <FormControl>
                      <EditorClient
                        initialValue={field.value || "<p>Welcome!</p>"}
                        onEditorChange={(val) => field.onChange(val)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Buttons */}
              <div className="flex justify-end space-x-4 mt-5">
                {blog?.id ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={form.formState.isSubmitting}
                    className="hover:text-indigo-500"
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleFormReset}
                    disabled={form.formState.isSubmitting}
                    className="hover:text-indigo-500"
                  >
                    Reset
                  </Button>
                )}

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="min-w-[120px] bg-indigo-500 hover:bg-indigo-400"
                >
                  {form.formState.isSubmitting
                    ? "Processing"
                    : `${editId ? "Update" : "Add"} Blog`}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
