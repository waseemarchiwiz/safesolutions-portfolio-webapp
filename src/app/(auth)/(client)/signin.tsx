"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Eye,
  EyeClosed,
  LoaderCircle,
  Mail,
  Lock,
  LogIn,
  Shield,
  Globe,
  BarChart2,
  Users,
  Briefcase,
  Code2,
  Star,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import Link from "next/link";
import React from "react";

// --- Orbital ring helpers ---
function orbitalStyle(angle: number, radius: number): React.CSSProperties {
  const rad = (angle * Math.PI) / 180;
  return {
    position: "absolute",
    left: `calc(50% + ${radius * Math.cos(rad)}px)`,
    top: `calc(50% + ${radius * Math.sin(rad)}px)`,
    transform: "translate(-50%, -50%)",
  };
}

const innerIcons = [
  { icon: Shield, angle: 270, label: "Secure" },
  { icon: Globe, angle: 0, label: "Web" },
  { icon: BarChart2, angle: 90, label: "Stats" },
  { icon: Users, angle: 180, label: "Team" },
];

const outerIcons = [
  { icon: Briefcase, angle: 315, label: "Portfolio" },
  { icon: Code2, angle: 45, label: "Dev" },
  { icon: Star, angle: 135, label: "Quality" },
  { icon: Zap, angle: 225, label: "Fast" },
];

export default function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const formSubmit = async (values: SignInFormValues) => {
    try {
      const { error } = await signIn.email({
        email: values.email,
        password: values.password,
        callbackURL: "/dashboard",
        rememberMe,
      });
      if (error?.code) {
        toast.error(error.message);
      }
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className={cn("w-full max-w-4xl mx-4", className)} {...props}>
      <div className="overflow-hidden rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 bg-card border border-border">
        {/* ── Left: Form Panel ── */}
        <div className="p-8 md:p-10 flex flex-col justify-center">
          {/* Icon badge */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-sky-600 flex items-center justify-center shadow-md">
              <LogIn className="w-7 h-7 text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login to your account!
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Enter your registered email address and password to login!
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(formSubmit)}
              className="space-y-5"
            >
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="eg. admin@example.com"
                          className="pl-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                          {...field}
                        />
                        <span
                          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setShowPassword((p) => !p)}
                        >
                          {showPassword ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeClosed className="w-4 h-4" />
                          )}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember me + Forgot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(v) => setRememberMe(v === true)}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm cursor-pointer select-none"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                size="lg"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <LoaderCircle className="w-5 h-5 animate-spin" />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>

          <p className="text-muted-foreground text-center text-xs mt-6">
            By clicking continue, you agree to our{" "}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>

        {/* ── Right: Decorative Panel ── */}
        <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-sky-100 to-blue-200 dark:from-sky-950 dark:via-sky-900 dark:to-blue-950 p-10">
          <h2 className="text-2xl font-bold text-center text-slate-700 dark:text-slate-200 mb-1">
            Manage Your <span className="text-sky-600">Portfolio</span>
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-10 max-w-xs">
            Secure admin access to manage your SafeSolutions portfolio
          </p>

          {/* Orbital Ring */}
          <div className="relative w-64 h-64">
            {/* Outer ring */}
            <div
              className="absolute rounded-full border-2 border-sky-300/50 dark:border-sky-600/40"
              style={{
                width: 248,
                height: 248,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            {/* Inner ring */}
            <div
              className="absolute rounded-full border-2 border-sky-400/50 dark:border-sky-500/40"
              style={{
                width: 168,
                height: 168,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            {/* Center badge */}
            <div
              className="absolute w-16 h-16 rounded-2xl bg-sky-600 shadow-lg flex items-center justify-center"
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Shield className="w-8 h-8 text-white" />
            </div>
            {/* Inner ring icons (radius 84) */}
            {innerIcons.map(({ icon: Icon, angle, label }) => (
              <div
                key={label}
                className="absolute w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center"
                style={orbitalStyle(angle, 84)}
              >
                <Icon className="w-5 h-5 text-sky-600" />
              </div>
            ))}
            {/* Outer ring icons (radius 124) */}
            {outerIcons.map(({ icon: Icon, angle, label }) => (
              <div
                key={label}
                className="absolute w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-md flex items-center justify-center"
                style={orbitalStyle(angle, 124)}
              >
                <Icon className="w-5 h-5 text-sky-500" />
              </div>
            ))}
          </div>

          <p className="text-sm text-center text-muted-foreground mt-8 max-w-xs">
            Manage <strong>blogs, projects, services, teams</strong> and more
            from a single secure admin portal.
          </p>
        </div>
      </div>
    </div>
  );
}
