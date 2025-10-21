"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import LogoCloud from "@/components/logo-cloud";
import DotPattern from "@/components/ui/dot-pattern";

const transitionVariants = {
  item: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 12 } as const,
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { type: "spring", bounce: 0.3, duration: 1.2 } as const,
    },
  },
};

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);
  if (!isMounted) return null;

  return (
    <main className="overflow-hidden bg-black">
      <section className=" relative text-white">
        <DotPattern className="w-full h-[70vh] opacity-20" />

        <div className="absolute inset-0 isolate opacity-65 hidden lg:block">
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
        </div>

        <div
          aria-hidden
          className="absolute inset-0 -z-20 bg-[radial-gradient(125%_125%_at_50%_100%,transparent_0%,#000_80%)]"
        />

        <div className="relative mx-auto max-w-7xl px-6 pt-24 md:pt-36">
          <div className="text-center sm:mx-auto lg:mr-auto">
            <AnimatedGroup variants={transitionVariants}>
              <Link
                href="#services"
                className="group mx-auto flex w-fit items-center gap-4 rounded-full border border-white/10 bg-zinc-900 p-1 pl-4 shadow-lg shadow-black/30 hover:bg-zinc-800 transition-colors"
              >
                <span className="text-white text-sm">
                  Modern Software Solutions
                </span>
                <span className="block h-4 w-0.5 bg-white/40"></span>
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

            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.25}
              as="h1"
              className="mx-auto mt-8 max-w-4xl text-balance text-5xl font-semibold text-white md:text-7xl lg:mt-16 xl:text-[5.25rem]"
            >
              We Provide Modern Solutions
            </TextEffect>

            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.25}
              delay={0.4}
              as="p"
              className="mx-auto mt-8 max-w-2xl text-balance text-lg text-zinc-300"
            >
              From concept to deployment — we build reliable, scalable, and
              maintainable software that powers your business forward.
            </TextEffect>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.04,
                      delayChildren: 0.6,
                    },
                  },
                },
                ...transitionVariants,
              }}
              className="mt-12 flex items-center justify-center gap-2 md:flex-row"
            >
              <div key={1} className=" p-0.5">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-5 bg-sky-600 text-white hover:bg-sky-700"
                >
                  <Link href="/contact">
                    <span className="whitespace-nowrap">Get Started</span>
                  </Link>
                </Button>
              </div>

              <Link href="/services">
                <Button
                  key={2}
                  asChild
                  size="lg"
                  variant="ghost"
                  className="h-10.5 transition-all duration-300 rounded-full px-5 text-white border border-white/20 "
                >
                  <span className="whitespace-nowrap">Our Work</span>
                </Button>
              </Link>
            </AnimatedGroup>
          </div>
        </div>
      </section>

      <AnimatedGroup
        variants={{
          container: {
            visible: {
              transition: { staggerChildren: 0.04, delayChildren: 0.6 },
            },
          },
          ...transitionVariants,
        }}
      >
        <div className="mt-32 lg:mt-25">
          <LogoCloud />
        </div>
      </AnimatedGroup>
    </main>
  );
}
