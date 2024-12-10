import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import logo from "../assets/logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "Blogs",
    url: "/admin/blogs",
    icon: Inbox,
  },
  {
    title: "Teams",
    url: "/admin/Teams",
    icon: Calendar,
  },
  {
    title: "Projects",
    url: "/admin/projects",
    icon: Search,
  },
  {
    title: "Careers",
    url: "/admin/careers",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <div className="flex flex-col gap-20  py-10  ">
            <SidebarGroupLabel>
              <img src={logo} alt="" />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="gap-6 hover:bg-[#2477bb] hover:text-white"
                    >
                      <a href={item.url}>
                        <item.icon />
                        <span className="text-[20px]   ">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
