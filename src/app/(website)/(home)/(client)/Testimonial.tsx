import React, { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { TestimonialTypes } from "@/app/(admin)/dashboard/(testimonial-page)/testimonials/columns";

type TestimonialPropTypes = {
  testimonials: TestimonialTypes[];
};

const Testimonials = ({ testimonials }: TestimonialPropTypes) => {
  const [hoveredId, setHoveredId] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  useEffect(() => {
    let interval = undefined;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((current) =>
          current === testimonials.length - 3 ? 0 : current + 1
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: -50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  const handlePrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 3 : current - 1
    );
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setActiveIndex((current) =>
      current === testimonials.length - 3 ? 0 : current + 1
    );
    setIsAutoPlaying(false);
  };

  console.log("testimonials--", testimonials);

  return (
    <section className="  bg-[#FFFFFF] dark:bg-black py-5 px-4 relative overflow-hidden mt-8">
      <motion.div
        className="max-w-6xl mx-auto relative  "
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={headerVariants}
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-600 dark:text-white text-sm font-medium">
              Testimonials
            </span>
          </div>

          <p className="text-slate-600 p-5 dark:text-white text-[20px] md:text-[26px] leading-normal  text-center      w-auto">
            Discover why businesses trust us to deliver exceptional results and
            drive their success forward.
          </p>
        </div>

        <div className="relative b">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-8 z-10 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-8 z-10 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden bg-[#FFFFFF] dark:bg-slate-800 p-10 ">
            <div
              className="flex transition-transform duration-500  ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 33.33}%)` }}
            >
              {testimonials?.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full lg:w-1/3 flex-shrink-0 px-4   "
                >
                  <div
                    className={`dark:bg-[18181b] backdrop-blur-lg rounded-lg p-8 
                              transform transition-all duration-500 hover:-translate-y-2 
                              
                              ${
                                hoveredId === testimonial.id
                                  ? "shadow-2xl scale-105"
                                  : "shadow-lg"
                              }
                              cursor-pointer h-full`}
                    onMouseEnter={() => setHoveredId(testimonial.id)}
                    onMouseLeave={() => setHoveredId(-1)}
                  >
                    <Quote className="w-12 h-12 text-gray-400  mb-4 opacity-50" />

                    <div className="flex items-center mb-6">
                      <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition-opacity duration-300" />
                      </div>
                      <div className="ml-1">
                        <h3 className="font-semibold text-lg text-gray-900  dark:text-white transform transition-all duration-300 hover:translate-x-2">
                          {testimonial.name}
                        </h3>
                        {/* <p className="text-gray-600 dark:text-white">
                          {testimonial.designation}
                        </p> */}
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-white leading-relaxed">
                      {`"${testimonial.description}"`}
                    </p>

                    {hoveredId === testimonial.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(testimonials?.length - 2)].map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 
                          ${
                            activeIndex === index
                              ? "bg-blue-600 w-6"
                              : "bg-gray-300"
                          }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Testimonials;
