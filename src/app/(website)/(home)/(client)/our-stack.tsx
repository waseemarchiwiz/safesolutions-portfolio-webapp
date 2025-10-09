import { Button } from "@/components/ui/button";
import {
  Gemini,
  GooglePaLM,
  Replit,
  MediaWiki,
  MagicUI,
  VSCodium,
} from "@/components/logos";
import Link from "next/link";
import { ScanText } from "lucide-react";
import { InfiniteSlider } from "@/components/infinite-slider";

export default function OurStack() {
  const logos = [
    <MediaWiki key="mediawiki" className="m-auto size-10 sm:size-12" />,
    <MagicUI key="magicui" className="m-auto size-10 sm:size-12" />,
    <VSCodium key="vscodium" className="m-auto size-10 sm:size-12" />,
    <Gemini key="gemini" className="m-auto size-10 sm:size-12" />,
    <GooglePaLM key="googlepalm" className="m-auto size-10 sm:size-12" />,
    <Replit key="replit" className="m-auto size-10 sm:size-12" />,
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
          <InfiniteSlider speed={40} speedOnHover={20} gap={80}>
            <div className="flex items-center gap-6 sm:gap-10">
              {logos.map((logo, i) => (
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
          <InfiniteSlider speed={35} speedOnHover={20} gap={80} reverse>
            <div className="flex items-center gap-6 sm:gap-10">
              {logos.map((logo, i) => (
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
          <InfiniteSlider speed={30} speedOnHover={20} gap={80}>
            <div className="flex items-center gap-6 sm:gap-10">
              {logos.map((logo, i) => (
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
