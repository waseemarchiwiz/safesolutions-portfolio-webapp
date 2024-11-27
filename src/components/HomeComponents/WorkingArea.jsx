import React from "react";
// import { GiArtificialIntelligence } from 'react-icons/gi'
import azure from "../../assets/azure.jpg";
import sql from "../../assets/sql.png";
import github from "../../assets/github.png"
const WorkingArea = () => {
  return (
    <div className="px-10 flex justify-center items-center bg-[#ffffff]  dark:bg-[#1f2937] ">
      <div className="container ">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-center text-neutral-800 dark:text-white mt-10">
            Strategic Partnerships to Unlock Greater Business Value
          </h1>
          {/* <p className=" font-light text-[26px] leading-[50px]  text-center  w-auto   ">
                At Safe Solution, we pride ourselves on delivering impactful
                solutions tailored to our clients' unique needs. With a focus on
                innovation, precision, and excellence, we have successfully
                completed a diverse range of projects
              </p> */}
        </div>
        <div>
          <div
            className="container
       grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-3 my-20 "
          >
            <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
              <div className="flex flex-col gap-3 items-center justify-center py-3">
                <img
                  src={azure}
                  className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 "
                />
                <h1 className="text-gray-400 text-[26px] group-hover:text-white">
                  Azure
                </h1>
              </div>
            </div>
            <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
              <div className="flex flex-col gap-3 items-center justify-center  ">
                <img
                  src={sql}
                  className="w-16 h-16  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 "
                />
                <h1 className="text-gray-400 text-[26px] group-hover:text-white">
                  Sql
                </h1>
              </div>
            </div>
            <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
          <div className="flex flex-col gap-3 items-center justify-center py-3">
            <img src={azure} className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 " />
            <h1 className="text-gray-400 text-[26px] group-hover:text-white">
              Azure
            </h1>
          </div>
        </div>
        <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
          <div className="flex flex-col gap-3 items-center justify-center py-3">
            <img src={github} className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 " />
            <h1 className="text-gray-400 text-[26px] group-hover:text-white">
              Github
            </h1>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkingArea;
