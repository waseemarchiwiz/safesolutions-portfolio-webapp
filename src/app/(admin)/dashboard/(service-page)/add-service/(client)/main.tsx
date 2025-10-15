"use client";

import React, { useEffect } from "react";
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
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AddServiceFormValues,
  buildServiceSchema,
} from "../(validation)/validation";
import { ServiceTypes } from "../../services/columns";
import { TagsInput } from "@/components/common/tags-input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { iconsMap } from "@/app/(website)/project/data";
import { AddServiceAction, UpdateServiceAction } from "../(actions)/action";

interface ServiceFormPropTypes {
  service?: ServiceTypes;
}

export default function AddServiceForm({ service }: ServiceFormPropTypes) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const form = useForm<AddServiceFormValues>({
    resolver: zodResolver(buildServiceSchema(!!editId)),
    defaultValues: {
      tab: service?.tab || "",
      title: service?.title || "",
      slug: service?.slug || "",
      icon: service?.icon || "",
      description: service?.description || "",
      features: service?.features || [],
      link: service?.link || "",
      overview: service?.overview || "",
      technologies: service?.technologies || [],
      industries: service?.industries || [],
      useCases: service?.useCases || [],
    },
  });

  async function onSubmit(values: AddServiceFormValues) {
    const editId = service?.id;
    try {
      const result = editId
        ? await UpdateServiceAction(values, service?.id as number)
        : await AddServiceAction(values);
      console.log("resul-===--", result);
      if (result.success) {
        toast.success(result.message);
        router.replace("services");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error("Error saving service. Please try again.");
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

  return (
    <div className="mx-6">
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Row 1: Tab + Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="Service title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug *</FormLabel>
                      <FormControl>
                        <Input placeholder="Service slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter description"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="overview"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Overview</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Overview for software service"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="External portfolio link (if any)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Row 4: Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features</FormLabel>
                      <FormControl>
                        <TagsInput
                          value={field.value || []}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="technologies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technologies</FormLabel>
                      <FormControl>
                        <TagsInput
                          value={field.value || []}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="industries"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industries</FormLabel>
                      <FormControl>
                        <TagsInput
                          value={field.value || []}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="useCases"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Use Cases</FormLabel>
                      <FormControl>
                        <TagsInput
                          value={field.value || []}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4 mt-5">
                {editId ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => form.reset()}
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
                    ? "Processing..."
                    : `${editId ? "Update" : "Add"} Service`}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
