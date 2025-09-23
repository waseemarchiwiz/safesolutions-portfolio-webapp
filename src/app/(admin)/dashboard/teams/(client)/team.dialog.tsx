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
import { TeamTypes } from "../columns";

import { ReturnPayload } from "@/lib/types";
import { apiClient, baseURL } from "@/lib/api-config/client";
import {
  EditBuildTeamSchema,
  EditTeamFormValues,
} from "../(validation)/validation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface EditTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  team: TeamTypes | null;
  onSave: (
    updated: TeamTypes,
    result?: { success?: boolean; message?: string }
  ) => void;
  action: string;
}

export default function EditTeamDialog({
  open,
  onOpenChange,
  team,
  onSave,
  action,
}: EditTeamDialogProps) {
  const form = useForm<EditTeamFormValues>({
    resolver: zodResolver(EditBuildTeamSchema),
    defaultValues: {
      name: team?.name || "",
      role: team?.role || "",
      githubUrl: team?.github || "",
      linkedinUrl: team?.linkedin || "",
      twitterUrl: team?.twitter || "",
      image: undefined,
    },
  });

  const [preview, setPreview] = useState<string>(team?.image || "");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const submitButtonText = action === "edit" ? "Save" : "Yes";

  const formSubmit = async (values: EditTeamFormValues) => {
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
      const result: ReturnPayload = await apiClient.put(
        `admin/update/team/${team?.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (result.success) {
        onSave(team as TeamTypes, {
          success: result.success,
          message: result.message,
        });
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
    if (open && team) {
      form.reset({
        name: team.name || "",
        role: team.role || "",
        githubUrl: team.github || "",
        linkedinUrl: team.linkedin || "",
        twitterUrl: team.twitter || "",
        image: undefined,
      });
      setPreview(team.image || "");
    }
  }, [open, team, form]);

  const handleDialogClose = () => {
    form.reset();
    setPreview("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update team</DialogTitle>
          <DialogDescription className="sr-only">
            This is update team dialog
          </DialogDescription>
        </DialogHeader>
        <Separator className="mt-3 mb-2" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-6">
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
            </div>

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
                type="submit"
                disabled={form.formState.isSubmitting}
                className="min-w-[120px] bg-indigo-500 hover:bg-indigo-400"
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
