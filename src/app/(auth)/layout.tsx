import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "@/app/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { title, description } from "../meta";

export const metadata: Metadata = {
  title,
  description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex justify-center items-center min-h-dvh">
            {children}
          </main>
        </ThemeProvider>
        {/* Toast */}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
