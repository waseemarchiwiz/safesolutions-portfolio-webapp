"use client";

import React from "react";
import { useRouter } from "next/navigation";
import PageHeroSection from "../../(common)/hero-section";
import ScrollToTop from "@/components/common/scroll-to-top";
import { BlogTypes } from "../page";
import { Button } from "@/components/ui/button";
import { baseURL } from "@/lib/api.config";
import Link from "next/link";

const Blogs = ({ blogs }: { blogs: BlogTypes[] }) => {
  const router = useRouter();

  return (
    <div>
      <PageHeroSection
        mainTitle="Our Blogs"
        topTitle="Insights and Ideas to Elevate Your"
        bottomTittle=" Blogging Journey"
        description="Join our team and be part of an inspiring journey. Explore opportunities to grow, learn, and make an impact."
      />

      {/* Blog Section */}
      <div className="bg-white dark:bg-black">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 mt-10">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
              Latest Blogs
            </span>
          </div>
        </div>
        <div className="max-w-6xl mx-auto p-4">
          {blogs?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 max-lg:max-w-3xl max-md:max-w-md mx-auto">
                {blogs.map((blog) => (
                  <div
                    key={blog.slug}
                    className="bg-white cursor-pointer rounded-lg overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative group"
                  >
                    <img
                      src={`${baseURL}/${blog.images?.[0].image}`}
                      alt={blog.images?.[0].image}
                      className="w-full h-96 object-cover"
                    />
                    <div className="p-6 absolute bottom-0 left-0 right-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 opacity-90">
                      <span className="text-sm block text-white mb-2">
                        {new Date(blog.createdAt).toISOString().split("T")[0]}
                      </span>
                      <h3 className="text-xl font-bold text-white">
                        {blog.shortDescription}
                      </h3>
                      <div className="h-0 overflow-hidden group-hover:h-16 group-hover:mt-4 transition-all duration-300">
                        <Link href={`/blog/${blog.slug}`}>
                          <Button>Read More</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center min-h-[300px]">
              <p className="text-lg font-semibold text-gray-500">
                Nothing to show
              </p>
            </div>
          )}
        </div>
      </div>

      <ScrollToTop />
    </div>
  );
};

export default Blogs;
