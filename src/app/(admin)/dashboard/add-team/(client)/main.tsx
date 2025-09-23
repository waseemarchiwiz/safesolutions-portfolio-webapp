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
import { buildTeamSchema, TeamFormValues } from "../(validation)/validation";
import { apiClient, baseURL } from "@/lib/api-config/client";
import { ReturnPayload } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { TeamTypes } from "../../teams/columns";

interface TeamFormProps {
  member?: TeamTypes;
}

export default function TeamForm({ member }: TeamFormProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(buildTeamSchema),
    defaultValues: {
      name: "",
      role: "",
      githubUrl: "",
      linkedinUrl: "",
      twitterUrl: "",
      image: undefined,
    },
  });

  // Load existing image for edit
  useEffect(() => {
    if (member?.image) {
      setPreview(`${baseURL}/${member.image}`);
    } else {
      setPreview(null);
    }
  }, [member?.image]);

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

  async function onSubmit(values: TeamFormValues) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("role", values.role);
    if (values.githubUrl) formData.append("github", values.githubUrl);
    if (values.linkedinUrl) formData.append("linkedin", values.linkedinUrl);
    if (values.twitterUrl) formData.append("twitter", values.twitterUrl);
    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    try {
      const result: ReturnPayload = await apiClient.post(
        "admin/store/team",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (result.success) {
        handleFormReset();
        toast.success(result.message);
        router.replace("teams");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error saving team member:", error);
      toast.error("Error saving team member. Please try again.");
    }
  }

  return (
    <div className={cn("mx-6")}>
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                {/* Role */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter role" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* GitHub */}
                <FormField
                  control={form.control}
                  name="githubUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* LinkedIn */}
                <FormField
                  control={form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/in/username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Twitter */}
                <FormField
                  control={form.control}
                  name="twitterUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Twitter URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://twitter.com/username"
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
                            width={250}
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
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4 mt-5">
                {member?.id ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    disabled={form.formState.isSubmitting}
                  >
                    Cancel
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleFormReset}
                    disabled={form.formState.isSubmitting}
                  >
                    Reset
                  </Button>
                )}

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="min-w-[120px] bg-indigo-500 hover:bg-indigo-400"
                >
                  {form.formState.isSubmitting ? "Processing" : `Add Member`}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
