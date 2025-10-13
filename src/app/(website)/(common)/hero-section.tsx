"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { MotionConfig, useReducedMotion, m } from "framer-motion";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import DotPattern from "@/components/ui/dot-pattern";

/**
 * PageHeroSection
 * - Theme: dark surface (pairs with transparent header at top)
 * - Motion: subtle springs; respects prefers-reduced-motion
 * - Layout: no top margin (header already reserves space)
 * - Background: DotPattern + soft radial + hero image mask, matching home
 */

const transition = { type: "spring", bounce: 0.3, duration: 1.2 } as const;

const variants = {
  container: {
    visible: { transition: { delayChildren: 0.6, staggerChildren: 0.04 } },
  },
  item: {
    hidden: { opacity: 0, y: 12, filter: "blur(12px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition },
  },
} as const;

export default function PageHeroSection() {
  const prefersReduced = useReducedMotion();

  return (
    <MotionConfig reducedMotion={prefersReduced ? "always" : "never"}>
      <main className="py-5 overflow-hidden bg-black">
        {/* Decorative grid / pattern */}
        <DotPattern className="w-full h-[65vh] opacity-20" />
        <section className="max-w-[77rem] mx-auto  relative text-white">
          {/* Soft radial vignettes (desktop only for subtlety) */}
          <div className="absolute inset-0 isolate opacity-65 hidden lg:block">
            <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
            <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          </div>

          {/* Radial shadow overlay to ground the text */}
          <div
            aria-hidden
            className="absolute inset-0 -z-20 bg-[radial-gradient(125%_125%_at_50%_100%,transparent_0%,#000_80%)]"
          />

          {/* Content */}
          <div className="my-10 relative mx-auto max-w-7xl pt-10 pb-16 md:pt-16">
            <div className="  ">
              {/* Eyebrow pill */}
              <AnimatedGroup variants={variants}>
                <m.div variants={variants.item}>
                  <Link
                    href="#services"
                    className="group flex w-fit items-center gap-4 rounded-full border border-white/10 bg-zinc-900 p-1 pl-4 shadow-lg shadow-black/30 hover:bg-zinc-800 transition-colors"
                  >
                    <span className="text-white text-sm">
                      Modern Software Solutions
                    </span>
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
                </m.div>
              </AnimatedGroup>

              {/* Title */}
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.25}
                as="h1"
                className="max-w-4xl text-5xl text-white md:text-7xl lg:mt-6 xl:text-7xl"
              >
                Transforming Ideas Into Digital Reality
              </TextEffect>

              {/* Subtitle */}
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.25}
                delay={0.4}
                as="p"
                className=" mt-6 max-w-2xl text-balance text-lg text-zinc-300"
              >
                From concept to deployment — we build reliable, scalable, and
                maintainable software that powers your business forward.
              </TextEffect>

              {/* Optional CTAs (kept minimal for subpages; uncomment if needed) */}
              {/*
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="#contact"
                  className="rounded-xl bg-white text-black hover:bg-zinc-200 px-5 py-2.5 text-base"
                >
                  Get Started
                </Link>
                <Link
                  href="#portfolio"
                  className="h-10.5 rounded-xl px-5 text-white border border-white/20 inline-flex items-center justify-center"
                >
                  Our Work
                </Link>
              </div>
              */}
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
}
