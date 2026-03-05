"use client";

import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Send, Mail, User, MessageSquare, Building2 } from "lucide-react";
import PageHeroSection from "../../(shared)/hero-section";
import { ContactFormValues, contactSchema } from "../(validation)/schema";
import { CompanyTypes } from "@/app/(admin)/dashboard/(company-page)/companies/columns";
import { ContactUsAction } from "../(actions)/action";
import { LoaderCircle } from "@/components/common/loader";
// recaptcha
const ReCAPTCHA = dynamic(() => import("react-google-recaptcha"));

interface MainProps {
  companies: CompanyTypes[];
}

const Main: React.FC<MainProps> = ({ companies }) => {
  // captcha key
  const [captchaKey, setCaptchaKey] = useState(0); // used to reset widget

  // use form
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      subject: "",
      email: "",
      message: "",
      sender_email: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    console.log("values to submit:", values);
    try {
      const result = await ContactUsAction(values);
      console.log("result--", result);

      if (result.success) {
        toast.success(result?.message || "message sent successfully");
        form.reset();
        resetCaptcha();
      } else {
        toast.error(result?.message || "Failed to send message");
        resetCaptcha();
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Unexpected error submitting form",
      );
      resetCaptcha();
    }
  };

  const resetCaptcha = () => {
    setCaptchaKey((prev) => prev + 1);
  };

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* Hero Section */}
      <PageHeroSection
        tag="Contact us"
        title="Contact Us"
        description="Learn who we are and why we excel in delivering innovative solutions that drive business growth and digital transformation."
      />

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[77rem] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Get in <span className="text-sky-600">Touch</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ready to start your next project? Send us a message and we&apos;ll
              get back to you as soon as possible.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-10">
            {/* Contact Form */}
            <Card className="border border-gray-200 dark:border-gray-800 shadow-lg">
              <CardContent className="p-8">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Send us a message
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Fill out the form below and we&apos;ll get back to you
                    within 24 hours.
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {/* Company Selection */}
                    <FormField
                      control={form.control}
                      name="sender_email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                            <Building2 className="h-4 w-4" />
                            Select Company
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl className="w-full">
                              <SelectTrigger className="h-12 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-blue-500 focus:ring-blue-500">
                                <SelectValue placeholder="Choose a company..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                              {companies.map((item) => (
                                <SelectItem key={item.id} value={item.email}>
                                  <div className="flex items-center gap-3 py-1">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                                    <span>{item.name}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                              <User className="h-4 w-4" />
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter your full name"
                                className="h-12 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                              <Mail className="h-4 w-4" />
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="your.email@example.com"
                                className="h-12 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-blue-500 focus:ring-blue-500"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Subject */}
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300 font-medium">
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="What's this about?"
                              className="h-12 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-blue-500 focus:ring-blue-500"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Message */}
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                            <MessageSquare className="h-4 w-4" />
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={5}
                              placeholder="Tell us more about your inquiry..."
                              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-blue-500 focus:ring-blue-500 resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Captcha Form */}
                    <ReCAPTCHA
                      key={captchaKey}
                      sitekey={
                        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string
                      }
                      onChange={(token) =>
                        form.setValue("captchaToken", token as string)
                      }
                      theme="light"
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                      className="w-full h-12 bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
                    >
                      {form.formState.isSubmitting ? (
                        <>
                          <LoaderCircle size={20} />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Map Section */}
            <Card className=" border border-gray-200 dark:border-gray-800 shadow-lg">
              <CardContent className="p-0">
                <div className="bg-gray-100 dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Find Us Here
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Visit our office for face-to-face consultations and
                    meetings.
                  </p>
                </div>
                {/* Office Location */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d245.9139237984189!2d71.42526032296398!3d33.97685736402653!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d91100057fe28b%3A0x3e8ccd00be764f0b!2sSafe%20Solution%20Consultants%20Pvt.%20(Peshawar)!5e0!3m2!1sen!2sus!4v1770887005366!5m2!1sen!2sus"
                  width="600"
                  loading="lazy"
                  className="w-full h-96 border-0"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
