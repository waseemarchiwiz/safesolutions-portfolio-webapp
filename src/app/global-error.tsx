"use client";

import ErrorComponent, { ErrorPageProps } from "@/components/common/error";

export default function GlobalError({ error, reset }: ErrorPageProps) {
  return (
    <html>
      <body>
        <ErrorComponent error={error} reset={reset} />
      </body>
    </html>
  );
}
