import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "@/app/styles/globals.css";
import Footer from "./(shared)/footer";
import { Toaster } from "@/components/ui/sonner";
import Header from "./(shared)/header";
import ScrollToTop from "./(shared)/scroll-to-top";
import { description, title } from "../meta";

// meta data
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
      <body className="relative">
        <ThemeProvider disableTransitionOnChange>
          <main>
            <Header />
            {children}
            <Footer />
          </main>
        </ThemeProvider>
        {/* Toast */}
        <Toaster richColors position="top-right" />
        {/* Scroll to Top Button */}
        <ScrollToTop />
      </body>
    </html>
  );
}
