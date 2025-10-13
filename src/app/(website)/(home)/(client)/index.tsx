"use client";

import React from "react";
import Hero from "./hero";
import WhyChoose from "./why-choose";
import About from "./about";
import Projects from "../../(common)/project-section";
import { FaqTypes } from "@/app/(admin)/dashboard/(faq-page)/faqs/columns";
import { ProjectTypes } from "@/app/(admin)/dashboard/(project-page)/projects/columns";
import { TestimonialTypes } from "@/app/(admin)/dashboard/(testimonial-page)/testimonials/columns";
import Testimonials from "./testimonials";
import OurStack from "./our-stack";
import { ServicesTypes } from "../../services/(client)";
import { Services } from "./services";
import Faqs from "./faq";
import SectionWithReveal from "../../(common)/fold";

interface MainPropTypes {
  faqs: FaqTypes[];
  projects: ProjectTypes[];
  testimonials: TestimonialTypes[];
  services: ServicesTypes[];
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
      <Services />
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
