"use client";

import React from "react";
import Link from "next/link";
import { XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomLogo from "./logo";
import { usePathname } from "next/navigation";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blogs", href: "/blogs" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export interface CustomDrawerPropsTypes {
  direction?: "left" | "right" | "top" | "bottom";
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function MobileNavDrawer({
  isOpen,
  onOpenChange,
}: CustomDrawerPropsTypes) {
  const url = usePathname();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onOpenChange}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer content */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className="fixed right-0 top-0 z-50 h-full w-full bg-black text-white shadow-xl"
          >
            {/* ---------- HEADER ---------- */}
            <div className="flex items-center justify-between border-b border-white/15 p-5">
              <CustomLogo color="white" />
              <button
                onClick={onOpenChange}
                aria-label="Close Menu"
                className="rounded-lg border border-white/30 p-2 hover:bg-white/20 transition-all"
              >
                <XIcon className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* ---------- MENU LINKS ---------- */}
            <nav className="flex flex-col gap-2 px-6 py-8 text-lg font-medium">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={onOpenChange}
                  className={`${
                    item.href === url ? "bg-sky-600" : ""
                  } flex items-center justify-center rounded-md px-4 py-3 hover:bg-white/10 transition-colors duration-200`}
                >
                  <span>{item.name}</span>
                  {/* <ChevronRight className="h-4 w-4 opacity-80" /> */}
                </Link>
              ))}
            </nav>

            {/* ---------- FOOTER ---------- */}
            {/* <div className="absolute bottom-0 left-0 w-full border-t border-white/20 bg-white/10 p-6">
              <Link href="/contact" onClick={onOpenChange}>
                <Button className="cursor-pointer w-full rounded-full bg-sky-600 text-white hover:bg-sky-700 hover:text-white transition-all">
                  Contact Us
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
            </div> */}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
