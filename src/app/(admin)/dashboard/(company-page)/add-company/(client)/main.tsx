"use client";

import React from "react";
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
import { apiClient } from "@/lib/api-config/client";
import { ReturnPayload } from "@/lib/types";
import { useRouter } from "next/navigation";
import { CompanyFormValues, companySchema } from "../(validation)/validation";

export default function AddCompanyForm() {
  const router = useRouter();

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const handleFormReset = () => {
    form.reset();
  };

  async function onSubmit(values: CompanyFormValues) {
    try {
      const result: ReturnPayload = await apiClient.post(
        "admin/company", // it is company | need to change from the backend
        values
      );

      if (result.success) {
        handleFormReset();
        toast.success(result.message);
        router.replace("companies");
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
              {/* Company */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
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
                  className="min-w-[100px] bg-indigo-500 hover:bg-indigo-400"
                >
                  {form.formState.isSubmitting ? "Processing" : "Add"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
