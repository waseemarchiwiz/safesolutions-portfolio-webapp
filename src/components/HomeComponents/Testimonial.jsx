import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { AnimatedTestimonials } from "../ui/animated-testimonials";
import axios from "axios";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/lottie/loadanimate.json"; // Path to your Lottie JSON file

const defaultTestimonials = [
  {
    description:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    description:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    description:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    description:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    description:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Testimonial = () => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [loading, setLoading] = useState(true); // Loader state

  const userUrl = import.meta.env.VITE_USER_URL;
  const api_token = import.meta.env.VITE_API_TOKEN;

  // Function to fetch testimonials from API
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
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonialData(defaultTestimonials); // Fallback on error
    } finally {
      setLoading(false); // Stop loader
    }
  };

  // Fetch testimonials when the component mounts
  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <section className="text-black py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-center text-neutral-800 dark:text-white mt-10">
            First-Hand Opinions of Clients on Their Partnership Experience
          </h1>
          <p className="font-light text-[20px] md:text-[26px] leading-[50px] text-black dark:text-white mt-4 text-center w-auto">
            We are a software and mobile application development company that
            ensures its expertise extends to offer a seamlessly productive and
            growth-oriented partnership to its clients.
          </p>

          {loading ? (
            <div className="flex justify-center items-center mt-10">
              <Lottie
                animationData={loaderAnimation}
                loop
                style={{ height: "50px", width: "50px" }}
              />
            </div>
          ) : (
            <AnimatedTestimonials testimonials={testimonialData} />
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
