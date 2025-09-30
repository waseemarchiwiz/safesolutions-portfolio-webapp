"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Loading from "../[slug]/loading";
import ScrollToTop from "@/components/common/scroll-to-top";
import PageHeroSection from "../../../(common)/hero-section";
import { BlogTypes } from "../../blogs/page";
import Image from "next/image";

const Main = ({ blogData }: { blogData: BlogTypes }) => {
  // get images
  const images = blogData?.images || [];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  if (!blogData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {/* Hero Section (Kept from previous implementation) */}
      <PageHeroSection
        mainTitle="Join Our Team"
        topTitle=" Insights and Ideas to Elevate Your"
        bottomTittle="Blogging Journey"
        description="Join our team and be part of an inspiring journey. Explore opportunities to grow, learn, and make an impact."
      />

      <div className="w-full bg-white dark:bg-black py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            {/* Image Carousel */}
            {images.length > 0 && (
              <div className="relative h-[500px] rounded-lg overflow-hidden   mb-12">
                <AnimatePresence>
                  {images.map(
                    (slide, index) =>
                      index === currentSlide && (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 300 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -300 }}
                          transition={{
                            type: "tween",
                            duration: 0.5,
                          }}
                          className="absolute w-full h-full"
                        >
                          <Image
                            width={200}
                            height={150}
                            src={slide.image as string}
                            alt={blogData.title as string}
                            className="w-full h-full object-contain"
                          />
                        </motion.div>
                      )
                  )}
                </AnimatePresence>

                {/* Navigation buttons */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors z-10"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Slide indicators */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === currentSlide ? "bg-white" : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Blog Content */}
            <div className="prose dark:prose-invert max-w-none">
              <h1 className="text-4xl font-bold mb-4">{blogData.title}</h1>
              <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {blogData.shortDescription}
              </h2>

              <div
                className="text-lg leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blogData.description }}
              />
            </div>
          </motion.div>
        </div>
      </div>
      <ScrollToTop />
    </>
  );
};

export default Main;
