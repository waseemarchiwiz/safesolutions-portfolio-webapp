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

const MainHero = () => {
  const slides = [
    {
      image: hero1,
      title: "The Home of Futuristic Ideas...",
      description:
        "We drive business success by transforming digital experiences, delivering innovative solutions that tackle complex challenges with precision and adaptability.",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSsLx3Vlqq0WD3TOeA65nmEdsbtTEapa_kpA&s",
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
              className="w-full h-full bg-cover bg-center relative"
              style={{
                backgroundImage: `linear-gradient(to right, black, transparent), url(${slide.image})`,
              }}
            >
              <div className="absolute top-0 left-0 py-20 md:py-40 px-6 md:px-20 lg:px-52 bg-black/50 w-full h-full flex flex-col justify-center">
                <div className="container mx-auto px-4 text-center md:text-left">
                  <FlipText
                    className="text-[32px]  md:text-[40px] lg:text-[60px] text-white font-bold"
                    word={slide.title}
                  />
                  <WordPullUp
                    className="text-[18px] md:text-[20px] lg:text-[25px] font-light text-white max-w-full md:max-w-3xl lg:max-w-4xl"
                    words={slide.description}
                  />
                  <hr className="w-12 lg:w-24 xl:w-36 h-1 my-6 bg-indigo-600 border-0 rounded" />
                </div>
                <div className="mt-5 flex justify-center md:justify-start">
                  <a
                    className="group relative inline-block overflow-hidden border rounded-lg text-white border-indigo-600 px-6 md:px-8 py-3 focus:outline-none focus:ring"
                    href="#"
                  >
                    <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
                    <span className="relative text-sm font-medium text-white transition-colors">
                      Contact Us
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
