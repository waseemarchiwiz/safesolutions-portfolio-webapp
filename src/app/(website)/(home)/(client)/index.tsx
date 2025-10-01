"use client";

import React from "react";
import Hero from "./hero";
import WhyChoose from "./why-choose";
import About from "./about";
import Services from "./services";
import Faq from "./Faq";
import ScrollToTop from "@/components/common/scroll-to-top";
import Projects from "../../(common)/project-section";
import { FaqTypes } from "@/app/(admin)/dashboard/(faq-page)/faqs/columns";
import { ProjectTypes } from "@/app/(admin)/dashboard/(project-page)/projects/columns";
import { TestimonialTypes } from "@/app/(admin)/dashboard/(testimonial-page)/testimonials/columns";
import Testimonials from "./Testimonial";

interface MainPropTypes {
  faqs: FaqTypes[];
  projects: ProjectTypes[];
  testimonials: TestimonialTypes[];
}

const Main = ({ faqs, projects, testimonials }: MainPropTypes) => {
  return (
    <div className="bg-[#FFFFFF] dark:bg-black dark:text-gray-200  ">
      <Hero />
      <WhyChoose />
      <About />
      <Services />
      <Testimonials testimonials={testimonials} />
      <Projects projects={projects} />
      <Faq faqs={faqs} />
      <ScrollToTop />
    </div>
  );
};

export default Main;
