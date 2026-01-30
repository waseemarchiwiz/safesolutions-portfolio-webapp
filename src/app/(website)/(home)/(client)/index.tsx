"use client";

import React from "react";
import Hero from "./hero";
import Projects from "../../(common)/project-section";
import { FaqTypes } from "@/app/(admin)/dashboard/(faq-page)/faqs/columns";
import { ProjectTypes } from "@/app/(admin)/dashboard/(project-page)/projects/columns";
import { TestimonialTypes } from "@/app/(admin)/dashboard/(testimonial-page)/testimonials/columns";
import Testimonials from "./testimonials";
import OurStack from "./our-stack";
import SectionWithReveal from "../../(common)/fold";
import { Services } from "../../(service-page)/services/(client)";
import { ServiceTypes } from "@/app/(admin)/dashboard/(service-page)/services/columns";
import Faqs from "./faqs";
import WhyChoose from "./why-choose";
import AboutSection from "../../(common)/about-section";

interface MainPropTypes {
  faqs: FaqTypes[];
  projects: ProjectTypes[];
  testimonials: TestimonialTypes[];
  services: ServiceTypes[];
}

const Main = ({ faqs, projects, testimonials, services }: MainPropTypes) => (
  <div className="bg-[#FFFFFF] overflow-hidden">
    <Hero />

    <SectionWithReveal>
      <AboutSection />
    </SectionWithReveal>

    <SectionWithReveal>
      <WhyChoose />
    </SectionWithReveal>

    <SectionWithReveal>
      <Services services={services} view={true} />
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
