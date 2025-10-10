import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CustomLogoProps {
  color?: string;
}

const CustomLogo = ({ color = "black" }: CustomLogoProps) => {
  // Automatically set the accent (Safe Solution blue) tone based on background
  const accentColor = color === "white" ? "text-sky-400" : "text-sky-600";

  return (
    <Link
      href="/"
      aria-label="home"
      className="flex items-center space-x-2 transition-colors duration-300"
    >
      <Image
        className="w-10 h-10 object-cover pointer-none:"
        src="/updated-logo.png"
        alt="Logo"
        height={70}
        width={70}
      />
      {/* <LogoIcon className="" /> */}
      <span
        style={{ color }}
        className="hidden font-semibold sm:inline-block text-md"
      >
        Safe <span className={accentColor}>Solution</span>
      </span>
    </Link>
  );
};

export default CustomLogo;
