"use client";

import React from "react";
import PageHeroSection from "../../../(common)/hero-section";
import Blogs, {
  BlogPostTypes,
} from "@/app/(website)/(blogs-page)/blogs/(client)/blogs";

const MainBlogs = ({ blogs }: { blogs: BlogPostTypes[] }) => {
  console.log("blogss-in client:-", blogs);

  return (
    <>
      <PageHeroSection />
      <Blogs blogs={blogs} />
    </>
  );
};

export default MainBlogs;
