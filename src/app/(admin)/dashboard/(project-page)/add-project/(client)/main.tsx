"use client";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AddProjectFormValues,
  buildProjectSchema,
} from "../(validation)/validation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagsInput } from "@/components/common/tags-input";
import { iconsMap } from "@/app/(website)/project/data";
import { AddProjectAction, UpdateProjectAction } from "../(actions)/action";
import { ProjectTypes } from "../../projects/columns";

interface ProjectFormProps {
  project?: ProjectTypes; // extend later with ProjectTypes
}

export default function AddProjectForm({ project }: ProjectFormProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [preview, setPreview] = useState<string | null>(
    (project?.img as string) || null
  );

  const form = useForm<AddProjectFormValues>({
    resolver: zodResolver(buildProjectSchema(!!editId)),
    defaultValues: {
      name: project?.name || "",
      description: project?.description || "",
      slug: project?.slug || "",
      version: project?.version || "",
      type: (project?.type as "detailed" | "external") || "external",
      link: project?.link || "",
      services: project?.services || [],
      projectDetails: project?.projectDetails || [],
      supports: project?.supports || [],
      image: undefined,
    },
  });

  // Auto-generate slug from name
  const watchedName = form.watch("name");
  const watchedType = form.watch("type");
  useEffect(() => {
    const slug = (watchedName || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
    form.setValue("slug", slug);
  }, [watchedName, form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      form.setValue("image", file);
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

  async function onSubmit(values: AddProjectFormValues) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("slug", values.slug);
    if (values.version) formData.append("version", values.version);
    // if (values.lastUpdated) formData.append("lastUpdated", values.lastUpdated);
    formData.append("type", values.type);
    if (values.link) formData.append("link", values.link);
    if (values.image) formData.append("image", values.image);

    // Add nested fields
    formData.append("services", JSON.stringify(values.services || []));
    formData.append(
      "projectDetails",
      JSON.stringify(values.projectDetails || [])
    );
    formData.append("supports", JSON.stringify(values.supports || []));

    try {
      const result = editId
        ? await UpdateProjectAction(Number(editId), values)
        : await AddProjectAction(values);

      if (result.success) {
        handleFormReset();
        toast.success(result.message);
        router.replace("projects");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error saving project:", error);
      toast.error("Error saving project. Please try again.");
    }
  }

  console.log("add project data--", project);

  return (
    <div className="mx-6">
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name + Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project name" {...field} />
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
                        <Input placeholder="project-slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Project description"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Type + Link */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type *</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || ""}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="external">External</SelectItem>
                            <SelectItem value="detailed">Detailed</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>External Link</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {watchedType === "detailed" && (
                <>
                  {/* Services */}
                  <FormField
                    control={form.control}
                    name="services"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Services</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            {(field.value || []).map((service, idx) => (
                              <div
                                key={idx}
                                className="border p-4 rounded space-y-2"
                              >
                                <Input
                                  placeholder="Service title"
                                  value={service.title}
                                  onChange={(e) => {
                                    const updated = [...(field.value || [])];
                                    updated[idx].title = e.target.value;
                                    field.onChange(updated);
                                  }}
                                />
                                <Textarea
                                  placeholder="Service description"
                                  value={service.description}
                                  onChange={(e) => {
                                    const updated = [...(field.value || [])];
                                    updated[idx].description = e.target.value;
                                    field.onChange(updated);
                                  }}
                                />
                                <TagsInput
                                  value={service.features || []}
                                  onChange={(tags) => {
                                    const updated = [...(field.value || [])];
                                    updated[idx].features = tags;
                                    field.onChange(updated);
                                  }}
                                />
                                <Select
                                  value={service.icon}
                                  onValueChange={(val) => {
                                    const updated = [...(field.value || [])];
                                    updated[idx].icon = val;
                                    field.onChange(updated);
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select icon" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Object.keys(iconsMap).map((icon) => (
                                      <SelectItem key={icon} value={icon}>
                                        {icon}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            ))}
                            <Button
                              variant={"outline"}
                              type="button"
                              onClick={() =>
                                field.onChange([
                                  ...(field.value || []),
                                  {
                                    title: "",
                                    description: "",
                                    features: [],
                                    icon: "",
                                  },
                                ])
                              }
                            >
                              Add Service
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Project Details */}
                  <FormField
                    control={form.control}
                    name="projectDetails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Details</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            {(field.value || []).map((detail, idx) => (
                              <div
                                key={idx}
                                className="border p-4 rounded space-y-2"
                              >
                                <Input
                                  placeholder="Name"
                                  value={detail.name}
                                  onChange={(e) => {
                                    const updated = [...(field.value || [])];
                                    updated[idx].name = e.target.value;
                                    field.onChange(updated);
                                  }}
                                />
                                <Input
                                  placeholder="Deployment Type"
                                  value={detail.deploymentType}
                                  onChange={(e) => {
                                    const updated = [...(field.value || [])];
                                    updated[idx].deploymentType =
                                      e.target.value;
                                    field.onChange(updated);
                                  }}
                                />
                              </div>
                            ))}
                            <Button
                              variant={"outline"}
                              type="button"
                              onClick={() =>
                                field.onChange([
                                  ...(field.value || []),
                                  {
                                    name: "",
                                    version: "",
                                    lastUpdated: "",
                                    deploymentType: "",
                                    supportHours: "",
                                  },
                                ])
                              }
                            >
                              Add Detail
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Supports */}
                  <FormField
                    control={form.control}
                    name="supports"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supports</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            {(field.value || []).map((support, idx) => (
                              <div
                                key={idx}
                                className="border p-4 rounded space-y-2"
                              >
                                <Input
                                  placeholder="Support title"
                                  value={support.title}
                                  onChange={(e) => {
                                    const updated = [...(field.value || [])];
                                    updated[idx].title = e.target.value;
                                    field.onChange(updated);
                                  }}
                                />
                                <Textarea
                                  placeholder="Support description"
                                  value={support.description}
                                  onChange={(e) => {
                                    const updated = [...(field.value || [])];
                                    updated[idx].description = e.target.value;
                                    field.onChange(updated);
                                  }}
                                />
                                <Select
                                  value={support.icon}
                                  onValueChange={(val) => {
                                    const updated = [...(field.value || [])];
                                    updated[idx].icon = val;
                                    field.onChange(updated);
                                  }}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select icon" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Object.keys(iconsMap).map((icon) => (
                                      <SelectItem key={icon} value={icon}>
                                        {icon}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            ))}
                            <Button
                              variant={"outline"}
                              type="button"
                              onClick={() =>
                                field.onChange([
                                  ...(field.value || []),
                                  { title: "", description: "", icon: "" },
                                ])
                              }
                            >
                              Add Support
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* Image */}
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Project Image *</FormLabel>
                    <FormControl>
                      <Input
                        ref={inputFileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </FormControl>
                    <FormMessage />
                    {preview || project?.img ? (
                      <div className="mt-3">
                        <Image
                          src={preview || (project?.img as string)}
                          width={120}
                          height={120}
                          alt="Preview"
                          className="rounded border object-cover"
                        />
                      </div>
                    ) : null}
                  </FormItem>
                )}
              />

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
                    onClick={handleFormReset}
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
                    : `${editId ? "Update" : "Add"} Project`}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
