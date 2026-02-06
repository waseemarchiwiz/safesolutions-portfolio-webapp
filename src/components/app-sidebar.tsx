"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Briefcase,
  Building,
  FolderCheck,
  LayoutDashboard,
  NotepadTextIcon,
  Quote,
  Store,
  Users2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    isActive: true,
  },
  {
    title: "Blogs",
    url: "/dashboard/blogs",
    icon: NotepadTextIcon,
    isActive: false,
    items: [
      {
        title: "Add Blog",
        url: "/dashboard/add-blog",
      },
      {
        title: "All blogs",
        url: "/dashboard/blogs",
      },
    ],
  },
  {
    title: "Teams",
    url: "/dashboard/teams",
    icon: Users2,
    isActive: false,
    items: [
      {
        title: "Add Team",
        url: "/dashboard/add-team",
      },
      {
        title: "All teams",
        url: "/dashboard/teams",
      },
    ],
  },
  {
    title: "Careers",
    url: "/dashboard/careers",
    icon: Briefcase,
    isActive: false,
    items: [
      {
        title: "Add careers",
        url: "/dashboard/add-career",
      },
      {
        title: "All careers",
        url: "/dashboard/careers",
      },
    ],
  },
  {
    title: "Testimonials",
    url: "/dashboard/testimonials",
    icon: Quote,
    isActive: false,
    items: [
      {
        title: "Add Testimonials",
        url: "/dashboard/add-testimonial",
      },
      {
        title: "All Testimonials",
        url: "/dashboard/testimonials",
      },
    ],
  },
  {
    title: "FAQs",
    url: "/dashboard/faqs",
    icon: NotepadTextIcon,
    isActive: false,
    items: [
      {
        title: "Add FAQ",
        url: "/dashboard/add-faq",
      },
      {
        title: "All FAQ",
        url: "/dashboard/faqs",
      },
    ],
  },
  {
    title: "Companies",
    url: "/dashboard/companies",
    icon: Building,
    isActive: false,
    items: [
      {
        title: "Add Company",
        url: "/dashboard/add-company",
      },
      {
        title: "All company",
        url: "/dashboard/companies",
      },
    ],
  },
  {
    title: "Services",
    url: "/dashboard/services",
    icon: Store,
    isActive: false,
    items: [
      {
        title: "Add Service",
        url: "/dashboard/add-service",
      },
      {
        title: "All service",
        url: "/dashboard/services",
      },
    ],
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: FolderCheck,
    isActive: false,
    items: [
      {
        title: "Add Project",
        url: "/dashboard/add-project",
      },
      {
        title: "All project",
        url: "/dashboard/projects",
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="offcanvas"
      className=" border border-slate-200/80 shadow-sm rounded-2xl rounded-r-none overflow-hidden"
      {...props}
    >
      <SidebarHeader className="border-b border-slate-200/80">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-0 hover:bg-transparent "
            >
              <Link href="/dashboard" className="flex items-center gap-3 group">
                <div className="relative">
                  <Image
                    src={"/updated-logo.png"}
                    width={36}
                    height={36}
                    alt="Logo"
                    className="object-cover rounded-lg"
                  />
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 bg-sky-400/10 rounded-lg transition-colors" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-base font-semibold text-slate-900">
                    Safe Solutions
                  </span>
                  {/* <span className="text-xs text-slate-500">Admin Panel</span> */}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200/80 p-3">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
