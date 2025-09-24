"use client";

import * as React from "react";
import { IconInnerShadowTop } from "@tabler/icons-react";

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
  LayoutDashboard,
  NotepadTextIcon,
  Quote,
  Users2,
} from "lucide-react";
import Link from "next/link";

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
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Safe Solutions.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
