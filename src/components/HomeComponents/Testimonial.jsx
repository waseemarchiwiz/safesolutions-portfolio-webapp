import React, { useState, useEffect } from "react";
import { StarIcon, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

const Testimonial = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const userUrl = import.meta.env.VITE_USER_URL;
  const api_token = import.meta.env.VITE_API_TOKEN;
  const [testimonialData, setTestimonialData] = useState([]);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      designation: "Marketing Director",
      // image: "/api/placeholder/64/64",
      description:
        "Working with this team has transformed our business. Their attention to detail and innovative solutions have helped us achieve remarkable results.",
      rating: 5,
      company: "TechCorp Inc.",
      // bgColor: "bg-blue-50",
    },
    {
      id: 2,
      name: "Michael Chen",
      designation: "Product Manager",
      // image: "/api/placeholder/64/64",
      description:
        "The level of professionalism and expertise is outstanding. They consistently deliver beyond expectations and have become an invaluable partner.",
      rating: 5,
      company: "Innovation Labs",
      // bgColor: "bg-purple-50",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      designation: "CEO",
      // image: "/api/placeholder/64/64",
      description:
        "I'm incredibly impressed with their dedication and ability to understand our unique needs. They've helped us stay ahead in a competitive market.",
      rating: 5,
      company: "StartUp Vision",
      // bgColor: "bg-pink-50",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      description: "CEO",
      // image: "/api/placeholder/64/64",
      description:
        "I'm incredibly impressed with their dedication and ability to understand our unique needs. They've helped us stay ahead in a competitive market.",
      rating: 5,
      company: "StartUp Vision",
      // bgColor: "bg-pink-50",
    },
  ];
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(`${userUrl}/get/testimonial`, {
        headers: {
          api_token: api_token,
        },
      });
      console.log(response, "testimonials response");

      if (response?.data?.succes && response?.data?.testimonials?.length > 0) {
        setTestimonialData(response?.data?.testimonials);
      } else {
        setTestimonialData(defaultTestimonials); // Fallback to default data
      }
      console.log(response, "testimonials Response");
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonialData(testimonials); // Fallback on error
    } finally {
      // setLoading(false); // Stop loader
    }
  };
  useEffect(() => {
    fetchTestimonials();
  }, []);
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveIndex((current) =>
          current === testimonials.length - 3 ? 0 : current + 1
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const renderStars = (rating) => {
    return [...Array(rating)].map((_, index) => (
      <StarIcon
        key={index}
        size={16}
        className="text-yellow-400 fill-yellow-400 transform transition-transform duration-300 hover:scale-110"
      />
    ));
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

  return (
    <section className="  bg-[#F1F5F9] dark:bg-[#18181b]  py-20 px-4 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16 transform transition-all duration-500 hover:scale-105">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-purple-600 dark:text-white text-sm font-medium">
                Testimonials
              </span>
            </div>

          <p className="text-lg text-gray-600 dark:text-white max-w-2xl mx-auto mt-7">
            Discover why businesses trust us to deliver exceptional results and
            drive their success forward.
          </p>
        </div>

        <div className="relative">
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
          <div className="overflow-hidden ">
            <div
              className="flex transition-transform duration-500  ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 33.33}%)` }}
            >
              {testimonialData.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full lg:w-1/3 flex-shrink-0 px-4   "
                >
                  <div
                    className={`${testimonial.bgColor || "dark:bg-[18181b]"}  
                    } backdrop-blur-lg rounded-lg p-8 
                              transform transition-all duration-500 hover:-translate-y-2 
                              
                              ${
                                hoveredId === testimonial.id
                                  ? "shadow-2xl scale-105"
                                  : "shadow-lg"
                              }
                              cursor-pointer h-full`}
                    onMouseEnter={() => setHoveredId(testimonial.id)}
                    onMouseLeave={() => setHoveredId(null)}
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
                      "{testimonial.description}"
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
            {[...Array(testimonials.length - 2)].map((_, index) => (
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
      </div>
    </section>
  );
};

// Add these keyframes to your global CSS
const style = document.createElement("style");
style.textContent = `
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  @keyframes shine {
    from { transform: translateX(-100%); }
    to { transform: translateX(100%); }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
  .animate-shine {
    animation: shine 1.5s infinite;
  }
`;
document.head.appendChild(style);

export default Testimonial;
