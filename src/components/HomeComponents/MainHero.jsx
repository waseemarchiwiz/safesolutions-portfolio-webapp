import React from "react";
import { motion } from "framer-motion";
import hero1 from "../../assets/hero.jpg";
import CustomButton from "../../globals/CustomButton";
const MainHero = () => {
  return (
    <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-black    flex items-center overflow-hidden h-[75vh]">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-8 items-center mt-10">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white space-y-6"
        >
          <div className="space-y-3">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl    font-bold tracking-tight"
            >
              Welcome to 
              <span className="block  leading-relaxed text-indigo-300 mt-2">SafeSolution</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg md:text-xl leading-relaxed text-gray-200 max-w-xl"
            >
              Elevate your business potential with innovative digital solutions. We transform complex challenges into streamlined, cutting-edge strategies.
            </motion.p>
          </div>
         
         <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.6, duration: 0.6 }}
         >
          <CustomButton label="Consult us" className="s" />
         </motion.div>
          {/* <motion.div 
            
            className="flex flex-start flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
          >
            
            
             
          </motion.div> */}
        </motion.div>
        
        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:block"
        >
          <div className="relative w-full h-[500px] mt-10">
            <div className="absolute inset-0 bg-indigo-600/30 rounded-2xl blur-2xl"></div>
            <img 
              src={hero1} 
              alt="Business Innovation"
              className=" relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
    </div>
  );
};

export default MainHero;






































// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import CustomButton from "../../globals/CustomButton";
// import hero1 from "../../assets/hero.jpg";
// import FlipText from "../ui/flip-text";
// import WordPullUp from "../ui/word-pull-up";
// import hero12 from "../../assets/hero.jpg";
// import hero2 from "../../assets/about.webp";

// const MainHero = () => {
//   const slides = [
//     {
//       image: hero12, // Replace with the actual path to your image
//       title: "The Home of Futuristic Ideas...",
//       description:
//         "We drive business success by transforming digital experiences, delivering innovative solutions that tackle complex challenges with precision and adaptability.",
//     },
//     {
//       image: hero2, // Replace with the actual path to your image
//       title: "Innovation for Tomorrow",
//       description:
//         "Explore cutting-edge solutions crafted to meet the ever-evolving demands of modern businesses.",
//     },
//   ];

//   return (
//     <div className="w-full h-screen md:h-[75vh] relative">
//       <Swiper
//         modules={[Navigation, Pagination, Autoplay]}
//         navigation
//         pagination={{ clickable: true }}
//         autoplay={{ delay: 5000 }}
//         loop
//         className="w-full h-full"
//       >
//         {slides.map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div
//               className="w-full h-full bg-cover bg-center mt-10 relative"
//               style={{
//                 backgroundImage: `linear-gradient(to right, transparent, transparent), url(${slide.image})`,
//               }}
//             >
//               <div className="absolute top-0 left-0 py-40  bg-black/50 w-full h-full flex flex-col justify-center">
//                 <div className="container mx-auto px-4">
             
//                   <div className=" text-center text-white text-5xl font-bold font-['Poppins']">
//                     {" "}
//                     {slide.title}
//                   </div>
//                   <div className="md:w-[628px] w-full mx-auto mt-6 text-center text-white text-xl font-normal font-['Poppins'] leading-normal">
//                     {" "}
//                     {slide.description}
//                   </div>
                   
//                   <hr className="w-6 lg:w-16 xl:w-36 h-1 my-4 mt-5 mx-auto bg-indigo-600 border-0 rounded"></hr>
//                 </div>
//                 <div className="mt-5 mx-auto">
//                   <a
//                     className="group relative inline-block overflow-hidden border rounded-lg text-white bg-black border-indigo-600 px-6 md:px-8 py-3 focus:outline-none focus:ring"
//                     href="#"
//                   >
//                     <span className="absolute inset-y-0 left-0 w-[2px] bg-indigo-600 transition-all group-hover:w-full group-active:bg-indigo-500"></span>
//                     <span className="relative text-sm font-medium text-white transition-colors">
//                       Consult us
//                     </span>
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default MainHero;
