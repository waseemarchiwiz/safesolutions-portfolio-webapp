import React from "react";
import { motion } from "framer-motion";
import hero2 from "../../assets/hero2.jpg";
import CustomButton from "../../globals/CustomButton";

const MainHero = () => {
  return (
    <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center overflow-hidden p-10">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 z-0"></div>

      <div className="container mx-auto px-4 relative z-10 grid md:grid-cols-2 gap-8 items-center mt-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white space-y-6"
        >
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[25px] md:text-[25px] lg:text-[40px] font-bold tracking-tight"
            >
              Empower Your Business with
              <span className="block leading-relaxed text-indigo-300 mt-2  ">
                Safe Solution
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className=" text-[20px] md:text-[20px] leading-relaxed text-gray-200 max-w-xl"
            >
              Elevate your business potential with innovative digital solutions.
              We transform complex challenges into streamlined, cutting-edge
              strategies.
            </motion.p>
          </div>

         {/* /* The code snippet you provided is using the `motion` component from the `framer-motion`
         library in a React application. */ }
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <CustomButton label="Consult us" className="s" to="/contact" />
          </motion.div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:block"
        >
          <div className="relative w-full h-[300px] sm:h-[300px] md:h-[350px] xl:h-[500px] mt-10">
            <div className="absolute inset-0 bg-indigo-600/30 rounded-2xl blur-2xl"></div>
            <img
              src={hero2}
              alt="Business Innovation"
              className="relative z-10 w-full h-full   object-cover rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
    </div>
  );
};

export default MainHero;
