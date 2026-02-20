import { Facebook, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import CustomLogo from "./logo";
import CopyRightSection from "./copyright";

const links = [
  {
    group: "Services",
    items: [
      { title: "Custom Development", href: undefined },
      { title: "Backoffice Support", href: undefined },
      { title: "Architecture and Design", href: undefined },
      { title: "ERP Management", href: undefined },
    ],
  },
  {
    group: "Company",
    items: [
      { title: "About", href: "/about" },
      { title: "Services", href: "/services" },
      { title: "Careers", href: "/careers" },
      { title: "Home", href: "/" },
      { title: "Blogs", href: "/blogs" },
      { title: "Contact Us", href: "/contact" },
    ],
  },
];

const offices = [
  {
    name: "Peshawar Office",
    address: "Industrial Road, Street No. 1, Plot No. 103-104 A, Hayatabad",
  },
  {
    name: "Islamabad Office",
    address: "3rd Floor, Paris Business Center Block A Soan Gardens",
  },
  {
    name: "Rawalpindi Office",
    address: "Office 1005, 813, 814 NASTP Alpha Near Old Airport",
  },
];

export default function FooterSection() {
  return (
    <footer className="bg-[#0d1117] text-gray-300 border-t border-gray-800">
      {/* Top Section with Logo */}
      <div className="py-5 border-b border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-3">
          <CustomLogo color="white" />
          {/* Social Media Icons */}
          <div className="flex space-x-3">
            <Link href="https://www.facebook.com/p/Safe-Solutions-Consultants-100063585470582/">
              <Facebook size={20} className="cursor-pointer" />
            </Link>
            <Link href="https://www.linkedin.com/company/ssconsultant123/?originalSubdomain=pk">
              <Linkedin size={20} className="cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 mt-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Links */}
          {links.map((link, index) => (
            <div key={index} className="space-y-4 text-sm">
              <span className="block font-medium text-white">{link.group}</span>
              {link.items.map((item, i) => {
                return item.href === undefined ? (
                  <span
                    key={i}
                    className="block text-gray-400 hover:text-sky-500 transition-colors duration-150"
                  >
                    {item.title}
                  </span>
                ) : (
                  <Link
                    key={i}
                    href={item.href}
                    className="block text-gray-400 hover:text-sky-500 transition-colors duration-150"
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>
          ))}

          {/* Contact Information */}
          <div className="space-y-6 text-sm">
            <span className="block font-medium text-white">Contact Us</span>

            {/* Offices */}
            <div className="space-y-4">
              {offices.map((office, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-start gap-2">
                    <MapPin className="size-4 text-sky-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-300">{office.name}</p>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {office.address}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Office Hours */}
          <div className="space-y-6 text-sm">
            <span className="block font-medium text-white">Office Hours</span>
            {/* Office Hours */}
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                {/* <Clock className="size-4 text-sky-500 mt-0.5 flex-shrink-0" /> */}
                <div className="space-y-1">
                  <p className="font-medium text-gray-300">Timings</p>
                  <p className="text-gray-500 text-xs">
                    Pak Time: 09:00 AM - 01:00 AM
                  </p>
                  <p className="text-gray-500 text-xs">
                    US Time: 11:00 PM - 03:00 PM
                  </p>
                  <p className="text-gray-500 text-xs">Saturday: Closed</p>
                  <p className="text-gray-500 text-xs">Sunday: Closed</p>
                  <p className="text-sky-400 text-xs mt-2">
                    Available 24/7 for online inquiries
                  </p>
                </div>
              </div>

              <div className="mt-5">
                {/* Email */}
                <div className="flex items-center gap-2">
                  <Mail className="size-3 text-sky-500 flex-shrink-0" />
                  <a
                    href="mailto:info@safesolutionsconsultants.com"
                    className="text-gray-400 hover:text-sky-500 transition-colors duration-150"
                  >
                    info@safesolutionsconsultants.com
                  </a>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2">
                  <Phone className="size-3 text-sky-500 flex-shrink-0" />
                  <a
                    href="tel:813-683-7889"
                    className="text-gray-400 hover:text-sky-500 transition-colors duration-150"
                  >
                    813-683-7889
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex items-center justify-center gap-6 border-t border-gray-800 py-6">
          <small className="text-gray-500 order-last block text-center text-sm md:order-first">
            © {<CopyRightSection />} Safe Solutions. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}
