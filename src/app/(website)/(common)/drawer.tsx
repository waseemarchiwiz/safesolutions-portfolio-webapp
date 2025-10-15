"use client";

import * as React from "react";
import { ChevronRight, User, User2, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerClose,
} from "@/components/ui/drawer";
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import CustomLogo from "./logo";

// Header navigation items (same as header)
const menuItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blogs", href: "/blogs" },
  { name: "Careers", href: "/careers" },
];

export interface CustomDrawerPropsTypes {
  direction?: "left" | "right" | "top" | "bottom";
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function MobileNavDrawer({
  isOpen,
  onOpenChange,
  direction = "right",
}: CustomDrawerPropsTypes) {
  return (
    <Drawer direction={direction} open={isOpen} onOpenChange={onOpenChange}>
      <DialogTitle className="sr-only">Mobile Nav Title</DialogTitle>
      <DialogContent className="sr-only">Mobile Nav Description</DialogContent>
      <DrawerContent>
        {/* ---------- HEADER ---------- */}
        <DrawerHeader className="border-b border-slate-200/50 dark:border-slate-700/50 p-5">
          <div className="flex justify-between items-center">
            <CustomLogo />
            <DrawerClose asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        {/* ---------- MENU LINKS ---------- */}
        <div className="flex-1 overflow-y-auto py-6 px-5">
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={onOpenChange}
                className="block font-medium text-slate-800 dark:text-slate-200 rounded-lg px-3 py-3 hover:bg-sky-50 dark:hover:bg-sky-900/40 hover:text-sky-700 dark:hover:text-sky-400 transition-all"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* ---------- FOOTER ---------- */}
        <div className="border-t border-slate-200/50 dark:border-slate-800/50 p-5 space-y-4">
          <Link href="/contact" onClick={onOpenChange}>
            <Button className="w-full bg-sky-600 text-white hover:bg-sky-700 transition-all">
              Contact Us
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
