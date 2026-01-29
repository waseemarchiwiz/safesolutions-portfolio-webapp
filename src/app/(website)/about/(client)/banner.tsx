"use client";

import { WobbleCard } from "@/components/ui/wobble-card";
import Image from "next/image";
import React from "react";

export function Banner() {
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full lg:px-7">
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-sky-700 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg text-left text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Engineering principles that keep products stable and fast
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            With over 100,000 mothly active users, AI is the most popular AI
            platform for developers.
          </p>
        </div>
        <Image
          src="/asset-1.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[10%] -bottom-0 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}
