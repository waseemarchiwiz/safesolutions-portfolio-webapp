import React, { useRef, useState, useEffect } from "react";
import {
  useMotionValue,
  useMotionValueEvent,
  animate,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { Card } from "@/components/ui/card";

type Props = {
  end: number;
  start?: number;
  duration?: number; // seconds
  prefix?: string;
  suffix?: string;
  once?: boolean; // animate only first time in view
  locale?: string; // e.g. "en-US"
  className?: string;
  inViewAmount?: number | "some" | "all"; // threshold for useInView
};

const Achievements = () => {
  return (
    <section className="dark:bg-zinc-100 bg-muted py-12 md:py-20">
      <div className=" mx-auto max-w-7xl px-6">
        <Card className="dark:bg-white grid gap-0.5 divide-y *:py-8 *:text-center md:grid-cols-3 md:divide-x md:divide-y-0">
          <div>
            <div className="dark:text-gray-800 text-foreground text-4xl font-bold">
              <CountUpFM end={1200} prefix="+" duration={1.2} />
            </div>
            <p className="dark:text-gray-500 text-muted-foreground">
              Stars on GitHub
            </p>
          </div>

          <div>
            <div className=" dark:text-gray-800 text-foreground text-4xl font-bold">
              <CountUpFM end={56} suffix="%" duration={1.2} />
            </div>
            <p className="text-muted-foreground">Conversion rate</p>
          </div>

          <div>
            <div className="dark:text-gray-800 text-foreground text-4xl font-bold">
              <CountUpFM end={500} prefix="+" duration={1.2} />
            </div>
            <p className="text-muted-foreground">Powered Apps</p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Achievements;

function CountUpFM({
  end,
  start = 0,
  duration = 1.2,
  prefix = "",
  suffix = "",
  once = true,
  locale,
  className,
  inViewAmount = 0.4,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { amount: inViewAmount, once });
  const shouldReduce = useReducedMotion();

  // motion value drives the number
  const mv = useMotionValue(start);
  const [text, setText] = useState(() =>
    format(end, start, prefix, suffix, locale),
  );

  // subscribe to mv changes and round -> text
  useMotionValueEvent(mv, "change", (latest) => {
    setText(format(end, latest, prefix, suffix, locale));
  });

  // kick off animation when in view (and not reduced)
  useEffect(() => {
    if (!isInView) return;
    if (shouldReduce) {
      // snap directly for a11y
      mv.set(end);
      return;
    }

    const controls = animate(mv, end, {
      duration,
      ease: "easeOut",
    });

    return controls.stop; // cleanup on unmount/dep change
  }, [isInView, shouldReduce, mv, end, duration]);

  return (
    <span
      ref={ref}
      // tabular-nums avoids width jitter while digits change
      className={`tabular-nums ${className ?? ""}`}
      aria-label={`${prefix}${end}${suffix}`}
    >
      {text}
    </span>
  );
}

function format(
  end: number,
  value: number,
  prefix: string,
  suffix: string,
  locale?: string,
) {
  const n = Number.isFinite(value) ? Math.round(value) : end;
  const fmt = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  return `${prefix}${fmt.format(n)}${suffix}`;
}
