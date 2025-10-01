"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FaqTypes } from "@/app/(admin)/dashboard/(faq-page)/faqs/columns";

const Faq = ({ faqs }: { faqs: FaqTypes[] }) => {
  return (
    <>
      <section
        id="faqs"
        className="gap-10 justify-center items-center p-10 bg-white dark:bg-black"
      >
        <div className="flex justify-center items-center mb-6">
          <div className=" inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <h2 className="text-purple-600 dark:text-white text-sm font-medium">
              Frequently Asked Questions (FAQs)
            </h2>
          </div>
        </div>
        <div className="max-w-7xl mx-auto sm:px-8 px-4">
          <div className="w-full">
            <Accordion type="multiple">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={faq.answer}
                  className="w-full flex flex-col"
                >
                  <AccordionTrigger className="p-6 w-full text-base text-left text-gray-800 dark:text-white flex items-center">
                    <span className="mr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 overflow-hidden transition-all duration-300 ease-in-out max-w-full">
                    <p className="text-sm text-gray-500 dark:text-white">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
