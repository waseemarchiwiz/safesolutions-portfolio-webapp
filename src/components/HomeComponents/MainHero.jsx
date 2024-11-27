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

const MainHero = () => {
  const slides = [
    {
      image: hero1, // Replace with the actual path to your image
      title: "The Home of Futuristic Ideas...",
      description:
        "We drive business success by transforming digital experiences, delivering innovative solutions that tackle complex challenges with precision and adaptability.",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSsLx3Vlqq0WD3TOeA65nmEdsbtTEapa_kpA&s", // Replace with the actual path to your image
      title: "Innovation for Tomorrow",
      description:
        "Explore cutting-edge solutions crafted to meet the ever-evolving demands of modern businesses.",
    },
  ];

  return (
    <div className="w-full h-[70vh] relative">
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
              className="w-full h-full bg-cover bg-center  relative"
              style={{
                backgroundImage: `linear-gradient(to right, white, transparent), url(${slide.image})`,
              }}
            >
              <div className="absolute top-0 left-0 py-40 md:px-52 bg-black/50 w-full h-full flex flex-col justify-center">
                <div className="container mx-auto px-4">
                  <h1 className="md:text-[40px] text-[60px] lg:text-[80px] pt-[40px] text-white">
                    {slide.title}
                  </h1>
                  <p className="font-light leading-[42px] text-white md:max-w-3xl w-full">
                    {slide.description}
                  </p>
                </div>
                <div className="mt-5 mx-4">
                  <CustomButton label="Consult our experts" />
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
