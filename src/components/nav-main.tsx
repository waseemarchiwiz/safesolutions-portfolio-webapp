"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-1">
        {items.map((item) => {
          const isActive =
            pathname === item.url ||
            item.items?.some((subItem) => pathname === subItem.url);

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  {item.items !== undefined ? (
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`
                        group relative rounded-lg transition-all duration-200
                        hover:bg-slate-100 hover:text-slate-900
                        ${isActive ? "bg-sky-50 text-sky-700 font-medium" : "text-slate-700"}
                      `}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-sky-600 rounded-r" />
                      )}

                      <span
                        className={`
                        flex items-center justify-center w-5 h-5
                        ${isActive ? "text-sky-600" : "text-slate-500 group-hover:text-slate-700"}
                      `}
                      >
                        {item.icon && <item.icon className="w-5 h-5" />}
                      </span>
                      <span className="flex-1">{item.title}</span>
                      <ChevronRight
                        className={`
                        w-4 h-4 transition-transform duration-200 
                        group-data-[state=open]/collapsible:rotate-90
                        ${isActive ? "text-sky-600" : "text-slate-400"}
                      `}
                      />
                    </SidebarMenuButton>
                  ) : (
                    <Link href={item.url}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={`
                          group relative rounded-lg transition-all duration-200
                          hover:bg-slate-100 hover:text-slate-900
                          ${isActive ? "bg-sky-50 text-sky-700 font-medium" : "text-slate-700"}
                        `}
                      >
                        {/* Active indicator */}
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 bg-sky-600 rounded-r" />
                        )}

                        <span
                          className={`
                          flex items-center justify-center w-5 h-5
                          ${isActive ? "text-sky-600" : "text-slate-500 group-hover:text-slate-700"}
                        `}
                        >
                          {item.icon && <item.icon className="w-5 h-5" />}
                        </span>
                        <span className="flex-1">{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
                  )}
                </CollapsibleTrigger>

                {item.items !== undefined && (
                  <CollapsibleContent className="mt-1">
                    <SidebarMenuSub className="ml-5 border-l-2 border-slate-200 pl-3 space-y-1">
                      {item.items?.map((subItem) => {
                        const isSubActive = pathname === subItem.url;

                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              className={`
                                relative rounded-md transition-all duration-200
                                hover:bg-slate-100 hover:text-slate-900
                                ${isSubActive ? "bg-sky-50 text-sky-700 font-medium" : "text-slate-600"}
                              `}
                            >
                              <Link href={subItem.url}>
                                {/* Active dot indicator */}
                                {isSubActive && (
                                  <span className="absolute -left-[1.05rem] top-1/2 -translate-y-1/2 w-2 h-2 bg-sky-600 rounded-full" />
                                )}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
