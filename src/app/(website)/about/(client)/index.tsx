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
import { Services } from "../../(home)/(client)/services";
import SectionWithReveal from "../../(common)/fold";
import Blogs, { BlogPostTypes } from "../../(blogs-page)/blogs/(client)/blogs";

interface AboutProps {
  teams: TeamTypes[];
  projects: ProjectTypes[];
  blogs: BlogPostTypes[];
}

const Main = ({ teams, projects, blogs }: AboutProps) => {
  console.log("teams--", teams);
  console.log("projects--", projects);
  console.log("blogs--", blogs);

  return (
    <>
      {/* Hero Section */}
      <PageHeroSection />
      {/* Achievements Section */}
      <SectionWithReveal>
        <Achievements />
      </SectionWithReveal>
      {/* About Section */}
      <SectionWithReveal>
        <About />
      </SectionWithReveal>
      {/* Services */}
      <SectionWithReveal className="bg-zinc-100">
        <Services />
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
      <SectionWithReveal>
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
