"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import PageHeroSection from "../../(common)/hero-section";
import { ServicesTypes } from "../../services/(client)";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
  viewport: { once: true },
});

const SoftwareDetails = ({ serviceData }: { serviceData: ServicesTypes }) => {
  return (
    <>
      {/* HERO */}
      <PageHeroSection
        tag="Software Engineering"
        title={serviceData?.title || "Software Solutions"}
        description={
          serviceData?.overview ||
          "We build reliable, scalable, and maintainable software tailored for your business goals."
        }
      />

      {/* MAIN CONTENT */}
      <section className="bg-white dark:bg-black py-20">
        <div className="container mx-auto px-6 max-w-5xl space-y-20">
          {/* OVERVIEW */}
          <motion.div {...fadeUp(0.1)} className="space-y-6 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white">
              Service Overview
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mx-auto">
              {serviceData?.overview ||
                "Our software development process focuses on delivering clean code, intuitive design, and robust scalability — from MVPs to enterprise systems."}
            </p>
          </motion.div>

          {/* FEATURES */}
          <motion.div {...fadeUp(0.2)}>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6 text-center">
              Key Features
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceData?.features?.map((feature, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(i * 0.1)}
                  className="rounded-xl border border-border/40 bg-card/60 p-6 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                      {feature}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* TECHNOLOGIES */}
          <motion.div {...fadeUp(0.3)} className="space-y-6">
            <h3 className="text-2xl font-semibold text-center text-slate-900 dark:text-white">
              Technologies We Use
            </h3>
            <Card className="border-border/40 bg-card/60 backdrop-blur-sm">
              <CardContent className="p-8 flex flex-wrap justify-center gap-4">
                {serviceData?.technologies?.map((tech, i) => (
                  <motion.span
                    key={i}
                    {...fadeUp(i * 0.05)}
                    className="px-5 py-2 text-sm rounded-full font-medium bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
                  >
                    {tech}
                  </motion.span>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* USE CASES / INDUSTRIES */}
          <motion.div {...fadeUp(0.4)} className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
                {serviceData?.useCases?.length
                  ? "Use Cases"
                  : "Industries Served"}
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {(serviceData?.useCases || serviceData?.industries)?.map(
                (item, i) => (
                  <motion.div
                    key={i}
                    {...fadeUp(i * 0.1)}
                    className="rounded-xl border border-border/40 bg-card/60 p-6 flex items-center gap-3 hover:bg-muted/50 transition-all"
                  >
                    <Layers className="text-sky-500 w-5 h-5 flex-shrink-0" />
                    <span className="text-slate-700 dark:text-slate-200 text-base">
                      {item}
                    </span>
                  </motion.div>
                )
              )}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            {...fadeUp(0.5)}
            className="flex justify-center pt-6 border-t border-border/30"
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-sky-600 hover:bg-sky-700 text-white px-8"
              >
                Discuss Your Project
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SoftwareDetails;
