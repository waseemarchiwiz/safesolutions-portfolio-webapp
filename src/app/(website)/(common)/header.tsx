"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

// navigations
const navigations = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Careers",
    href: "/careers",
  },
  {
    title: "Blogs",
    href: "/blogs",
  },
];

const Header = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  // isActive
  const isActive = (path: string) => pathname === path;

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (!resolvedTheme?.trim()) {
      return;
    }
    if (resolvedTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <header
      className={`fixed w-full z-[999] transition-all duration-300 ${
        scrolled ? " bg-blue-900   " : "  "
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <img
                className="h-24 w-auto transition-transform hover:scale-105"
                src={"/logo.png"}
                alt="safesolution"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <nav className="flex items-center justify-center gap-2  ">
              <ul className="flex items-center gap-5">
                {navigations.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`relative py-2 text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? "text-blue-500 dark:text-white"
                          : "text-white dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                      }`}
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                        menuOpen && setMenuOpen(false); // Close mobile menu if open
                      }}
                    >
                      {item.title}
                      {isActive(item.href) && (
                        <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-500 dark:bg-blue-400 " />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4 ml-3 pl-8 border-l border-gray-200 dark:border-gray-700">
                <Link href="/contact">
                  <Button className="bg-blue-500 mt-2 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Contact us
                  </Button>
                </Link>

                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle Dark Mode"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-700" />
                  )}
                </button>
              </div>
            </nav>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-lg md:hidden bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden">
          <div className="fixed top-0 right-0 w-[300px] h-full bg-blue-900 dark:bg-black shadow-2xl transition-transform">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
              <Image
                className="h-12 w-auto"
                src={"/logo.png"}
                alt="safesolution"
              />
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-white  dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="p-4 bg-blue-900 dark:bg-black">
              <ul className="space-y-3">
                {["Home", "About", "Services", "Careers", "Blogs"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                        className={`block px-4 py-2 rounded-lg transition-colors ${
                          isActive(
                            item === "Home" ? "/" : `/${item.toLowerCase()}`
                          )
                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "text-white dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>

              <div className="mt-6 p-4 border-t border-gray-200 dark:border-gray-800">
                <Link href="/contact" onClick={() => setMenuOpen(false)}>
                  <Button className="bg-blue-500 mt-2 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Contact us
                  </Button>
                </Link>

                <button
                  onClick={() => {
                    toggleTheme();
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {resolvedTheme === "dark" ? (
                    <>
                      <Sun className="w-5 h-5 text-yellow-500" />
                      <span className="text-white dark:text-gray-300">
                        Light Mode
                      </span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5 text-white" />
                      <span className="text-white dark:text-gray-300">
                        Dark Mode
                      </span>
                    </>
                  )}
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
