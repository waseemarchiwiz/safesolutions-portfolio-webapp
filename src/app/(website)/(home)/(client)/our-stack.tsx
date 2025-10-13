import Link from "next/link";
import { ScanText } from "lucide-react";
import StackIcon from "tech-stack-icons";
import { Button } from "@/components/ui/button";
import { InfiniteSlider } from "@/components/infinite-slider";

export default function OurStack() {
  const languages = [
    <StackIcon name="php" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="laravel" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="python" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="js" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="jquery" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="react" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="nodejs" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="nextjs" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="expressjs" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="vuejs" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="django" className="m-auto size-10 sm:size-12" />,
  ];
  const uiLibraries = [
    <StackIcon name="html5" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="css3" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="tailwindcss" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="shadcnui" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="materialui" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="figma" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="headlessui" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="threejs" className="m-auto size-10 sm:size-12" />,
  ];
  const databaseAndServices = [
    <StackIcon name="azure" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="microsoft" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="mongodb" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="postgresql" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="mysql" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="github" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="kubernetes" className="m-auto size-10 sm:size-12" />,
    <StackIcon name="docker" className="m-auto size-10 sm:size-12" />,
  ];

  return (
    <section className="py-24 bg-transparent">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="mb-3 flex items-center text-sm text-sky-600">
            <ScanText size={15} className="mr-2" aria-hidden />
            <span className="font-semibold uppercase tracking-wide">
              Our Stack
            </span>
          </div>
          <h2 className="text-4xl font-semibold text-slate-900">
            Our Tech <span className="text-sky-600">Stack</span>
          </h2>
          <p className="text-slate-500 max-w-2xl">
            We build our products using the latest technologies and frameworks
            to deliver secure, scalable, and innovative solutions.
          </p>
        </div>

        {/* Infinite sliders */}
        <div className="mt-16 space-y-10">
          {/* Row 1 */}
          <InfiniteSlider speed={40} speedOnHover={20} gap={40}>
            <div className="flex items-center gap-6 sm:gap-10">
              {languages.map((logo, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-300"
                >
                  {logo}
                </div>
              ))}
            </div>
          </InfiniteSlider>

          {/* Row 2 (reverse direction) */}
          <InfiniteSlider speed={35} speedOnHover={20} gap={40} reverse>
            <div className="flex items-center gap-6 sm:gap-10">
              {uiLibraries.map((logo, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-300"
                >
                  {logo}
                </div>
              ))}
            </div>
          </InfiniteSlider>

          {/* Row 3 */}
          <InfiniteSlider speed={30} speedOnHover={20} gap={40}>
            <div className="flex items-center gap-6 sm:gap-10">
              {databaseAndServices.map((logo, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-sky-200 transition-all duration-300"
                >
                  {logo}
                </div>
              ))}
            </div>
          </InfiniteSlider>
        </div>

        {/* CTA Button */}
        <div className="mt-20 text-center">
          <Button
            asChild
            variant="outline"
            className="border-sky-600 text-sky-600 hover:bg-sky-600 hover:text-white transition-all"
          >
            <Link href="#">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
