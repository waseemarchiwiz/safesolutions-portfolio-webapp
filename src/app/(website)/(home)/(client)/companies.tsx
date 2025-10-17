"use client";

import React from "react";
import { useTheme } from "next-themes";
import { companiesData } from "@/app/(website)/(home)/data";
import Image from "next/image";

const ProjComp = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="mt-10 p-10">
      <div className="flex justify-center items-center px-10">
        <div className="grid lg:grid-cols-6 gap-3 w-full">
          {companiesData.map((proj, idx) => (
            <div
              key={idx}
              className="p-20 lg:border-r-[0.5px] lg:border-r-[#111827] last:border-none flex items-center justify-center"
            >
              <Image
                width={60}
                height={60}
                src={isDark ? proj.dark : proj.light}
                alt={proj.name}
                className="max-h-16 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjComp;
