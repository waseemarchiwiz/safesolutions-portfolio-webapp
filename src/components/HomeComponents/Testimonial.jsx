import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Ken Freedom",
    position: "CTO and Co-founder, JobGet",
    company: "JobGet",
    image: "https://via.placeholder.com/80", // Replace with an actual image URL
    text: "We were looking for an agency that would understand the direness of the hourly worker job search cycle situation when we came across Hybrid Mediaworks. What we liked about the team is how they did not just understand what we were looking for but also gave us ideas on how we could make the process more efficient and simplified for the jobseekers through their empathy mapping skillset.",
  },
  {
    name: "Marcio Freitas",
    position: "Co-Founder, EdFundo",
    company: "EdFundo",
    image: "https://via.placeholder.com/80", // Replace with an actual image URL
    text: "We chose Hybrid Mediaworks for their exceptional results. From the first call, we were very impressed with their ability to deliver top-notch results. Communication and support were fantastic.",
  },
  {
    name: "Sarah Johnson",
    position: "CEO, TechNova",
    company: "TechNova",
    image: "https://via.placeholder.com/80", // Replace with an actual image URL
    text: "Hybrid Mediaworks provided exceptional service. Their insights and strategies transformed our operations and significantly improved customer satisfaction.",
  },
];

const Testimonial = () => {
  return (
    <section className="bg-[#e4e4e7] text-black  dark:bg-black py-20">
      <div className="container mx-auto px-6">
        {/* <h2 className="text-3xl font-bold text-center text-neutral-800 dark:text-white mt-10 ">
          First-Hand Opinions of Clients on Their Partnership Experience
        </h2>
        <p className="text-center text-black dark:text-white mb-12">
          We are a software and mobile application development company that
          ensures its expertise extends to offer a seamlessly productive and
          growth-oriented partnership to its clients.
        </p> */}
        <h1 className="text-3xl font-bold text-center text-neutral-800 dark:text-white mt-10">
        Hear From Our Clients
        </h1>
        <p className=" font-light text-[26px] leading-[50px] text-black dark:text-white mt-4  text-center  w-auto   ">
          We are a software and mobile application development company that
          ensures its expertise extends to offer a seamlessly productive and
          growth-oriented partnership to its clients.
        </p>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="w-full h-[500px] "
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className=" flex justify-center   flex-col text-black  dark:text-white p-8 rounded-xl shadow-lg  dark:shadow-[#1f2937]  mx-auto h-96 max-w-xl">
                <p className="text-black text-[20px] leading-[50px] dark:text-white italic mb-4">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center mt-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">
                      {testimonial.position}
                    </p>
                    <p className="text-sm text-green-500">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonial;
