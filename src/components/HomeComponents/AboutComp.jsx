// import React from "react";

// const About = () => {
//   return (
//     <div className="bg-gray-100 py-10  dark:bg-[#1f2937]">
//       <div className="container mx-auto px-6">
//       <hr className="border-t-1 border-black  mt-10" />

//         <div className="flex flex-col gap-4">
//           <h1 className="text-3xl font-bold text-center text-neutral-800 dark:text-white mt-10">
//             About us
//           </h1>
//           <p className=" font-light text-[26px] leading-[50px] text-center    w-auto   ">
//             Safe Solutions Consultants is excelling in the services of
//             backoffice solutions for healthcare, Software Development,
//             Architecture and Design and FINTECH.
//           </p>
//         </div>
//         {/* Section with background image */}
//         <div
//           className="relative rounded-lg overflow-hidden shadow-lg mb-8 mt-20"
//           style={{
//             backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSsLx3Vlqq0WD3TOeA65nmEdsbtTEapa_kpA&s')`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             height: "300px",
//           }}
//         >
//           <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//             <h2 className="text-3xl font-bold text-white text-center dark:text-white">
//               Empowering Innovation Through Technology
//             </h2>
//           </div>
//         </div>

//         {/* Grid section for content */}

//       </div>
//     </div>
//   );
// };

// export default About;

import CustomButton from "../../globals/CustomButton";
import React from "react";

const AboutComp = () => {
  return (
    <div  >
      <div className="relative font-[sans-serif] before:absolute before:w-full before:h-full before:inset-0 before:bg-black/50 before:z-10">
        <img
          src="https://readymadeui.com/cardImg.webp"
          alt="Banner Image"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className=" min-h-[500px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center p-6">
          <h2 className="text-white sm:text-4xl text-2xl font-bold mb-6">
            About us
          </h2>
          <p className="text-base text-center text-gray-200">
            SafeSolution Consultants is a premier IT services provider, enabling
            businesses to transform their digital strategies and achieve lasting
            success. We have been delivering innovative solutions that help
            companies navigate the complexities of the digital age. With a
            skilled team of experts, we design and implement tailored IT
            infrastructures that empower our clients to become leaders in their
            respective industries.
          </p>
          <CustomButton
             label="Learn More"
             className="mt-10"
             to="/about"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutComp;
