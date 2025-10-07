import { LogoIcon } from "@/components/logo";
import Link from "next/link";
import React from "react";

const CustomLogo = () => {
  return (
    <Link href="/" aria-label="home" className="flex items-center space-x-2">
      <LogoIcon />
      <span className="hidden font-semibold sm:inline-block ml-1 text-md">
        Safe <span className="text-sky-600">Solution</span>
      </span>
    </Link>
  );
};

export default CustomLogo;
