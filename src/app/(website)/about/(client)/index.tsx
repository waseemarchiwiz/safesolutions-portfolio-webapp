"use client";

import React from "react";
import Teams from "./teams";
import Projects from "../../(shared)/project-section";
import PageHeroSection from "../../(shared)/hero-section";
import Achievements from "./achievements";
import { TeamTypes } from "../page";
import { Banner } from "./banner";
import { ProjectTypes } from "@/app/(admin)/dashboard/(project-page)/projects/columns";
import SectionWithReveal from "../../(shared)/fold";
import Blogs from "../../(blogs-page)/blogs/(client)/blogs";
import PartnersSection from "./partners";
import { CompanyTypes } from "@/app/(admin)/dashboard/(company-page)/companies/columns";
import { BlogTypes } from "@/app/(admin)/dashboard/(blog-page)/blogs/columns";
import AboutSection from "../../(shared)/about-section";

interface AboutProps {
  teams: TeamTypes[];
  projects: ProjectTypes[];
  blogs: BlogTypes[];
  partners: CompanyTypes[];
}

const Main = ({ teams, projects, blogs, partners }: AboutProps) => {
  // console.log("teams--", teams);
  // console.log("projects--", projects);
  // console.log("blogs--", blogs);
  // console.log("partners---", partners);

  return (
    <>
      <PageHeroSection
        tag="About Us"
        title="Transforming Ideas Into Digital Excellence"
        description="We're a passionate team of innovators dedicated to delivering cutting-edge IT solutions that drive your business forward"
      />
      {/* Achievements Section */}
      <SectionWithReveal>
        <Achievements />
      </SectionWithReveal>
      {/* About Section */}
      <SectionWithReveal className="dark:bg-white">
        <AboutSection />
      </SectionWithReveal>
      {/* Services */}
      <SectionWithReveal className="px-5 bg-zinc-100 py-16">
        <PartnersSection partners={partners} />
      </SectionWithReveal>
      {/* Projects Section */}
      <SectionWithReveal className="dark:bg-white">
        <Projects projects={projects} />
      </SectionWithReveal>
      {/* Teams Section */}
      <SectionWithReveal className=" bg-zinc-100">
        <Teams teams={teams} />
      </SectionWithReveal>
      {/* blogs Section */}
      <SectionWithReveal className="px-5 bg-white">
        <Blogs blogs={blogs} view={true} />
      </SectionWithReveal>
      {/* Banner Section */}
      <SectionWithReveal className="mt-10 mb-30 ">
        <Banner />
      </SectionWithReveal>
    </>
  );
};

export default Main;
