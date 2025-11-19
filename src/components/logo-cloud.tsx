import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import Image from "next/image";

// companies logos
const Logos = [
  {
    title: "Alpha Build",
    image: "/projectlogos/alpha-removebg-preview.png",
  },
  {
    title: "Archiwiz",
    image: "/projectlogos/archiwiz.webp",
  },
  {
    title: "Lumsden Trading",
    image: "/projectlogos/lumsden.webp",
  },
];

export default function LogoCloud() {
  return (
    <section className=" text-white overflow-hidden py-12 relative">
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            {/* Infinite sliding logos */}
            <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
              {Logos.map((item) => (
                <div className="flex" key={item.title}>
                  <Image
                    className="mx-auto h-10 w-fit"
                    src={item.image}
                    alt={item.title}
                    height={30}
                    width={60}
                  />
                </div>
              ))}
            </InfiniteSlider>

            {/* Edge blur effects */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black via-black/60 to-transparent pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black via-black/60 to-transparent pointer-events-none"></div>

            <ProgressiveBlur
              className="pointer-events-none absolute left-0 top-0 h-full w-20"
              direction="left"
              blurIntensity={1}
            />
            <ProgressiveBlur
              className="pointer-events-none absolute right-0 top-0 h-full w-20"
              direction="right"
              blurIntensity={1}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
