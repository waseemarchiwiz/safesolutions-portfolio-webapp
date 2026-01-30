"use client";

import ErrorComponent, { ErrorPageProps } from "@/components/common/error";

// Error
export default function Error({ error, reset }: ErrorPageProps) {
  return <ErrorComponent error={error} reset={reset} />;
}
