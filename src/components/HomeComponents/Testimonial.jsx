import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { AnimatedTestimonials } from "../ui/animated-testimonials";

// const testimonials = [
//   {
//     name: "Ken Freedom",
//     position: "CTO and Co-founder, JobGet",
//     company: "JobGet",
//     image: "https://via.placeholder.com/80", // Replace with an actual image URL
//     text: "We were looking for an agency that would understand the direness of the hourly worker job search cycle situation when we came across Hybrid Mediaworks. What we liked about the team is how they did not just understand what we were looking for but also gave us ideas on how we could make the process more efficient and simplified for the jobseekers through their empathy mapping skillset.",
//   },
//   {
//     name: "Marcio Freitas",
//     position: "Co-Founder, EdFundo",
//     company: "EdFundo",
//     image: "https://via.placeholder.com/80", // Replace with an actual image URL
//     text: "We chose Hybrid Mediaworks for their exceptional results. From the first call, we were very impressed with their ability to deliver top-notch results. Communication and support were fantastic.",
//   },
//   {
//     name: "Sarah Johnson",
//     position: "CEO, TechNova",
//     company: "TechNova",
//     image: "https://via.placeholder.com/80", // Replace with an actual image URL
//     text: "Hybrid Mediaworks provided exceptional service. Their insights and strategies transformed our operations and significantly improved customer satisfaction.",
//   },
// ];
const testimonials = [
  {
    quote:
      "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
    name: "Sarah Chen",
    designation: "Product Manager at TechFlow",
    src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
    name: "Michael Rodriguez",
    designation: "CTO at InnovateSphere",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
    name: "Emily Watson",
    designation: "Operations Director at CloudScale",
    src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
    name: "James Kim",
    designation: "Engineering Lead at DataPro",
    src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
    name: "Lisa Thompson",
    designation: "VP of Technology at FutureNet",
    src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },]
const Testimonial = () => {
  return (
    <section className=" text-black  dark:bg-zinc-900 py-20">
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
          First-Hand Opinions of Clients on Their Partnership Experience
        </h1>
        <p className=" font-light text-[20px] md:text-[26px] leading-[50px] text-black dark:text-white mt-4  text-center  w-auto   ">
          We are a software and mobile application development company that
          ensures its expertise extends to offer a seamlessly productive and
          growth-oriented partnership to its clients.
        </p>
        <AnimatedTestimonials testimonials={testimonials} />
        {/* <Swiper
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
                <p className="text-black text-[26px] leading-[50px] dark:text-white italic mb-4">
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
        </Swiper> */}
      </div>
    </section>
  );
};

export default Testimonial;


// import React from 'react'

// const Testimonial = () => {
//   return (
//     <div>
//    <div className="mt-4 font-[sans-serif]">
//   <div className="max-w-6xl mx-auto">
//     <div className="grid md:grid-cols-2 items-center md:gap-16 gap-8">
//       <div className="space-y-4 bg-green-100 rounded-3xl py-8 px-4">
//         <div className="flex items-center ml-auto p-6 bg-white shadow-md rounded-3xl max-w-md">
//           <img src="https://readymadeui.com/profile_2.webp" className="w-20 h-20 rounded-full" />
//           <div className="ml-4">
//             <h4 className="text-gray-800 text-base font-bold">John Doe</h4>
//             <p className="text-sm text-gray-500 mt-2">Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim aute sit.</p>
//           </div>
//         </div>
//         <div className="flex items-center p-6 bg-white shadow-md rounded-3xl max-w-md">
//           <div className="mr-4">
//             <h4 className="text-gray-800 text-base font-bold">Mark Adair</h4>
//             <p className="text-sm text-gray-500 mt-2">Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim aute sit.</p>
//           </div>
//           <img src="https://readymadeui.com/profile_3.webp" className="w-20 h-20 rounded-full ml-auto" />
//         </div>
//       </div>
//       <div className="max-md:-order-1">
//         <h6 className="text-xl font-bold text-gray-300">Testimonials</h6>
//         <h2 className="text-gray-800 text-4xl font-extrabold mt-4">We are loyal with our customer</h2>
//         <p className="text-sm text-gray-500 mt-4 leading-relaxed">Veniam proident aute magna anim excepteur et ex consectetur velit ullamco veniam minim aute sit. Elit occaecat officia et laboris Lorem minim. Officia do aliqua adipisicing ullamco in.</p>
//       </div>
//     </div>
//   </div>
// </div>

//     </div>
//   )
// }

// export default Testimonial