"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DynamicIcon } from "lucide-react/dynamic";
import Link from "next/link";
import { faqTypes } from "../data";

export default function Faqs({ faqs }: { faqs: faqTypes[] }) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          <div className="md:w-1/3">
            <div className="sticky top-20">
              <h2 className="dark:text-slate-800 font-semibold text-3xl">
                Frequently Asked{" "}
                <span className="block text-sky-600">Questions</span>
              </h2>
              <p className="dark:text-gray-500 text-muted-foreground mt-4">
                Can&apos;t find what you&apos;re looking for? Contact our{" "}
                <Link
                  href="#"
                  className="dark:text-gray-500 text-primary font-medium hover:underline"
                >
                  customer support team
                </Link>
              </p>
            </div>
          </div>
          <div className="md:w-2/3">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqs.length > 0 ? (
                faqs.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={String(item.id)}
                    className="bg-white dark:border-gray-200 shadow-xs rounded-lg border px-4 last:border-b"
                  >
                    <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                      <div className="flex items-center gap-3">
                        <div className="flex size-6">
                          <DynamicIcon
                            name={"clock"}
                            className="dark:text-gray-500 m-auto size-4"
                          />
                        </div>
                        <span className="dark:text-black text-base">
                          {item.question}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5">
                      <div className="px-9">
                        <p className="dark:text-gray-700 text-base">
                          {item.answer}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <div className="w-full shadow bg-white flex flex-col items-center justify-center py-16 text-center px-6">
                  <div className="shadow flex items-center justify-center w-14 h-14 rounded-2xl mb-4">
                    <svg
                      className="w-10 h-10 text-sky-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <p className="text-md font-medium text-slate-500">
                    No faqs Yet
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Check back later for new faqs.
                  </p>
                </div>
              )}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
