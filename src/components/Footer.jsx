import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import {
  FaLinkedin,
  FaChevronRight,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Top Section with Logo and Social */}
        <div className="relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  className="h-20 w-20 sm:h-24 sm:w-24 rounded-lg shadow-md"
                  src={logo}
                  alt="safesolution"
                />
              </Link>
              <div className="hidden sm:block h-16 w-px bg-gray-200 dark:bg-gray-700 mx-6"></div>
            </div>

            <ul className="mt-6 sm:mt-0 flex items-center gap-6">
              {[
                {
                  icon: (
                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ),
                  url: "https://www.facebook.com/p/Safe-Solutions-Consultants-100063585470582/",
                },
                {
                  icon: <FaLinkedin className="text-xl" />,
                  url: "https://www.linkedin.com/company/ssconsultant123/?originalSubdomain=pk",
                },
              ].map((social, index) => (
                <li key={index}>
                  <Link
                    to={social.url}
                    rel="noreferrer"
                    target="_blank"
                    className="block p-2 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transform hover:scale-110 transition-all duration-300 bg-white dark:bg-gray-800 rounded-full shadow-md"
                  >
                    {social.icon}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 relative">
          {/* Services Section */}
          <div className="p-6 rounded-xl bg-white dark:bg-black   transform hover:translate-y-[-4px] transition-transform duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                <FaChevronRight className="text-blue-600 dark:text-blue-400 text-sm" />
              </span>
              Services
            </h3>
            <ul className="space-y-4">
              {[
                "Custom Development",
                "Backoffice Support",
                "Architecture and Design",
                "ERP Management",
              ].map((service) => (
                <li
                  key={service}
                  className="flex items-center space-x-3 group ml-3"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-200 dark:bg-blue-700 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors duration-300"></div>
                  <Link className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Section */}
          <div className="p-6 rounded-xl bg-white dark:bg-black   transform hover:translate-y-[-4px] transition-transform duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                <FaChevronRight className="text-purple-600 dark:text-purple-400 text-sm" />
              </span>
              Company
            </h3>
            <ul className="space-y-4">
              {[
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Careers", path: "/careers" },
              ].map((item) => (
                <li
                  key={item.name}
                  className="flex items-center space-x-3 group ml-3"
                >
                  <div className="w-2 h-2 rounded-full bg-purple-200 dark:bg-purple-700 group-hover:bg-purple-500 dark:group-hover:bg-purple-400 transition-colors duration-300"></div>
                  <Link
                    to={item.path}
                    className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="p-6 rounded-xl bg-white dark:bg-black   transform hover:translate-y-[-4px] transition-transform duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                <FaMapMarkerAlt className="text-green-600 dark:text-green-400" />
              </span>
              Contact us
            </h3>
            <div className="space-y-6">
              {[
                {
                  title: "Peshawar Office",
                  address:
                    "Industrial Road, Street No. 1, Plot No. 103-104 A, Hayatabad",
                },
                {
                  title: "Islamabad Office",
                  address:
                    "3rd Floor, Paris Business Center Block A Soan Gardens",
                },
                {
                  title: "Rawalpindi Office",
                  address: "Office 1005, 813, 814 NASTP Alpha Near Old Airport",
                },
              ].map((office) => (
                <div key={office.title} className="flex space-x-3">
                  {/* <FaMapMarkerAlt className="text-green-500 dark:text-green-400 mt-1 flex-shrink-0" /> */}
                  <div className="ml-5">
                    <p className="font-bold text-gray-800 dark:text-gray-200">
                      {office.title}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {office.address}
                    </p>
                  </div>
                </div>
              ))}
              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <a
                  href="mailto:info@safesolutionsconsultants.com"
                  className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  <FaEnvelope />
                  <span>info@safesolutionsconsultants.com</span>
                </a>
                <Link
                  to="tel:8136837889"
                  className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-300"
                >
                  <FaPhone />
                  <span>813-683-7889</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Office Hours Section */}
          <div className="p-6 rounded-xl bg-white dark:bg-black   transform hover:translate-y-[-4px] transition-transform duration-300">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mr-3">
                <FaClock className="text-orange-600 dark:text-orange-400" />
              </span>
              Office Hours
            </h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600   dark:text-gray-400">
                    Pak Time:
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    09:00 AM - 01:00 AM
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    US Time:
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    11:00 PM - 03:00 PM
                  </span>
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="flex items-center space-x-2 text-red-500 dark:text-red-400">
                  <span className="w-2 h-2 rounded-full bg-red-500 dark:bg-red-400"></span>
                  <span>Saturday: Closed</span>
                </p>
                <p className="flex items-center space-x-2 text-red-500 dark:text-red-400">
                  <span className="w-2 h-2 rounded-full bg-red-500 dark:bg-red-400"></span>
                  <span>Sunday: Closed</span>
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                Available 24/7 for online inquiries at{" "}
                <a
                  href="mailto:info@safesolutionsconsultants.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  info@safesolutionsconsultants.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400">
            &copy; 2022. Safe Solution. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
