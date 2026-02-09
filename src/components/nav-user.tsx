"use client";

import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const user = {
    name: "Admin User",
    email: "admin@gmail.com",
    image: "https://avatars.githubusercontent.com/u/9919?s=200&v=4",
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="
                group
                data-[state=open]:bg-slate-100 
                hover:bg-slate-100 
                transition-all duration-200
                rounded-xl
                px-3 py-3
                border border-transparent
                hover:border-slate-200
              "
            >
              {/* Avatar with online status */}
              <div className="relative">
                <Avatar className="h-10 w-10 ring-2 ring-slate-200 ring-offset-2">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-sky-500 to-sky-600 text-white text-sm font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* User Info */}
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-slate-900 leading-tight">
                  {user.name}
                </p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>

              {/* Chevron */}
              <svg
                className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                />
              </svg>
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* Dropdown Content */}
          <DropdownMenuContent
            className="w-64 rounded-xl border border-slate-200 shadow-xl bg-white p-2"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
          >
            {/* User Header with gradient background */}
            <DropdownMenuLabel className="p-0">
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-sky-50 to-blue-50 p-4 mb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-sky-500 to-sky-600 text-white font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-slate-600 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>

            {/* Menu Items */}
            <Link href="profile">
              <DropdownMenuItem className="rounded-lg cursor-pointer group px-3 py-2.5">
                <IconUser className="w-4 h-4 mr-3 text-slate-500 group-hover:text-slate-700" />
                <span className="text-sm">Profile</span>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuSeparator className="my-2" />

            {/* Logout with distinct styling */}
            <DropdownMenuItem
              onClick={handleSignOut}
              className="
                rounded-lg cursor-pointer group px-3 py-2.5
                text-red-600 
                hover:bg-red-50 
                focus:bg-red-50
                transition-colors
              "
            >
              <IconLogout className="w-4 h-4 mr-3" />
              <span className="text-sm font-medium">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
