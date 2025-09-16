"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema } from "../(validation)/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CareerTypes } from "../page";
import { SubmitApplyAction } from "../(actions)/action";
import { fa } from "zod/v4/locales";
import { toast } from "sonner";

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const ApplyModal = ({
  modalOpen,
  onOpenChange,
  selectedJob,
  emails,
  setSelectedEmail,
}: {
  modalOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedJob: CareerTypes;
  emails: { name: string; email: string }[];
  // handleSubmit: (
  //   data: ApplicationFormValues
  // ) => Promise<{ success: boolean; result: []; message: string }>;
  setSelectedEmail: (email: string) => void;
}) => {
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      resume: null,
      experience: "",
      message: "",
      portfolioType: "",
      portfolioUrl: "",
      portfolioFile: null,
    },
  });

  if (!selectedJob) return null;

  const SubmitForm = async (values: ApplicationFormValues) => {
    const formData = new FormData();

    // Append everything except files
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("message", values.message);
    formData.append("experience", values.experience);
    formData.append("portfolioType", values.portfolioType);

    // Resume
    if (values.resume instanceof File) {
      formData.append("resume", values.resume);
    }

    // Portfolio
    if (values.portfolioType === "url" && values.portfolioUrl) {
      formData.append("portfolioUrl", values.portfolioUrl);
    }
    if (
      values.portfolioType === "file" &&
      values.portfolioFile instanceof File
    ) {
      formData.append("portfolioFile", values.portfolioFile);
    }

    // ✅ Debug: inspect keys
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    // Send
    try {
      const response = await SubmitApplyAction(formData);
      if (response.success) {
        toast.success(response.message);
        onOpenChange(false);
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to submit application"
      );
    }
  };

  return (
    <Dialog open={modalOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Apply for {selectedJob.title}
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to apply for this job.
          </DialogDescription>
        </DialogHeader>

        {/* Email select dropdown */}
        <div className="my-4">
          <label className="block text-sm font-medium mb-1">Select Email</label>
          <select
            onChange={(e) => setSelectedEmail(e.target.value)}
            className="block w-full p-2 bg-muted text-foreground border border-input rounded-md"
          >
            <option value="">Select Email</option>
            {emails?.map((item, index) => (
              <option key={index} value={item.email}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(SubmitForm)}
            className="space-y-4"
            encType="multipart/form-data"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@mail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Experience Level</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 3 years" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Resume Upload */}
            <FormField
              control={form.control}
              name="resume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload CV</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        field.onChange(file); // set into react-hook-form
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Portfolio Type */}
            <FormField
              control={form.control}
              name="portfolioType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Portfolio Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="url">URL</SelectItem>
                      <SelectItem value="file">File Upload</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Conditional fields */}
            {form.watch("portfolioType") === "url" && (
              <FormField
                control={form.control}
                name="portfolioUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Portfolio URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {/* Portfolio File Upload */}
            {form.watch("portfolioType") === "file" && (
              <FormField
                control={form.control}
                name="portfolioFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Portfolio</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          field.onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {/* Message */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Write your message..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                onClick={() => console.log("buttion clilced: ")}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyModal;
