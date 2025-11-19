"use client";

import { IconDotsVertical, IconLogout } from "@tabler/icons-react";
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
import React from "react";

export function NavUser() {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  // Example user data
  const user = {
    name: "Admin User",
    email: "admin@gmail.com",
    image: "https://avatars.githubusercontent.com/u/9919?s=200&v=4", // example avatar (GitHub logo)
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-muted/60 hover:bg-muted/40 transition-colors rounded-lg px-2 py-2 flex items-center gap-3"
            >
              {/* Avatar */}
              <Avatar className="h-9 w-9 border border-gray-200 dark:border-gray-700">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="bg-sky-600 text-white text-sm font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="grid text-left text-sm leading-tight">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {user.name}
                </span>
                <span className="text-xs text-gray-500 truncate">
                  {user.email}
                </span>
              </div>

              {/* Dots icon */}
              <IconDotsVertical className="ml-auto size-4 text-gray-500" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* Dropdown Content */}
          <DropdownMenuContent
            className="w-60 rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg bg-white dark:bg-gray-900"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={6}
          >
            {/* User Header */}
            <DropdownMenuLabel className="p-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-gray-200 dark:border-gray-700">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="bg-sky-600 text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid text-sm leading-tight">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {user.name}
                  </span>
                  <span className="text-xs text-gray-500 truncate">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* Logout */}
            <DropdownMenuItem
              onClick={handleSignOut}
              className="flex items-center gap-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer"
            >
              <IconLogout size={16} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
