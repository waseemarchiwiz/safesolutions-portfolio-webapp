import React from "react";
import AboutComp from "../../components/HomeComponents/AboutComp";
import MainHero from "../../components/HomeComponents/MainHero";
import WhyChoose from "../../components/HomeComponents/WhyChoose";
import WorkingArea from "../../components/HomeComponents/WorkingArea";
import ServicesComponent from "../../components/HomeComponents/ServicesComponent";
import ProjectsComponent from "../../components/HomeComponents/ProjectsComponent";
import Testimonial from "../../components/HomeComponents/Testimonial";
import FaqComponent from "../../components/HomeComponents/FaqComponents";
import ScrollToTop from "../../globals/ScrollToTop";

const Home = () => {
  return (
    <div className="dark:bg-gray-800 dark:text-gray-200 ">
      <MainHero />
      <WhyChoose />
      <AboutComp />
      <WorkingArea />
      <ServicesComponent />
      {/* <ProjComp /> */}
      <ProjectsComponent />
      <Testimonial />
      <FaqComponent />
      <ScrollToTop />
    </div>
  );
};

export default Home;
