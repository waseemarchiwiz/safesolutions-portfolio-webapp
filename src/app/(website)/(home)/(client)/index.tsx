"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Hero from "./hero";
import WhyChoose from "./why-choose";
import About from "./about";
import Faq from "./Faq";
import Projects from "../../(common)/project-section";
import { FaqTypes } from "@/app/(admin)/dashboard/(faq-page)/faqs/columns";
import { ProjectTypes } from "@/app/(admin)/dashboard/(project-page)/projects/columns";
import { TestimonialTypes } from "@/app/(admin)/dashboard/(testimonial-page)/testimonials/columns";
import Testimonials from "./testimonials";
import OurStack from "./our-stack";
import { ServicesTypes } from "../../services/(client)";
import { Services } from "./services";

interface MainPropTypes {
  faqs: FaqTypes[];
  projects: ProjectTypes[];
  testimonials: TestimonialTypes[];
  services: ServicesTypes[];
}

const SectionWithReveal = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { rotateX: -15, scale: 0.9, opacity: 0, y: 50 },
    visible: {
      rotateX: 0,
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6, // make the transition faster
        ease: [0.25, 0.1, 0.25, 1] as const,
        when: "beforeChildren",
        staggerChildren: 0.05, // reduce stagger (very small)
        // no delayChildren or delay
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
        overflow: "hidden",
      }}
    >
      <motion.div variants={childVariants}>{children}</motion.div>
    </motion.div>
  );
};

const Main = ({ faqs, projects, testimonials, services }: MainPropTypes) => (
  <div className="bg-[#FFFFFF] dark:bg-black dark:text-gray-200 overflow-hidden">
    <Hero />

    <SectionWithReveal>
      <About />
    </SectionWithReveal>

    <SectionWithReveal>
      <WhyChoose />
    </SectionWithReveal>

    <SectionWithReveal>
      <Services />
    </SectionWithReveal>

    <SectionWithReveal>
      <Projects projects={projects} />
    </SectionWithReveal>

    <SectionWithReveal>
      <OurStack />
    </SectionWithReveal>

    <SectionWithReveal>
      <Testimonials testimonials={testimonials} />
    </SectionWithReveal>

    <SectionWithReveal>
      <Faq faqs={faqs} />
    </SectionWithReveal>
  </div>
);

export default Main;
