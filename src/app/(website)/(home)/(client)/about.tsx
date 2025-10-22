import { ScanText } from "lucide-react";
import Image from "next/image";

export default function About() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl space-y-8 px-6 md:space-y-16">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 flex items-center text-sm text-sky-600">
            <ScanText size={15} className="text-sky-600 mr-2" aria-hidden />
            <span className="font-semibold">About</span>
          </div>
          <h2 className="text-4xl font-semibold text-slate-900">
            About our <span className="text-sky-600">Company</span>
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            Explore about our services at Safe Solutions — crafted with
            precision, creativity, and a focus on real-world results.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:gap-12 lg:gap-24">
          <div className="relative mb-6 sm:mb-0">
            <div className="bg-linear-to-b aspect-76/59 relative rounded-2xl from-zinc-300 to-transparent p-px">
              <Image
                src="/about-main.jpg"
                className="h-full object-cover rounded-[15px] shadow"
                alt="Safe Solutions office workspace"
                width={1207}
                height={1200}
              />
            </div>
          </div>

          <div className="relative space-y-4">
            <p className="text-muted-foreground">
              <span className="text-accent-foreground font-bold">
                Safe Solutions
              </span>{" "}
              is a leading software development and technology solutions company
              dedicated to helping businesses embrace digital transformation. We
              focus on building scalable, secure, and intelligent systems that
              simplify operations and drive growth.
            </p>

            <p className="text-muted-foreground">
              From enterprise software and cloud-based applications to AI-driven
              automation and analytics, our expert team delivers tailored
              solutions that combine innovation.
            </p>

            <div className="pt-6">
              <blockquote className="border-l-4 pl-4">
                <p>
                  At Safe Solutions, our mission is to empower organizations
                  with cutting-edge digital tools that accelerate innovation and
                  enhance productivity. We don&apos;t just create software — we
                  build solutions that evolve with your business and shape a
                  smarter tomorrow.
                </p>

                <div className="mt-6 space-y-3">
                  <cite className="block font-medium">Jahangir Khan, CEO</cite>
                  <Image
                    className="h-full object-cover"
                    src="/updated-logo.png"
                    alt="Logo"
                    height={70}
                    width={70}
                  />
                </div>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
