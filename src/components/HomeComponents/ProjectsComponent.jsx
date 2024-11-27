import EmblaCarousel from "../../globals/emblacarousels/EmblaCarousels";
import React from "react";
import "../../globals/emblacarousels/embla.css";
import "../../globals/emblacarousels/base.css";
import alphabuilt from "../../assets/projectlogos/alphabuilt.png";
import archiwiz from "../../assets/projectlogos/archiwiz.webp";
import lumsden from "../../assets/projectlogos/lumsdenlogo.webp";

const OPTIONS = {
  align: "start",
  dragFree: true,
  direction: "rtl",
  loop: true,
};
const SLIDE_COUNT = 10;
// const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const SLIDES = [
  {
    image: alphabuilt,
    title: "Alphabuilt",
    description: "This is the description for slide 1.",
    link: "https://archiwiz.com/",
  },
  {
    image: archiwiz,
    title: "Archiwiz",
    description: "This is the description for slide 2.",
    link: "https://example.com/slide2",
  },
  {
    image: lumsden,
    title: "Lumsden Trading",
    description: "This is the description for slide 3.",
    link: "https://example.com/slide3",
  },
  {
    image: alphabuilt,
    title: "Alphabuilt",
    description: "This is the description for slide 1.",
    link: "https://archiwiz.com/",
  },
  {
    image: alphabuilt,
    title: "Alphabuilt",
    description: "This is the description for slide 1.",
    link: "https://archiwiz.com/",
  },
  {
    image: alphabuilt,
    title: "Alphabuilt",
    description: "This is the description for slide 1.",
    link: "https://archiwiz.com/",
  },
  {
    image: alphabuilt,
    title: "Alphabuilt",
    description: "This is the description for slide 1.",
    link: "https://archiwiz.com/",
  },
];

const ProjectsComponent = () => {
  return (
    <div className="px-10 flex justify-center items-center ">
      <div className="container mt-20 ">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-center text-neutral-800 dark:text-white mt-10">
            Our Projects
          </h1>
          <p className=" font-light text-[26px] leading-[50px]  text-center  w-auto   ">
            At Safe Solution, we pride ourselves on delivering impactful
            solutions tailored to our clients' unique needs. With a focus on
            innovation, precision, and excellence, we have successfully
            completed a diverse range of projects
          </p>
        </div>

        <div className="my-20">
          <EmblaCarousel slides={SLIDES} options={OPTIONS} />
        </div>
      </div>
    </div>
  );
};

export default ProjectsComponent;
