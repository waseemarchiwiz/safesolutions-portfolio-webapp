 

import React, { useState } from "react";

const faqData = [
  {
    question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!",
  },
  {
    question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!",
  },
  {
    question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!",
  },
  {
    question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!",
  },
  {
    question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!",
  },
  {
    question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!",
  },
];

const FaqComponent = () => {
  const [openIndex, setOpenIndex] = useState(null);  

  const toggleFaq = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index)); // Close if already open, otherwise open
  };

  return (
    <div className="flex flex-col gap-10 justify-center items-center p-10 dark:bg-[#000000] ">
       <hr className="border-t-1 border-black  mt-10" />
      
      <h1 className="text-3xl font-bold text-center text-neutral-800 dark:text-white mt-10">
        Frequently Asked Questions
      </h1>
      <div className=" max-w-3xl space-y-2 container mx-auto gap-5 my-10">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden"
          >
            {/* Question Button */}
            <button
              onClick={() => toggleFaq(index)}
              className="flex justify-between items-center w-full p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <h2 className="text-[18px] leading-[50px]">{faq.question}</h2>
              <svg
                className={`w-6 h-6 transform transition-transform ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {/* Answer Content */}
            {openIndex === index && (
              <div className="p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                <p className="text-[18px] leading-[30px]">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqComponent;
