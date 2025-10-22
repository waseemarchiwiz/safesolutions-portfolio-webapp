"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, ScanText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TestimonialTypes } from "@/app/(admin)/dashboard/(testimonial-page)/testimonials/columns";

type TestimonialPropTypes = {
  testimonials: TestimonialTypes[];
};

const Testimonials = ({ testimonials }: TestimonialPropTypes) => {
  const headerVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] as const },
    },
  };

  return (
    <section className="bg-zinc-100 dark:bg-black py-20 px-4 relative overflow-hidden">
      <motion.div
        className="max-w-[77rem] mx-auto relative"
        initial="hidden"
        whileInView="visible"
        variants={headerVariants}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center text-sm text-sky-600">
            <ScanText size={15} className="text-sky-600 mr-2" aria-hidden />
            <span className="font-semibold">Testimonials</span>
          </div>
          <h2 className="text-4xl font-semibold text-slate-900">
            What Our <span className="text-sky-600">Clients Say</span>
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Explore a what our clients say about our services — crafted with
            precision, creativity, and a focus on real-world results.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="mt-10 max-w-7xl mx-auto"
        >
          <CarouselContent>
            {testimonials?.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="md:basis-1/3 sm:basis-1/2 basis-full p-4"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <Card className=" shadow-md  hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-8 relative">
                      <Quote className="absolute top-6 right-6 w-6 h-6 text-sky-300 opacity-40" />

                      <div className="flex items-center gap-4 mb-6">
                        <Avatar className="size-12 ring-2 ring-sky-200">
                          <AvatarImage
                            src={testimonial.url as string}
                            alt={testimonial.name as string}
                          />
                          <AvatarFallback>
                            {testimonial.name?.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                            {testimonial.name}
                          </h3>
                          <span className="text-gray-500 dark:text-gray-400 text-sm">
                            {testimonial.designation}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        “{testimonial.description}”
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Bottom-Centered Navigation */}
          {/* <div className="flex justify-center items-center mt-8 gap-6">
            <CarouselPrevious className="relative left-0  bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-full shadow hover:scale-110 transition-transform duration-300">
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </CarouselPrevious>

            <CarouselNext className="relative right-0 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-3 rounded-full shadow hover:scale-110 transition-transform duration-300">
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </CarouselNext>
          </div> */}
        </Carousel>
      </motion.div>
    </section>
  );
};

export default Testimonials;
