import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export default function LogoCloud() {
  return (
    <section className=" text-white overflow-hidden py-12 relative">
      <div className="group relative m-auto max-w-7xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          <div className="relative py-6 md:w-[calc(100%-11rem)]">
            {/* Infinite sliding logos */}
            <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
              <div className="flex">
                <img
                  className="mx-auto h-10 w-fit invert"
                  src="/projectlogos/alpha-removebg-preview.png"
                  alt="Nvidia Logo"
                  height="16"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-10 w-fit invert"
                  src="/projectlogos/archiwiz.webp"
                  alt="Column Logo"
                  height="16"
                  width="auto"
                />
              </div>
              <div className="flex">
                <img
                  className="mx-auto h-10 w-fit invert"
                  src="/projectlogos/lumsden.webp"
                  alt="GitHub Logo"
                  height="16"
                  width="auto"
                />
              </div>
              {/* <div className="flex">
                <img
                  className="mx-auto h-5 w-fit invert"
                  src="https://html.tailus.io/blocks/customers/nike.svg"
                  alt="Nike Logo"
                  height="20"
                  width="auto"
                />
              </div> */}
              {/* <div className="flex">
                <img
                  className="mx-auto h-5 w-fit invert"
                  src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg"
                  alt="Lemon Squeezy Logo"
                  height="20"
                  width="auto"
                />
              </div> */}
              {/* <div className="flex">
                <img
                  className="mx-auto h-4 w-fit invert"
                  src="https://html.tailus.io/blocks/customers/laravel.svg"
                  alt="Laravel Logo"
                  height="16"
                  width="auto"
                />
              </div> */}
              {/* <div className="flex">
                <img
                  className="mx-auto h-7 w-fit invert"
                  src="https://html.tailus.io/blocks/customers/lilly.svg"
                  alt="Lilly Logo"
                  height="28"
                  width="auto"
                />
              </div> */}
              {/* <div className="flex">
                <img
                  className="mx-auto h-6 w-fit invert"
                  src="https://html.tailus.io/blocks/customers/openai.svg"
                  alt="OpenAI Logo"
                  height="24"
                  width="auto"
                />
              </div> */}
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
