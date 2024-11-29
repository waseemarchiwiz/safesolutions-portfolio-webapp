import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import CustomButton from "../../globals/CustomButton";
import hero1 from "../../assets/hero.jpg";
import FlipText from "../ui/flip-text";
import WordPullUp from "../ui/word-pull-up";
import hero12 from "../../assets/hero.jpg";
import hero2 from "../../assets/about.webp";

const MainHero = () => {
  const slides = [
    {
      image: hero12, // Replace with the actual path to your image
      title: "The Home of Futuristic Ideas...",
      description:
        "We drive business success by transforming digital experiences, delivering innovative solutions that tackle complex challenges with precision and adaptability.",
    },
    {
      image: hero2, // Replace with the actual path to your image
      title: "Innovation for Tomorrow",
      description:
        "Explore cutting-edge solutions crafted to meet the ever-evolving demands of modern businesses.",
    },
  ];

  return (
    <div className="w-full h-screen md:h-[75vh] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center mt-10 relative"
              style={{
                backgroundImage: `linear-gradient(to right, transparent, transparent), url(${slide.image})`,
              }}
            >
              <div className="absolute top-0 left-0 py-40  bg-black/50 w-full h-full flex flex-col justify-center">
                <div className="container mx-auto px-4">
             
                  <div className=" text-center text-white text-5xl font-bold font-['Poppins']">
                    {" "}
                    {slide.title}
                  </div>
                  <div className="md:w-[628px] w-full mx-auto mt-6 text-center text-white text-xl font-normal font-['Poppins'] leading-normal">
                    {" "}
                    {slide.description}
                  </div>
                   
                  <hr className="w-6 lg:w-16 xl:w-36 h-1 my-4 mt-5 mx-auto bg-indigo-600 border-0 rounded"></hr>
                </div>
                <div className="mt-5 mx-auto">
                  <a
                    className="group relative inline-block overflow-hidden border rounded-lg text-white bg-black border-indigo-600 px-6 md:px-8 py-3 focus:outline-none focus:ring"
                    href="#"
                  >
                    <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
                    <span className="relative text-sm font-medium text-white transition-colors">
                      Consult us
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainHero;
