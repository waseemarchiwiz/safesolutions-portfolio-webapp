"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MotionConfig, useReducedMotion } from "framer-motion";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import DotPattern from "@/components/ui/dot-pattern";

interface PageHeroPropTypes {
  tag: string;
  title: string;
  description?: string;
  isNotFound?: boolean;
}

export default function PageHeroSection({
  tag,
  title,
  description,
  isNotFound = false,
}: PageHeroPropTypes) {
  const prefersReduced = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <main className="py-5 overflow-hidden bg-black">
        <DotPattern className="w-full h-[65vh] opacity-20" />

        <section className="max-w-[77rem] mx-auto relative text-white">
          <div
            aria-hidden
            className="absolute inset-0 -z-20 bg-[radial-gradient(125%_125%_at_50%_100%,transparent_0%,#000_80%)]"
          />

          <div className="my-10 relative px-5 md:px-3 mx-auto max-w-7xl pt-10 pb-16 md:pt-16">
            {/* Eyebrow pill */}
            <AnimatedGroup preset="blur-slide">
              <Link
                href="#services"
                className="group flex w-fit items-center gap-4 rounded-full border border-white/10 bg-zinc-900 p-1 pl-4 shadow-lg shadow-black/30 hover:bg-zinc-800 transition-colors"
              >
                <span className="text-white text-sm">{tag}</span>
                <span className="block h-4 w-0.5 bg-white/40" />
                <div className="bg-zinc-800 group-hover:bg-zinc-700 size-6 overflow-hidden rounded-full duration-500">
                  <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                    <span className="flex size-6">
                      <ArrowRight className="m-auto size-3 text-white" />
                    </span>
                    <span className="flex size-6">
                      <ArrowRight className="m-auto size-3 text-white" />
                    </span>
                  </div>
                </div>
              </Link>
            </AnimatedGroup>

            {/* Title */}
            <TextEffect
              preset="fade-in-blur"
              as="h1"
              className="max-w-4xl text-4xl sm:text-5xl md:text-7xl mt-6 text-white"
            >
              {title}
            </TextEffect>

            {/* Subtitle */}
            {description && (
              <TextEffect
                preset="fade-in-blur"
                delay={0.4}
                as="p"
                className="mt-6 max-w-xl text-lg text-zinc-300"
              >
                {description}
              </TextEffect>
            )}

            {isNotFound && (
              <div className="mt-10">
                <Link
                  href="/"
                  className="rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-500"
                >
                  Go back home
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
