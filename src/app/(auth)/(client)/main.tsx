"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignInFormValues, signInSchema } from "../(validation)/schema";
import { LogInIcon } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-config/client";
import { useRouter } from "next/navigation";
import { ReturnPayload } from "@/lib/types";

export default function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // Form setup
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "user.test@gmail.com",
      password: "password",
    },
  });

  const router = useRouter();

  const formSubmit = async (values: SignInFormValues) => {
    try {
      // Call sign in on client side
      const result: ReturnPayload = await apiClient.post(
        "/admin/login",
        values
      );
      if (result?.success) {
        toast.success("Sign in successfull.");
        router.push("/dashboard");
      } else {
        toast.error(result?.message || "Failed to Sign in. Please try again.");
      }
    } catch (error) {
      console.error(" error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid grid-cols-1">
          <Form {...form}>
            <form
              className="px-1 py-8"
              onSubmit={form.handleSubmit(formSubmit)}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-medium">Welcome Back</h1>
                  <p className="text-muted-foreground text-balance">
                    Sign in to your account
                  </p>
                </div>

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email" className="text-md">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email address"
                          className="py-5 mt-1 focus:ring-0 focus:shadow-none focus:border-sky-600"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password" className="text-md">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          className="py-5 mt-1 focus:ring-0 focus:shadow-none focus:border-sky-600"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <div>Loading...</div>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <LogInIcon />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs text-balance">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}
