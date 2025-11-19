"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CustomLogo from "./logo";
import { usePathname } from "next/navigation";
import MobileNavDrawer from "./drawer";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blogs", href: "/blogs" },
  { name: "Careers", href: "/careers" },
];

const Header = () => {
  const [menuState, setMenuState] = useState(false);

  // inside Header component
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logo color: white on top (dark hero), black after scroll (light sections)
  const logoColor = isScrolled ? "black" : "white";

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full px-2 transition-all duration-300"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-7xl px-2 transition-all duration-300 lg:px-5",
            isScrolled &&
              "bg-background/70 max-w-[1235px] rounded-2xl px-2 border backdrop-blur-lg shadow-sm dark:shadow-none lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            {/* ---------- LOGO ---------- */}
            <div className="flex w-full justify-between lg:w-auto">
              <CustomLogo color={logoColor} />

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 mr-1 block cursor-pointer p-2.5 lg:hidden"
                style={{ color: isScrolled ? "black" : "white" }}
              >
                <Menu className="m-auto size-6 transition-all duration-200 data-[state=active]:opacity-0" />
                <X className="absolute inset-0 m-auto size-6 scale-0 opacity-0 transition-all duration-200 data-[state=active]:scale-100 data-[state=active]:opacity-100" />
              </button>
            </div>

            {/* ---------- NAV LINKS ---------- */}
            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex items-center gap-6 text-sm">
                {menuItems.map((item) => {
                  const active =
                    pathname === item.href ||
                    (item.href !== "/" && pathname?.startsWith(item.href));
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "relative block py-2 transition-colors",
                          isScrolled
                            ? "text-zinc-800 hover:text-sky-700 dark:text-zinc-200 dark:hover:text-sky-400"
                            : "text-zinc-100 hover:text-white",
                          active && "font-medium"
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        <span>{item.name}</span>
                        {/* Active underline */}
                        <span
                          className={cn(
                            "absolute left-0 right-0 -bottom-0.5 mx-auto h-0.5 w-0 rounded-full transition-all",
                            active ? "w-10 bg-current" : "w-0"
                          )}
                          aria-hidden
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* ---------- RIGHT SIDE BUTTONS ---------- */}
            <Link href="/contact" className="hidden lg:block">
              <Button
                variant="outline"
                className="rounded-full bg-sky-600 border-none text-white hover:bg-sky-700 hover:text-white w-full sm:w-auto"
                asChild
              >
                <span>Contact Us</span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      {/* mobile nav drawer */}
      <MobileNavDrawer
        isOpen={menuState}
        onOpenChange={() => setMenuState((prev) => !prev)}
        direction="right"
      />
    </header>
  );
};

export default Header;
