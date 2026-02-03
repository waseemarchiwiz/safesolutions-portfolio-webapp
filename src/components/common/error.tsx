import React from "react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { usePathname } from "next/navigation";

export interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorComponent = ({ error, reset }: ErrorPageProps) => {
  const pathname = usePathname();

  // redirect to home page
  const handleGoHome = () => {
    // redirect to dashboard if on dashboard
    if (pathname.startsWith("/dashboard")) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/";
    }
  };

  return (
    <main className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden px-6">
      {/* Decorative Background Blur */}
      <div className="absolute -top-24 -z-10 h-64 w-64 rounded-full bg-sky-500/10 blur-[120px]" />
      <div className="absolute -bottom-24 -z-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="w-full max-w-lg text-center">
        {/* Subtle Icon/Label */}
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-500/10">
          <svg
            className="h-8 w-8 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Something went wrong
        </h1>

        <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
          We encountered an unexpected error. This has been logged, but you can
          try refreshing the section or heading back home.
        </p>

        {/* Technical Error Snippet (Optional - remove if you want it ultra-clean) */}
        <div className="mt-6 rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800/50">
          <code className="text-xs text-zinc-500 dark:text-zinc-500 break-all">
            {error.message || "Unknown error occurred"}
          </code>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            variant="outline"
            className="cursor-pointer bg-sky-600 hover:bg-sky-700 text-white hover:text-white"
            onClick={handleGoHome}
          >
            Go Home
          </Button>
          <Button onClick={reset}>Try Again</Button>
        </div>
      </div>
    </main>
  );
};

export default ErrorComponent;
