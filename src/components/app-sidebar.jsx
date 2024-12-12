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
import { useLocation } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { IoMoon, IoSunny } from "react-icons/io5";
import { FaBriefcase, FaIdCard } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";
import { FaServicestack } from "react-icons/fa6";

const items = [
  { title: "Dashboard", url: "dashboard", icon: Home },
  { title: "Blogs", url: "/admin/blogs", icon: Inbox },
  { title: "Teams", url: "/admin/Teams", icon: Calendar },
  { title: "Projects", url: "/admin/projects", icon: Search },
  { title: "Careers", url: "/admin/careers", icon: FaBriefcase },
  { title: "Testimonials", url: "/admin/testimonials", icon: FaQuoteLeft },
  { title: "Faqs", url: "/admin/faqs", icon: FaIdCard },
  { title: "Services", url: "/admin/services", icon: FaServicestack },
];

export function AppSidebar() {
  const { dark, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <Sidebar
      collapsible="icon"
      className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white shadow-2xl h-screen"
    >
      <SidebarContent className="flex flex-col h-full">
        {/* Sidebar Logo and Menu */}
        <div className="flex flex-col flex-grow">
          <SidebarGroup>
            <div className="flex flex-col gap-12 py-10">
              {/* Logo */}
              <SidebarGroupLabel className="flex items-center justify-center">
                <img src={logo} alt="Logo" className="h-20 w-auto" />
              </SidebarGroupLabel>

              {/* Sidebar Items */}
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => {
                    const isActive = location.pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300   ${
                            isActive
                              ? "bg-white text-black shadow-md    "
                              : "hover:bg-white text-white    "
                          }`}
                        >
                          <a
                            href={item.url}
                            className="flex items-center gap-4 "
                          >
                            {/* Icon */}
                            <item.icon
                              className={`w-7 h-7 hover:text-black transition-transform duration-300 ${
                                isActive ? "scale-125 " : ""
                              }`}
                            />
                            {/* Label */}
                            <span className="text-lg font-semibold">
                              {item.title}
                            </span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </div>
          </SidebarGroup>
        </div>

        {/* Sidebar Footer */}
        {/* <div className="py-6">
          <div className="flex flex-col items-center justify-center">
            <button onClick={toggleTheme} aria-label="Toggle Dark Mode">
              {dark ? (
                <div className="flex flex-row gap-2">
                  <IoSunny color="yellow" size={24} />
                  <span>Light Mode</span>
                </div>
              ) : (
                <div className="flex flex-row gap-2">
                  <IoMoon color="black" size={24} />
                  <span>Dark Mode</span>
                </div>
              )}
            </button>
          </div>
        </div> */}
      </SidebarContent>
    </Sidebar>
  );
}
