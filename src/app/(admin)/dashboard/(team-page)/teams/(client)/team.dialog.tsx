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
import { TeamTypes } from "../columns";
import {
  EditBuildTeamSchema,
  EditTeamFormValues,
} from "../(validation)/validation";
import { toast } from "sonner";
import { DeleteTeamAction, UpdateTeamAction } from "../(actions)/actions";
import { onSaveTypes } from "../../../types";
import { Loader2 } from "lucide-react";

interface EditTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  team: TeamTypes;
  onSave: (result: onSaveTypes) => void;
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
      slug: team?.slug || "",
      github: team?.github || "",
      linkedin: team?.linkedin || "",
      twitter: team?.twitter || "",
      image: undefined,
    },
  });

  console.log("team in dialog:----", team);

  const [preview, setPreview] = useState<string>(team?.url || "");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const submitButtonText = action === "edit" ? "Save" : "Yes";

  const [loading, setLoading] = useState<boolean>(false);

  const formSubmit = async (values: EditTeamFormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("role", values.role);
    formData.append("slug", values.slug);
    if (values.github) formData.append("github", values.github);
    if (values.linkedin) formData.append("linkedin", values.linkedin);
    if (values.twitter) formData.append("twitter", values.twitter);

    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    if (team?.id) {
      formData.append("id", String(team?.id));
    }

    try {
      const result = await UpdateTeamAction(formData);
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

  useEffect(() => {
    if (open && team) {
      form.reset({
        name: team.name || "",
        role: team.role || "",
        slug: team.slug || "",
        github: team.github || "",
        linkedin: team.linkedin || "",
        twitter: team.twitter || "",
        image: undefined,
      });
      setPreview(team.url || "");
      setLoading(false);
    }
  }, [open, team, form]);

  // For delete
  const handeDelete = async () => {
    // data
    try {
      setLoading(true);
      // call delete action
      const result = await DeleteTeamAction(team?.id as number);
      console.log("result: ", result);
      onSave({ success: result.success, message: result.message });
    } catch (error) {
      console.log("Error:", error);
      setLoading(false);
    }
  };

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
                {action === "edit" ? "Update Team" : "Confirmation"}
              </DialogTitle>
              <DialogDescription className="sr-only">
                This is update team dialog
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

                  {/* Slug */}
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug *</FormLabel>
                        <FormControl>
                          <Input placeholder="team-slug" {...field} />
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

                  {/* GitHub */}
                  <FormField
                    control={form.control}
                    name="github"
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
                    name="linkedin"
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

                  {/* Twitter */}
                  <FormField
                    control={form.control}
                    name="twitter"
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
                      src={team?.url as string}
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
                className="bg-sky-600 hover:bg-sky-600"
              >
                {loading || form.formState.isSubmitting ? (
                  <Loader2 className="animate-spin h-5 w-5" />
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
