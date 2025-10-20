"use client";

import React from "react";
import Teams from "./teams";
import Projects from "../../(common)/project-section";
import PageHeroSection from "../../(common)/hero-section";
import About from "../../(home)/(client)/about";
import Achievements from "./achievements";
import { TeamTypes } from "../page";
import { Banner } from "./banner";
import { ProjectTypes } from "@/app/(admin)/dashboard/(project-page)/projects/columns";
import SectionWithReveal from "../../(common)/fold";
import Blogs, { BlogPostTypes } from "../../(blogs-page)/blogs/(client)/blogs";
import PartnersSection from "./partners";
import { CompanyTypes } from "@/app/(admin)/dashboard/(company-page)/companies/columns";

interface AboutProps {
  teams: TeamTypes[];
  projects: ProjectTypes[];
  blogs: BlogPostTypes[];
  partners: CompanyTypes[];
}

const Main = ({ teams, projects, blogs, partners }: AboutProps) => {
  console.log("teams--", teams);
  console.log("projects--", projects);
  console.log("blogs--", blogs);
  console.log("partners---", partners);

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
      <SectionWithReveal>
        <About />
      </SectionWithReveal>
      {/* Services */}
      <SectionWithReveal className="px-5 bg-zinc-100 py-16">
        <PartnersSection partners={partners} />
      </SectionWithReveal>

      {/* Projects Section */}
      <SectionWithReveal>
        <Projects projects={projects} />
      </SectionWithReveal>
      {/* Teams Section */}
      <SectionWithReveal className="bg-zinc-100">
        <Teams teams={teams} />
      </SectionWithReveal>
      {/* blogs Section */}
      <SectionWithReveal className="px-5">
        <Blogs blogs={blogs} />
      </SectionWithReveal>
      {/* Banner Section */}
      <SectionWithReveal className="mt-10 mb-30">
        <Banner />
      </SectionWithReveal>
    </>
  );
};

export default Main;
