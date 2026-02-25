"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicationSchema, ApplicationTypes } from "../(validation)/schema";
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
import { CompanyTypes } from "@/app/(admin)/dashboard/(company-page)/companies/columns";
import { toast } from "sonner";
import { CareerTypes } from "@/app/(admin)/dashboard/(career-page)/careers/columns";
import { EasyApplyAction, EasyApplyTypes } from "../(actions)/action";
import { LoaderCircle } from "@/components/common/loader";

interface ApplyModalProp {
  modalOpen: boolean;
  onOpenChange: () => void;
  selectedJob: CareerTypes;
  companies: CompanyTypes[];
  onSave: (success: boolean, message: string) => void;
}

const ApplyModal = ({
  modalOpen,
  onOpenChange,
  selectedJob,
  companies,
  onSave,
}: ApplyModalProp) => {
  // use form
  const form = useForm<ApplicationTypes>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "", // test
      email: "", // test@gmail.com
      phone: "", // 1234567890
      file: null,
      experience: "", // mid
      message: "", // testing
      portfolioType: "", // URL
      portfolioUrl: "", // http://unsplash.com
      portfolioFile: null, // null
    },
  });

  const [selectedEmail, setSelectedEmail] = useState<string>("");

  if (!selectedJob) return null;

  const handleOpenChange = (success: boolean, message: string) => {
    onOpenChange();
    onSave(success, message);
  };

  const formSubmit = async (values: ApplicationTypes) => {
    console.log("values: ", values);

    const formData = new FormData();

    // Append basic fields
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("message", values.message);
    formData.append("experience", values.experience);
    formData.append("sender_email", selectedEmail);
    formData.append("file", values.file); // resume

    if (values.portfolioType === "url") {
      formData.append("portfolioUrl", values.portfolioUrl as string);
    } else if (values.portfolioType === "file" && values.portfolioFile) {
      formData.append("portfolioFile", values.portfolioFile as File);
    }

    console.log("values ready for submission:");
    for (const [key, val] of formData.entries()) {
      console.log(`${key}:`, val);
    }

    try {
      const response = await EasyApplyAction(values as EasyApplyTypes);
      console.log("response easy apply------", response);

      if (response?.success) {
        handleOpenChange(response.success, response.message);
      } else {
        console.log("error:", response.message);
        toast.error(response.message || "Failed to submit application..");
      }
    } catch (error) {
      if (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        toast.error(errorMessage || "Failed to send your message");
      } else {
        toast.error("Unexpected error submitting form");
      }
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
          <label className="block text-sm font-medium mb-1">
            Select Company
          </label>
          <select
            onChange={(e) => setSelectedEmail(e.target.value)}
            className="block w-full p-2 bg-muted text-foreground border border-input rounded-md"
          >
            <option value="">Select Email</option>
            {companies?.map((item, index) => (
              <option key={index} value={item.email}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(formSubmit)}
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
              name="file"
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
              <Button type="button" variant="outline" onClick={onOpenChange}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="bg-sky-600 hover:bg-sky-700 cursor-pointer"
              >
                {form.formState.isSubmitting ? (
                  <LoaderCircle size={30} />
                ) : (
                  "Submit"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyModal;
