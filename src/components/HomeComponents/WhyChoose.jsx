import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

export default function WhyChoose() {
  const cardData = [
    {
      title: "Innovative Solutions",
      description:
        "Explore cutting-edge technology designed to optimize your business processes.",
      image:
        "https://media.gettyimages.com/id/1478316499/photo/innovation-new-concept-ideas-with-innovations-hand-in-hand-with-future-lamp-technology-and.jpg?s=170667a&w=gi&k=20&c=_qcgU5wgEnqXqKa-t_NlLAtPCbbP3XesPpFXhbmNERQ=",
      link: "https://example.com/solutions",
    },
    {
      title: "Seamless Operations",
      description:
        "Ensure smooth business workflows with our expert back-office support.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSsLx3Vlqq0WD3TOeA65nmEdsbtTEapa_kpA&s",
      link: "https://example.com/operations",
    },
    {
      title: "Scalable Growth",
      description:
        "Empower your enterprise with scalable and sustainable solutions.",
      image:
        "https://images.unsplash.com/photo-1483058712412-4245e9b90334?q=80&w=2560&auto=format&fit=crop",
      link: "https://example.com/growth",
    },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className=" flex justify-center flex-col p-10 items-center  dark:bg-[#18181b]">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-600 dark:text-purple-400 text-sm font-medium">
              Why Choose us
            </span>
          </div>
          <p className=" font-light text-[20px] md:text-[26px] leading-[50px] text-center     w-auto   ">
            We provide expert back-office support services, leveraging
            innovation, industry expertise, and emerging technologies to
            streamline operations and deliver tailored solutions.
          </p>
        </div>

        {/* Wrap the mapped cards with a div that has a grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3    gap-6">
          {cardData.map((item, index) => {
            return (
              <CardContainer key={index} className="inter-var mt-10">
                <CardBody className="w-full bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]  rounded-xl p-6 border">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold   text-neutral-600 dark:text-white"
                  >
                    {item.title}
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                  >
                    {item.description}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <img
                      src={item.image}
                      height="1000"
                      width="1000"
                      className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                      alt="thumbnail"
                    />
                  </CardItem>
                </CardBody>
              </CardContainer>
            );
          })}
        </div>
      </div>
    </div>
  );
}
