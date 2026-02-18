"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { CompanyFormValues, companySchema } from "../(validation)/validation";
import { AddCompanyAction } from "../(action)/action";
import { LoaderCircle } from "@/components/common/loader";

export default function AddCompanyForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      slug: "",
      email: "",
      link: "",
      description: "",
      image: undefined,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFormReset = () => {
    form.reset();
    setPreview(null);
    if (inputFileRef.current) inputFileRef.current.value = "";
  };

  const handleFormSubmit = async (values: CompanyFormValues) => {
    console.log("values---", values);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("link", values.link as string);
    formData.append("slug", values.slug);
    formData.append("email", values.email);
    formData.append("description", values.description);

    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    console.log("values: --", values);

    console.log("formData---", formData);

    try {
      const result = await AddCompanyAction(formData);
      console.log("result---", result);

      if (result.success) {
        handleFormReset();
        toast.success(result.message);
        router.replace("companies");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error saving Company Company:", error);
      toast.error("Error saving Company Company. Please try again.");
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
    <div className={cn("mx-6")}>
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-6"
            >
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

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your company Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Link */}
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your company link"
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
                    {preview && (
                      <div className="mt-2">
                        <Image
                          width={150}
                          height={250}
                          src={preview}
                          alt="Preview"
                          className="rounded border"
                        />
                      </div>
                    )}
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
                >
                  Reset
                </Button>

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className=" bg-sky-600 hover:bg-sky-700"
                  onClick={() => console.log("Add Company clicked")}
                >
                  {form.formState.isSubmitting ? (
                    <LoaderCircle size={20} />
                  ) : (
                    "Add Company"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
