import React from "react";
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
import { useNavigate } from "react-router-dom";
// import { useAuth } from '../auth/AuthContext';
import {
  FaBriefcase,
  FaIdCard,
  FaQuoteLeft,
  FaServicestack,
} from "react-icons/fa";

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
  const navigate = useNavigate();
  // const { logout } = useAuth();
  // const location = useLocation();

  const handleLogout = () => {
    // logout();
    localStorage.removeItem("apiusertoken");
    navigate("/admin/login");
  };

  return (
    <Sidebar
      collapsible="icon"
      className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white shadow-2xl h-screen"
    >
      <SidebarContent className="flex flex-col h-full">
        <div className="flex flex-col flex-grow">
          <SidebarGroup>
            <div className="flex flex-col gap-12 py-10">
              <SidebarGroupLabel className="flex items-center justify-center">
                <img src={logo} alt="Logo" className="h-20 w-auto" />
              </SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => {
                    const isActive = location.pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                            isActive
                              ? "bg-white text-black shadow-md"
                              : "hover:bg-white/10 text-white"
                          }`}
                        >
                          <a
                            href={item.url}
                            className="flex items-center gap-4"
                          >
                            <item.icon
                              className={`w-7 h-7 transition-transform duration-300 ${
                                isActive ? "scale-125" : ""
                              }`}
                            />
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

        <div className="p-4 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-3 text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
