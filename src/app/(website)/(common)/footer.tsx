import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import CustomLogo from "./logo";

const links = [
  {
    group: "Product",
    items: [
      { title: "Features", href: "#" },
      { title: "Solution", href: "#" },
      { title: "Customers", href: "#" },
      { title: "Pricing", href: "#" },
      { title: "Help", href: "#" },
      { title: "About", href: "#" },
    ],
  },
  {
    group: "Solution",
    items: [
      { title: "Startup", href: "#" },
      { title: "Freelancers", href: "#" },
      { title: "Organizations", href: "#" },
      { title: "Students", href: "#" },
      { title: "Collaboration", href: "#" },
      { title: "Design", href: "#" },
      { title: "Management", href: "#" },
    ],
  },
  {
    group: "Company",
    items: [
      { title: "About", href: "#" },
      { title: "Careers", href: "#" },
      { title: "Blog", href: "#" },
      { title: "Press", href: "#" },
      { title: "Contact", href: "#" },
      { title: "Help", href: "#" },
    ],
  },
  {
    group: "Legal",
    items: [
      { title: "Licence", href: "#" },
      { title: "Privacy", href: "#" },
      { title: "Cookies", href: "#" },
      { title: "Security", href: "#" },
    ],
  },
];

export default function FooterSection() {
  return (
    <footer className="bg-[#0d1117] text-gray-300 pt-20 border-t border-gray-800">
      {/* Top Section with Logo and Socials */}
      <div className="mb-10 border-b border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 pb-8">
          <CustomLogo color="white" />

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              {
                label: "X/Twitter",
                icon: (
                  <path
                    fill="currentColor"
                    d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"
                  />
                ),
              },
              {
                label: "LinkedIn",
                icon: (
                  <path
                    fill="currentColor"
                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
                  />
                ),
              },
              {
                label: "Instagram",
                icon: (
                  <path
                    fill="currentColor"
                    d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                  />
                ),
              },
            ].map((social, i) => (
              <Link
                key={i}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-gray-400 hover:text-sky-500 transition-colors duration-200"
              >
                <svg
                  className="size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {social.icon}
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Links and Newsletter */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-5 lg:grid-cols-4">
          {/* Links */}
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 md:col-span-5 lg:col-span-3">
            {links.map((link, index) => (
              <div key={index} className="space-y-4 text-sm">
                <span className="block font-medium text-white">
                  {link.group}
                </span>
                {link.items.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="block text-gray-400 hover:text-sky-500 transition-colors duration-150"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <form className="row-start-1 border-b border-gray-700 pb-8 text-sm md:col-span-2 md:border-none lg:col-span-1">
            <div className="space-y-4">
              <Label htmlFor="mail" className="block font-medium text-white">
                Newsletter
              </Label>
              <div className="flex gap-2">
                <Input
                  type="email"
                  id="mail"
                  name="mail"
                  placeholder="Your email"
                  className="h-8 text-sm bg-gray-900 border-gray-700 text-gray-200 placeholder:text-gray-500 focus-visible:ring-sky-600"
                />
                <Button
                  size="sm"
                  className="bg-sky-600 hover:bg-sky-500 text-white"
                >
                  Submit
                </Button>
              </div>
              <span className="text-gray-500 block text-sm">
                Don’t miss any update!
              </span>
            </div>
          </form>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-gray-800 py-6">
          <small className="text-gray-500 order-last block text-center text-sm md:order-first">
            © {new Date().getFullYear()} Safe Solutions. All rights reserved.
          </small>

          {/* Language Selector */}
          <form>
            <div className="relative">
              <ChevronsUpDown
                className="pointer-events-none absolute inset-y-0 right-2 my-auto opacity-70"
                size="0.75rem"
              />
              <select
                className={cn(
                  "bg-gray-900 border border-gray-700 text-gray-300 appearance-none rounded-md px-3 py-1 pr-8 text-sm focus:border-sky-600 focus:ring-1 focus:ring-sky-600 outline-none"
                )}
                name="language"
              >
                <option value="1">English</option>
                <option value="2">Español</option>
                <option value="3">Français</option>
                <option value="4">Swahili</option>
                <option value="5">Lingala</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
}
