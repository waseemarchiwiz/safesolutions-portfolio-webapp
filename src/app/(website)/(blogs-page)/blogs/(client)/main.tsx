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
      <PageHeroSection
        tag="Blogs"
        title="Our Stories"
        description="Know more about this company achievements and stories"
      />
      <Blogs blogs={blogs} />
    </>
  );
};

export default MainBlogs;
