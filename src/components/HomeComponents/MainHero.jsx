// import React from "react";
// import videobg from "../../assets/videobg.mp4";
// import CustomButton from "../../globals/CustomButton";

// const MainHero = () => {
//   return (
//     <div className=" w-[100%]  h-[80vh] relative   ">
//       <video
//        src={videobg}
//        autoPlay

//        muted

//        preload="auto"
//        className="w-full h-full object-cover pt-[6rem]"
//       />
//       <div className="absolute top-0 left-0    py-40    md:px-52  bg-black/50 w-full h-full  ">
//         <div className="container mx-auto px-4">
//         <h1 className=" md:text-[40px] text-[28px] lg:text-[50px]  pt-[40px] text-white ">
//           The Home of Futuristic Ideas...
//         </h1>
//         <p className=" font-light leading-[42px] text-white md:max-w-3xl w-full   ">
//           We drive business success by transforming digital experiences,
//           delivering innovative solutions that tackle complex challenges with
//           precision and adaptability.
//         </p>
//         </div>

//         <div className="mt-5 mx-4  ">
//           <CustomButton label="Consult our experts" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainHero;

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
import hero12 from '../../assets/hero1.png'
import hero2 from '../../assets/hero2.png'

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
    <div className="w-full h-[75vh] relative">
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
                  {/* <h1 className="md:text-[40px] text-[60px] lg:text-[80px] pt-[40px] text-white">
                    {slide.title}
                  </h1> */}

                  <div className=" text-center text-gray-300 text-5xl font-bold font-['Poppins']">Very varied and quality Furniture</div>
                  <div className="md:w-[628px] w-full mx-auto mt-6 text-center text-gray-300 text-xl font-normal font-['Poppins'] leading-normal">Lörem ipsum neskade nölingar ronar emedan pogon huruvida vittneslitteratur. Polyk obel, manera innan antenat.</div>
                  {/* <FlipText
                    className="  md:text-[40px] text-[60px] lg:text-[80px] pt-[40px] text-white     "
                    word={slide.title}
                  /> */}
                  {/* <FlipText
                    className="text-center text-white text-5xl font-bold   "
                    word={slide.title}
                  /> */}

                  {/* <WordPullUp
                    className="font-light text-[30px]  text-white  md:max-w-5xl w-full"
                    words={slide.description}
                  /> */}
                  {/* <WordPullUp
                    className="text-center mx-w-md text-white text-sm font-normal leading-normal mt-6"
                    words={slide.description}
                  /> */}
                  {/* <p className="font-light text-[20px] leading-[50px]   text-white md:max-w-3xl w-full">
                    {slide.description}
                  </p> */}
                  <hr className="w-6 lg:w-16 xl:w-36 h-1 my-4 mt-5 mx-auto bg-indigo-600 border-0 rounded"></hr>

                </div>
                <div className="mt-5 mx-auto">
                  <a
                    className="group relative inline-block overflow-hidden border rounded-lg text-white border-indigo-600 px-8 py-3 focus:outline-none focus:ring"
                    href="#"
                  >
                    <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>

                    <span className="relative text-sm font-medium text-white transition-colors">
                      Contact us
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
