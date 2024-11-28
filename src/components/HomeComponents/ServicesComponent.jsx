import React from "react";
import { GiArtificialIntelligence } from "react-icons/gi";
import { HoverEffect } from "../ui/card-hover-effect";
const ServicesComponent = () => {
  return (
    <div className="flex justify-center flex-col p-10 items-center bg-white dark:bg-zinc-900 ">

      <div className="flex flex-col gap-4 px-32">
        <h1 className="text-3xl font-bold text-center text-neutral-800 dark:text-white mt-10">
          Our Services
        </h1>
        <p className=" font-light text-[26px] leading-[50px] text-center  w-auto   ">
          Our services include Medical Billing and Coding, Web Development and
          Cloud Services, BIM services and Visualization services, and FINTECH.
          We provide robust, proactive and effective management of all problems
          related to our services to help our clients make the most of their
          investments.
        </p>
      </div>
      {/* <div className="container
       grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-3 my-20 ">
        <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
          <div className="flex flex-col gap-3 ">
            <GiArtificialIntelligence className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 " />
            <h1 className="text-gray-400 text-[26px] group-hover:text-white">
              Artificial Intelligence
            </h1>
          </div>
        </div>
        <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
          <div className="flex flex-col gap-3 ">
            <GiArtificialIntelligence className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 " />
            <h1 className="text-gray-400 text-[26px] group-hover:text-white">
              Artificial Intelligence
            </h1>
          </div>
        </div>
        <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
          <div className="flex flex-col gap-3 ">
            <GiArtificialIntelligence className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 " />
            <h1 className="text-gray-400 text-[26px] group-hover:text-white">
              Artificial Intelligence
            </h1>
          </div>
        </div>
        <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
          <div className="flex flex-col gap-3 ">
            <GiArtificialIntelligence className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 " />
            <h1 className="text-gray-400 text-[26px] group-hover:text-white">
              Artificial Intelligence
            </h1>
          </div>
        </div>
        <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
          <div className="flex flex-col gap-3 ">
            <GiArtificialIntelligence className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 " />
            <h1 className="text-gray-400 text-[26px] group-hover:text-white">
              Artificial Intelligence
            </h1>
          </div>
        </div>
        <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
          <div className="flex flex-col gap-3 ">
            <GiArtificialIntelligence className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 " />
            <h1 className="text-gray-400 text-[26px] group-hover:text-white">
              Artificial Intelligence
            </h1>
          </div>
        </div>
        <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
          <div className="flex flex-col gap-3 ">
            <GiArtificialIntelligence className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 " />
            <h1 className="text-gray-400 text-[26px] group-hover:text-white">
              Artificial Intelligence
            </h1>
          </div>
        </div>
        <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
          <div className="flex flex-col gap-3 ">
            <GiArtificialIntelligence className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 " />
            <h1 className="text-gray-400 text-[26px] group-hover:text-white">
              Artificial Intelligence
            </h1>
          </div>
        </div>
        <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
          <div className="flex flex-col gap-3 ">
            <GiArtificialIntelligence className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 " />
            <h1 className="text-gray-400 text-[26px] group-hover:text-white">
              Artificial Intelligence
            </h1>
          </div>
        </div>
        <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
          <div className="flex flex-col gap-3 ">
            <GiArtificialIntelligence className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 " />
            <h1 className="text-gray-400 text-[26px] group-hover:text-white">
              Artificial Intelligence
            </h1>
          </div>
        </div>
        <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
          <div className="flex flex-col gap-3 ">
            <GiArtificialIntelligence className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 " />
            <h1 className="text-gray-400 text-[26px] group-hover:text-white">
              Artificial Intelligence
            </h1>
          </div>
        </div>
        <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
          <div className="flex flex-col gap-3 ">
            <GiArtificialIntelligence className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 " />
            <h1 className="text-gray-400 text-[26px] group-hover:text-white">
              Artificial Intelligence
            </h1>
          </div>
        </div>
        <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
          <div className="flex flex-col gap-3 ">
            <GiArtificialIntelligence className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 " />
            <h1 className="text-gray-400 text-[26px] group-hover:text-white">
              Artificial Intelligence
            </h1>
          </div>
        </div>
        <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
          <div className="flex flex-col gap-3 ">
            <GiArtificialIntelligence className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 " />
            <h1 className="text-gray-400 text-[26px] group-hover:text-white">
              Artificial Intelligence
            </h1>
          </div>
        </div>
        <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
          <div className="flex flex-col gap-3 ">
            <GiArtificialIntelligence className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 " />
            <h1 className="text-gray-400 text-[26px] group-hover:text-white">
              Artificial Intelligence
            </h1>
          </div>
        </div>
        <div className="border border-[#343434] dark:hover:border-indigo-600 hover:border-white hover:border-2  w-[300px] h-[150px] p-5 cursor-pointer bg-black text-white rounded-md group    ">
          <div className="flex flex-col gap-3 ">
            <GiArtificialIntelligence className="w-12 h-12  group-hover:scale-120 ease-in  transition-all group-hover:text-white  text-neutral-500 dark:text-neutral-200 " />
            <h1 className="text-gray-400 text-[26px] group-hover:text-white">
              Artificial Intelligence
            </h1>
          </div>
        </div>

      </div> */}
      <div className="container">
        <HoverEffect items={projects} />
        <hr className="border-t-1 border-black  mt-10" />
      </div>
    </div>
  );
};

export default ServicesComponent;

export const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];
