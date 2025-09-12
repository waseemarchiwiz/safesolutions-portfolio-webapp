import React, { useState, useEffect } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { testimonialsData, testimonialsTypes } from "../data";

const Testimonial = () => {
  const [hoveredId, setHoveredId] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [data, setData] = useState<testimonialsTypes | null>(null);
  //
  const userUrl = "";
  const api_token = "";

  // const fetchTestimonials = async () => {
  //   try {
  //     const response = await fetch(`${userUrl}/get/testimonial`, {
  //       headers: {
  //         api_token: api_token,
  //       },
  //     });
  //     console.log(response, "testimonials response");

  //     if (response?.data?.succes && response?.data?.testimonials?.length > 0) {
  //       setData(response?.data?.testimonials);
  //     } else {
  //       setData(defaultTestimonials); // Fallback to default data
  //     }
  //     console.log(response, "testimonials Response");
  //   } catch (error) {
  //     console.error("Error fetching testimonials:", error);
  //     setData(testimonials); // Fallback on error
  //   } finally {
  //     // setLoading(false); // Stop loader
  //   }
  // };

  // useEffect(() => {
  //   fetchTestimonials();
  // }, []);

  useEffect(() => {
    let interval = undefined;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((current) =>
          current === testimonialsData.length - 3 ? 0 : current + 1
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonialsData.length]);

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

  // const renderStars = (rating) => {
  //   return [...Array(rating)].map((_, index) => (
  //     <StarIcon
  //       key={index}
  //       size={16}
  //       className="text-yellow-400 fill-yellow-400 transform transition-transform duration-300 hover:scale-110"
  //     />
  //   ));
  // };

  const handlePrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonialsData.length - 3 : current - 1
    );
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setActiveIndex((current) =>
      current === testimonialsData.length - 3 ? 0 : current + 1
    );
    setIsAutoPlaying(false);
  };

  return (
    <section className="  bg-[#FFFFFF] dark:bg-black  py-20 px-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      {/* <motion.div className="max-w-6xl mx-auto relative  "> */}
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
          <div className="overflow-hidden bg-[#FFFFFF] dark:bg-black p-10 ">
            <div
              className="flex transition-transform duration-500  ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 33.33}%)` }}
            >
              {testimonialsData.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full lg:w-1/3 flex-shrink-0 px-4   "
                >
                  <div
                    className={`${testimonial?.bgColor || "dark:bg-[18181b]"}  
                    } backdrop-blur-lg rounded-lg p-8 
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
                        {/* <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover ring-4 ring-white"
                        /> */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition-opacity duration-300" />
                      </div>
                      <div className="ml-1">
                        <h3 className="font-semibold text-lg text-gray-900  dark:text-white transform transition-all duration-300 hover:translate-x-2">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-600 dark:text-white">
                          {/* {testimonial.designation} */}
                        </p>
                        {/* <p className="text-sm text-gray-500">
                          {testimonial.company}
                        </p> */}
                      </div>
                    </div>

                    {/* <div className="flex mb-4 space-x-1">
                      {renderStars(testimonial.rating)}
                    </div> */}

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
            {[...Array(testimonialsData.length - 2)].map((_, index) => (
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

// Add these keyframes to your global CSS
// const style = window !== undefined && window.document.createElement("style");
// style.textContent = `
//   @keyframes blob {
//     0% { transform: translate(0px, 0px) scale(1); }
//     33% { transform: translate(30px, -50px) scale(1.1); }
//     66% { transform: translate(-20px, 20px) scale(0.9); }
//     100% { transform: translate(0px, 0px) scale(1); }
//   }
//   @keyframes shine {
//     from { transform: translateX(-100%); }
//     to { transform: translateX(100%); }
//   }
//   .animate-blob {
//     animation: blob 7s infinite;
//   }
//   .animation-delay-2000 {
//     animation-delay: 2s;
//   }
//   .animation-delay-4000 {
//     animation-delay: 4s;
//   }
//   .animate-shine {
//     animation: shine 1.5s infinite;
//   }
// `;
// window.document.head.appendChild(style);

export default Testimonial;
