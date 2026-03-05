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
import { Eye, EyeClosed, LoaderCircle, LogInIcon } from "lucide-react";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Validation Schema
const signUpSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().nonempty("Email is required").email("Invalid email format"),
  password: z.string().min(6, "minimum 6 characters"),
});
// SignUp Form Values Types
type SignUpFormValues = z.infer<typeof signUpSchema>;

// SignUp Form
export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  // router
  const router = useRouter();
  // Form setup
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // show password
  const [showPassword, setShowPassword] = useState(false);

  // form submit
  const formSubmit = async (values: SignUpFormValues) => {
    try {
      const { data, error } = await signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      // show error message
      if (error?.code) {
        toast.error(error?.message);
      }
      // refresh the page
      router.refresh();
      console.log("response-signup--", data);
      console.log("error-signup--", error);
    } catch (error) {
      console.error(" error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className={cn("flex flex-col gap-6 mx-5", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid grid-cols-1">
          <Form {...form}>
            <form
              className="sm:px-1.5 py-8"
              onSubmit={form.handleSubmit(formSubmit)}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-medium">Welcome Back</h1>
                  <p className="text-muted-foreground text-balance py-1">
                    Sign Up to your account
                  </p>
                </div>

                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name" className="text-md">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          type="name"
                          placeholder="Enter your name address"
                          className="py-5 mt-1 focus:ring-0 focus:shadow-none focus:border-sky-600"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className=" py-5 mt-1 focus:ring-0 focus:shadow-none focus:border-sky-600"
                            {...field}
                          />
                          <span
                            className="cursor-pointer absolute top-0 right-3 my-4"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <Eye className="w-5 h-5 text-gray-500 hover:text-gray-400" />
                            ) : (
                              <EyeClosed className="w-5 h-5 text-gray-500 hover:text-gray-400" />
                            )}
                          </span>
                        </div>
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
                    <div className="flex justify-center items-center min-h-dvh">
                      <LoaderCircle className="animate-spin" />
                    </div>
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
      <div className="text-muted-foreground text-center text-xs sm:text-balance">
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
