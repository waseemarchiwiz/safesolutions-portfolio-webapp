"use client";
import React from "react";
import Hero from "./hero";
import WhyChoose from "./why-choose";

const Main = () => {
  return (
    <div className="bg-[#FFFFFF] dark:bg-black dark:text-gray-200  ">
      <Hero />
      <WhyChoose />
      {/* <AboutComp />
      <WorkingArea />
      <ServicesComponent />
      <ProjectsComponent />
      <Testimonial />
      <FaqComponent />
      <ScrollToTop /> */}
    </div>
  );
};

export default Main;
