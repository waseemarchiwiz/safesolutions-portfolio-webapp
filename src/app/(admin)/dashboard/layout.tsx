import type { Metadata } from "next";
import "@/app/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { title, description } from "@/app/meta";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title,
  description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sidebarState = cookieStore.get("sidebar_state");
  const defaultOpen = sidebarState ? sidebarState.value === "true" : true;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider disableTransitionOnChange>
          <SidebarProvider
            defaultOpen={defaultOpen}
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 72)",
                "--header-height": "calc(var(--spacing) * 12)",
              } as React.CSSProperties
            }
          >
            <AppSidebar variant="inset" />
            <SidebarInset>
              <SiteHeader />
              {children}
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
        {/* Toast */}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
