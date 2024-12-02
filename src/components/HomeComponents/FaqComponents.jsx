// import React, { useState } from "react";

// const faqData = [
//   {
//     question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
//     answer:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!",
//   },
//   {
//     question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
//     answer:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!",
//   },
//   {
//     question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
//     answer:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!",
//   },
//   {
//     question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
//     answer:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!",
//   },
//   {
//     question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
//     answer:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!",
//   },
//   {
//     question: "Lorem ipsum dolor sit amet consectetur adipisicing?",
//     answer:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic veritatis molestias culpa in, recusandae laboriosam neque aliquid libero nesciunt voluptate dicta quo officiis explicabo consequuntur distinctio corporis earum similique!",
//   },
// ];

// const FaqComponent = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleFaq = (index) => {
//     setOpenIndex((prevIndex) => (prevIndex === index ? null : index)); // Close if already open, otherwise open
//   };

//   return (
//     <div className="flex flex-col gap-10 justify-center items-center p-10 dark:bg-[#000000] ">
//        <hr className="border-t-1 border-black  mt-10" />

//       <h1 className="text-3xl font-bold text-center text-neutral-800 dark:text-white mt-10">
//         Frequently Asked Questions
//       </h1>
//       <div className=" max-w-3xl space-y-2 container mx-auto gap-5 my-10">
//         {faqData.map((faq, index) => (
//           <div
//             key={index}
//             className="border border-gray-300 rounded-lg overflow-hidden"
//           >
//             {/* Question Button */}
//             <button
//               onClick={() => toggleFaq(index)}
//               className="flex justify-between items-center w-full p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
//             >
//               <h2 className="text-[18px] leading-[50px]">{faq.question}</h2>
//               <svg
//                 className={`w-6 h-6 transform transition-transform ${
//                   openIndex === index ? "rotate-180" : "rotate-0"
//                 }`}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M19 9l-7 7-7-7"
//                 />
//               </svg>
//             </button>
//             {/* Answer Content */}
//             {openIndex === index && (
//               <div className="p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200">
//                 <p className="text-[18px] leading-[30px]">{faq.answer}</p>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FaqComponent;
import React, { useState } from "react";

const FaqComponent = () => {
  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleAccordion = (index) => {
    setOpenIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  const faqs = [
    {
      question: "Are there any special discounts available during the event?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at fermentum dui.",
    },
    {
      question:
        "What are the dates and locations for the product launch events?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquam turpis at erat venenatis malesuada.",
    },
    {
      question: "Can I bring a guest with me to the product launch event?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac lacus lectus. Morbi congue facilisis sapien.",
    },
    {
      question: "Are there any special promotions available during the event?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et tincidunt arcu.",
    },
  ];

  return (
    <div className="flex flex-col gap-10 justify-center items-center p-10 dark:bg-zinc-900 ">
      <div className="max-w-7xl mx-auto sm:px-8 px-4  ">
        <div className="mb-12 max-w-4xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="accordion bg-white shadow-md rounded-lg mt-10"
            >
              <button
                type="button"
                className="toggle-button p-6 w-full text-base text-left text-gray-800 flex items-center"
                onClick={() => toggleAccordion(index)}
              >
                <span className="mr-4">{faq.question}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 42 42"
                  className={`w-3 fill-current ml-auto transform transition-transform ${
                    openIndexes.includes(index) ? "rotate-45" : ""
                  }`}
                >
                  <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" />
                </svg>
              </button>
              <div
                className={`content px-6 overflow-hidden transition-all duration-300 ${
                  openIndexes.includes(index) ? "max-h-screen pb-6" : "max-h-0"
                }`}
              >
                <p className="text-sm text-gray-500">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqComponent;
