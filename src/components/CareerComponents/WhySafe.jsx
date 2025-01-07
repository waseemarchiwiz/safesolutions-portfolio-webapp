import React, { useEffect, useState } from "react";
import CustomButton from "../../globals/CustomButton";

const WhySafe = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden dark:bg-black ">
      {/* Animated background overlay */}

      {/* Main content */}
      <div className="relative min-h-[600px] container dark:bg-black    mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Left side - Image */}

        {/* Right side - Content */}
        <div
          className={`w-full lg:w-1/2 transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
          }`}
        >
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white ">
              Why Work With Safe Solution
            </h2>

            <p className="text-lg text-gray-600 dark:text-white leading-relaxed">
              SafeSolution Consultants is a premier IT services provider,
              enabling businesses to transform their digital strategies and
              achieve lasting success. We have been delivering innovative
              solutions that help companies navigate the complexities of the
              digital age.
            </p>

            <p className="text-lg text-gray-600 dark:text-white leading-relaxed">
              With a skilled team of experts, we design and implement tailored
              IT infrastructures that empower our clients to become leaders in
              their respective industries.
            </p>
          </div>
        </div>

        <div
          className={`w-full lg:w-1/2 transform transition-all duration-1000 ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-20 opacity-0"
          }`}
        >
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-500/10 rounded-full blur-xl" />

            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src="https://readymadeui.com/cardImg.webp"
                alt="About SafeSolution"
                className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-500"
              />

              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="grid grid-cols-3 gap-4 text-white">
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      10+
                    </div>
                    <div className="text-sm text-gray-300">
                      Years Experience
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      500+
                    </div>
                    <div className="text-sm text-gray-300">Projects Done</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      99%
                    </div>
                    <div className="text-sm text-gray-300">
                      Client Satisfaction
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhySafe;
