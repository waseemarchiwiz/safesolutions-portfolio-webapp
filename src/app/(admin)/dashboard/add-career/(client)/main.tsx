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
import { apiClient } from "@/lib/api-config/client";
import { ReturnPayload } from "@/lib/types";
import { useRouter } from "next/navigation";
import { buildJobSchema, JobFormValues } from "../(validation)/validation";

interface JobFormProps {
  job?: {
    id?: number;
    title: string;
    description: string;
    location: string;
    shortDescription: string;
    easyApply?: string;
  };
}

export default function JobForm() {
  const [preview, setPreview] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(buildJobSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      shortDescription: "",
      easyApply: "",
    },
  });

  const handleFormReset = () => {
    form.reset();
  };

  async function onSubmit(values: JobFormValues) {
    // change names
    const newObj = {
      title: values.title,
      short_description: values.shortDescription,
      location: values.location,
      job_description: values.description,
      link: values.easyApply,
    };

    try {
      const result: ReturnPayload = await apiClient.post(
        "admin/store/career",
        newObj
      );

      if (result.success) {
        handleFormReset();
        toast.success(result.message);
        router.replace("careers");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error saving job:", error);
      toast.error("Error saving job. Please try again.");
    }
  }

  return (
    <div className={cn("mx-6")}>
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
                      <Input placeholder="Enter job title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Short Description */}
              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter short description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter full description"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter location" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Easy Apply */}
              <FormField
                control={form.control}
                name="easyApply"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Easy Apply</FormLabel>
                    <FormControl>
                      <Input placeholder="Easy apply link" {...field} />
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
                >
                  Reset
                </Button>

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="min-w-[120px] bg-indigo-500 hover:bg-indigo-400"
                >
                  {form.formState.isSubmitting ? "Processing" : "Add Job"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
