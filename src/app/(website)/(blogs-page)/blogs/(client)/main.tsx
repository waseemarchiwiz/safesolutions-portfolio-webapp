"use client";

import React from "react";
import PageHeroSection from "../../../(common)/hero-section";
import Blogs from "@/app/(website)/(blogs-page)/blogs/(client)/blogs";
import { BlogTypes } from "@/app/(admin)/dashboard/(blog-page)/blogs/columns";

const MainBlogs = ({ blogs }: { blogs: BlogTypes[] }) => {
  return (
    <>
      <PageHeroSection
        tag="Blogs"
        title="Our Stories"
        description="Know more about this company achievements and stories"
      />
      <Blogs blogs={blogs} view={false} />
    </>
  );
};

export default MainBlogs;
