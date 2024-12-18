import axios from "axios";
import apiUrl from "../../../baseUrl";
import React, { useEffect, useState } from "react";

const FaqComponent = () => {
  const [openIndexes, setOpenIndexes] = useState([]);
  const [faqsData, setFaqsData] = useState([]);

  const toggleAccordion = (index) => {
    setOpenIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  const fetchFaqsData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/get/faq`);
      console.log(response?.data?.faqs, "faq get");
      setFaqsData(response?.data?.faqs);
    } catch (error) {
      console.error("Fetch faqs error:", error);
      toast.error("Failed to fetch FAQs");
    }
  };
  useEffect(() => {
    fetchFaqsData();
  }, []);

 
  return (
    <div
      id="faqs"
      className="flex flex-col gap-10 justify-center items-center p-10 dark:bg-zinc-900"
    >
      <div className="max-w-7xl  mx-auto sm:px-8 px-4  ">
        <div className="mb-12 max-w-4xl ">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="w-full ">
          {faqsData.map((faq, index) => (
            <div
              key={index}
              className="accordion bg-white shadow-md rounded-lg mt-10  "
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
