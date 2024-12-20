import React from "react";
import { GiArtificialIntelligence } from "react-icons/gi";
import { HoverEffect } from "../ui/card-hover-effect";
import CustomButton from "../../globals/CustomButton";
const ServicesComponent = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-center flex-col p-10 items-center md:px-32 bg-white dark:bg-zinc-900 ">
        <div className="flex flex-col gap-4  ">
          <h1 className="text-3xl font-bold text-center text-neutral-800 dark:text-white mt-10">
            Our Services
          </h1>
          <p className=" font-light text-[20px] md:text-[26px] leading-[50px]     text-center  w-auto   ">
            Our services include Medical Billing and Coding, Web Development and
            Cloud Services, BIM services and Visualization services, and
            FINTECH. We provide robust, proactive and effective management of
            all problems related to our services to help our clients make the
            most of their investments.
          </p>
        </div>

        <div className="container flex flex-col justify-center items-center">
          <HoverEffect items={projects} />
          <CustomButton label="Learn More" className="mt-10" to="/services" />
        </div>
      </div>
    </div>
  );
};

export default ServicesComponent;

export const projects = [
  {
    title: "Artificial Intelligence",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Web Development",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
  },
  {
    title: "ERP Management",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Devops",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
  },
  {
    title: "IoT App Development",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
  },
  {
    title: "AR/VR Development",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
  },
];
