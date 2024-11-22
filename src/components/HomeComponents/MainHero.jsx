import React from "react";
import videobg from "../../assets/videobg.mp4";
import CustomButton from "../../globals/CustomButton";

const MainHero = () => {
  return (
    <div className=" w-[100%]  h-[80vh] relative   ">
      <video
        src={videobg}
        autoPlay
        loop
        className=" w-full h-full object-cover  pt-[6rem]  "
      />
      <div className="absolute top-0 left-0    py-40    md:px-52  bg-black/50 w-full h-full  ">
        <div className="container mx-auto px-4">
        <h1 className=" md:text-[40px] text-[28px] lg:text-[50px]  pt-[40px] text-white ">
          The Home of Futuristic Ideas...
        </h1>
        <p className=" font-light leading-[42px] text-white md:max-w-3xl w-full   ">
          We drive business success by transforming digital experiences,
          delivering innovative solutions that tackle complex challenges with
          precision and adaptability.
        </p>
        </div>

        <div className="mt-5 mx-4  ">
          <CustomButton label="Consult our experts" />
        </div>
      </div>
    </div>
  );
};

export default MainHero;
