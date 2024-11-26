import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 py-10  dark:bg-[#1f2937]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-center text-neutral-800 dark:text-white mt-10">
            About us
          </h1>
          <p className=" font-light leading-[33px] text-center    w-auto   ">
            Safe Solutions Consultants is excelling in the services of
            backoffice solutions for healthcare, Software Development,
            Architecture and Design and FINTECH.
          </p>
        </div>
        {/* Section with background image */}
        <div
          className="relative rounded-lg overflow-hidden shadow-lg mb-8 mt-20"
          style={{
            backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSsLx3Vlqq0WD3TOeA65nmEdsbtTEapa_kpA&s')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h2 className="text-3xl font-bold text-white text-center dark:text-white">
              Empowering Innovation Through Technology
            </h2>
          </div>
        </div>

        {/* Grid section for content */}
        <div className="grid grid-cols-12 gap-6 items-center">
          {/* Title */}
          <div className="col-span-12 md:col-span-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight mb-4 dark:text-white">
              Transforming Businesses with Technology That Transcends
              Geographies and Platforms
            </h1>
          </div>

          {/* Description */}
          <div className="col-span-12 md:col-span-8">
            <p className="text-gray-600 leading-relaxed dark:text-white">
              SafeSolution Consultants is a premier IT services provider,
              enabling businesses to transform their digital strategies and
              achieve lasting success. We have been delivering innovative
              solutions that help companies navigate the complexities of the
              digital age. With a skilled team of experts, we design and
              implement tailored IT infrastructures that empower our clients to
              become leaders in their respective industries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
