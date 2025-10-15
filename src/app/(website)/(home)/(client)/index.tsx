"use client";

import React from "react";
import Hero from "./hero";
import WhyChoose from "./why-choose";
import About from "./about";
import Projects from "../../(common)/project-section";
import { FaqTypes } from "@/app/(admin)/dashboard/(faq-page)/faqs/columns";
import {
  ProjectTypes,
  ServiceTypes,
} from "@/app/(admin)/dashboard/(project-page)/projects/columns";
import { TestimonialTypes } from "@/app/(admin)/dashboard/(testimonial-page)/testimonials/columns";
import Testimonials from "./testimonials";
import OurStack from "./our-stack";
import Faqs from "./faq";
import SectionWithReveal from "../../(common)/fold";
import { Services } from "../../services/(client)";
// import { ServicesSection } from "./services";

interface MainPropTypes {
  faqs: FaqTypes[];
  projects: ProjectTypes[];
  testimonials: TestimonialTypes[];
  services: ServiceTypes[];
}

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
      <Services view={true} />
    </SectionWithReveal>

    <SectionWithReveal className="bg-zinc-100">
      <Projects projects={projects} />
    </SectionWithReveal>

    <SectionWithReveal>
      <OurStack />
    </SectionWithReveal>

    <SectionWithReveal>
      <Testimonials testimonials={testimonials} />
    </SectionWithReveal>

    <SectionWithReveal>
      <Faqs faqs={faqs} />
    </SectionWithReveal>
  </div>
);

export default Main;
