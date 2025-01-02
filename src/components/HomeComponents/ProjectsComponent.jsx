// import React from "react";
// import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
// import erpimage from "../../assets/erp.webp";
// import precision from "../../assets/precision.png";
// import nate from "../../assets/nate.png";
// import archiwiz from "../../assets/portal.png";
// import lumsden from "../../assets/lumsden.png";
// import archiwizfront from "../../assets/archiwizfrontpage.png";

// const projects = [
//   {
//     name: "ERP System",
//     description:
//       "Comprehensive ERP and CRM implementation and customization to streamline business processes and improve customer management.",
//     link: "",
//     route: "/erpdetails",
//     img: erpimage,
//   },
//   {
//     name: "Archiwiz Portal",
//     description:
//       "Efficient data extraction solutions using technologies like Beautiful Soup, Scrapy, and Selenium.",
//     link: "",
//     img: archiwiz,
//     route: "/portaldetails",
//   },
//   {
//     name: "Precision Health",
//     description:
//       "Medical Precison gives information about medical health that how to maintain it",
//     link: "https://orange-ocean-0cfaffb1e.5.azurestaticapps.net/",
//     img: precision,
//     route: "/",
//   },
//   {
//     name: "Medical Nate",
//     description:
//       "Medical Precison gives information about medical health that how to maintain it",
//     link: "https://medicalkp-hcffechccfexazfb.eastus-01.azurewebsites.net/",
//     img: nate,
//     route: "",
//   },
//   {
//     name: "Lumsden Trading",
//     description:
//       "Medical Precison gives information about medical health that how to maintain it",
//     link: "https://lumsdentrading.com/",
//     img: lumsden,
//   },
//   {
//     name: "Archiwiz",
//     description:
//       "Medical Precison gives information about medical health that how to maintain it",
//     link: "https://archiwiz.com/",
//     img: archiwizfront,
//   },
// ];
// const ProjectsComponent = () => {
//   return (
//     <div className="container mx-auto px-4">
//       <div className="  px-10 flex justify-center items-center dark:bg-zinc-900">
//         <div className="container mt-20 ">
//           <div className="flex flex-col gap-4">
//             <h1 className="text-3xl font-bold text-center text-neutral-800 dark:text-white mt-10">
//               Our Projects
//             </h1>
//             <p className=" font-light text-[20px] md:text-[26px] leading-[50px]  text-center  w-auto   ">
//               At Safe Solution, we pride ourselves on delivering impactful
//               solutions tailored to our clients' unique needs. With a focus on
//               innovation, precision, and excellence, we have successfully
//               completed a diverse range of projects
//             </p>
//           </div>

//           <div className="my-20 flex justify-center items-center">
//             <InfiniteMovingCards
//               items={projects}
//               direction="right"
//               speed="slow"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectsComponent;

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { Link } from "react-router-dom";

import { projects } from "../../lib/Project";

const ProjectsComponent = ({ background }) => {
  return (
    <section className={`${background} p-16`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-center text-neutral-800 dark:text-white mt-10">
            Our Projects
          </h1>
          <p className="font-light text-[20px] md:text-[26px] leading-[50px] text-center">
            At Safe Solution, we pride ourselves on delivering impactful
            solutions tailored to our clients' unique needs. With a focus on
            innovation, precision, and excellence, we have successfully
            completed a diverse range of projects.
          </p>
        </div>

        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            AutoScroll({
              delay: 3000,
              direction: "backward",
              stopOnFocusIn: true,
            }),
          ]}
          className="w-full    mx-auto mt-10"
        >
          <CarouselContent>
            {projects.map((item, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/3 lg:basis-1/4 h-72  "
              >
                {item.route || item.link ? (
                  <Link
                    to={item.route || ""}
                    className="group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 "
                    target={item.link ? "_blank" : undefined}
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="object-cover w-full h-full "
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity group-hover:bg-opacity-75 flex items-center justify-center">
                      <h3 className="text-white text-lg font-semibold">
                        {item.name}
                      </h3>
                    </div>
                  </Link>
                ) : (
                  <div className="relative overflow-hidden rounded-lg shadow-lg">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <h3 className="text-white text-lg font-semibold">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default ProjectsComponent;
