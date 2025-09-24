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
import { FaqFormValues, FaqSchema } from "../(validation)/validation";
import { Textarea } from "@/components/ui/textarea";

export default function JobForm() {
  const router = useRouter();

  const form = useForm<FaqFormValues>({
    resolver: zodResolver(FaqSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const handleFormReset = () => {
    form.reset();
  };

  async function onSubmit(values: FaqFormValues) {
    try {
      const result: ReturnPayload = await apiClient.post(
        "admin/store/faq",
        values
      );

      if (result.success) {
        handleFormReset();
        toast.success(result.message);
        router.replace("faqs");
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
              {/* Question */}
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter job question" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Answer */}
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer *</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your answer"
                        {...field}
                        className="min-h-32"
                      />
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
                  {form.formState.isSubmitting ? "Processing" : "Add Faq"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
