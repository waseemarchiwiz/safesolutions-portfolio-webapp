"use client";

import React from "react";
import Hero from "./hero";
import WhyChoose from "./why-choose";
import About from "./about";
import Services from "./services";
import Testimonial from "./Testimonial";
import Faq from "./Faq";
import ScrollToTop from "@/components/common/scroll-to-top";
import Projects from "../../(common)/project-section";

const Main = () => {
  return (
    <div className="bg-[#FFFFFF] dark:bg-black dark:text-gray-200  ">
      <Hero />
      <WhyChoose />
      <About />
      <Services />
      <Testimonial />
      <Projects />
      <Faq />
      <ScrollToTop />
    </div>
  );
};

export default Main;
