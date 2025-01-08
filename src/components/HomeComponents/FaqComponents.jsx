import React, { useEffect, useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/lottie/loadanimate.json";
const FaqComponent = () => {
  const [openIndexes, setOpenIndexes] = useState([]);
  const [faqData, setFaqData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const userUrl =
    "https://safesolution-portfolio-backend-prod-h5h3g5fxa0bgfrcj.eastus-01.azurewebsites.net/api/user";
  const api_token = "hilalahmadkhanisafullstackdevelopertoprotectedtheapi";

  const toggleAccordion = (index) => {
    setOpenIndexes((prevIndexes) =>
      prevIndexes.includes(index)
        ? prevIndexes.filter((i) => i !== index)
        : [...prevIndexes, index]
    );
  };

  // Fallback FAQ data
  const defaultFaqs = [
    {
      question: "What industries does your software company specialize in?",
      answer:
        "We specialize in industries such as finance, healthcare, e-commerce, logistics, and education, offering tailored software solutions for each sector.",
    },
    {
      question: "Do you provide custom software development services?",
      answer:
        "Yes, we offer custom software development services designed to meet your unique business needs and objectives.",
    },
    {
      question: "What technologies do you use for software development?",
      answer:
        "Our team is skilled in modern technologies including React, Node.js, Python, Java, PHP, and cloud platforms like AWS and Azure.",
    },
    {
      question: "What is your approach to data security in software projects?",
      answer:
        "We implement industry-standard security measures, including encryption, secure authentication, and compliance with data protection regulations like GDPR and HIPAA.",
    },
    {
      question: "Do you offer post-launch support for software projects?",
      answer:
        "Yes, we provide comprehensive post-launch support, including maintenance, updates, and bug fixes to ensure your software continues to perform optimally.",
    },
  ];

  const fetchFaq = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${userUrl}/get/faqs`, {
        headers: {
          api_token: api_token,
        },
      });
      console.log(response, "faqs response");
      if (response?.data?.succes && response?.data?.faqs?.length > 0) {
        setFaqData(response.data.faqs);
      } else {
        // If API returns empty or invalid data, use default FAQs
        setFaqData(defaultFaqs);
      }
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      // If API call fails, use default FAQs
      setFaqData(defaultFaqs);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFaq();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <div className="flex justify-center items-center mt-10">
          <Lottie
            animationData={loaderAnimation}
            loop
            style={{ height: "50px", width: "50px" }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      id="faqs"
      className="flex flex-col gap-10 justify-center items-center p-10 bg-[#FFFFFF] dark:bg-black"
    >
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20">
        <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse " />
        <span className="text-purple-600 dark:text-white text-sm font-medium">
          Frequently Asked Questions (FAQs)
        </span>
      </div>

      <div className="max-w-7xl mx-auto sm:px-8 px-4">
        <div className="mb-12 max-w-4xl"></div>

        <div className="w-full">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="accordion bg-[#FFFFFF] dark:bg-black shadow-md rounded-lg mt-10"
            >
              <button
                type="button"
                className="toggle-button p-6 w-full text-base text-left text-gray-800 dark:text-white flex items-center"
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
                <p className="text-sm text-gray-500 dark:text-white">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqComponent;
