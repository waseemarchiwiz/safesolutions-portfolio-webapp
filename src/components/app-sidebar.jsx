import React from "react";
import { Calendar, Home, Inbox, Settings } from "lucide-react";
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
import { FaBriefcase, FaIdCard, FaQuoteLeft } from "react-icons/fa";

const items = [
  { title: "Dashboard", url: "dashboard", icon: Home },
  { title: "Blogs", url: "/admin/blogs", icon: Inbox },
  { title: "Teams", url: "/admin/Teams", icon: Calendar },

  { title: "Careers", url: "/admin/careers", icon: FaBriefcase },
  { title: "Testimonials", url: "/admin/testimonials", icon: FaQuoteLeft },
  { title: "Faqs", url: "/admin/faqs", icon: FaIdCard },

  { title: "Setings", url: "/admin/settings", icon: Settings },
];

export function AppSidebar() {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  // const { logout } = useAuth();
  // const location = useLocation();

  const handleLogout = () => {
    setLoading(true); // Start loader
    setTimeout(() => {
      localStorage.removeItem("apiusertoken");
      setLoading(false); // Stop loader
      navigate("/admin/login");
    }, 3000); // Simulate logout delay
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
            disabled={loading} // Disable button when loading
            className="w-full px-4 py-3 text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
          >
            {loading ? (
              <>
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4v4m0 8v4m4-4h4m-8 0H4"
                  />
                </svg>
                Logging out...
              </>
            ) : (
              <>
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
              </>
            )}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
