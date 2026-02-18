"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, animate, motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import useMeasure from "react-use-measure";

export type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  speed?: number;
  speedOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  speed = 100,
  speedOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const controlsRef = useRef<{ stop: () => void } | null>(null);
  const currentSpeedRef = useRef(speed);

  // Starts (or restarts) the infinite loop from wherever the value currently is
  const startLoop = (spd: number, size: number) => {
    controlsRef.current?.stop();

    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    // Snap to a valid position within the loop range so there's no jump
    let current = translation.get();
    const range = contentSize / 2;
    // Normalise current into [from, to] (or [to, from] for reverse)
    const lo = Math.min(from, to);
    // bring current into range using modulo
    current = lo + ((((current - lo) % range) + range) % range);
    translation.set(current);

    const remaining = reverse ? current - to : to - current;
    const firstDuration = Math.abs(remaining) / spd;

    // First segment: reach the end of the loop
    const ctrl = animate(translation, to, {
      ease: "linear",
      duration: firstDuration,
      onComplete: () => {
        // Then loop forever
        const loopCtrl = animate(translation, [from, to], {
          ease: "linear",
          duration: Math.abs(to - from) / spd,
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 0,
        });
        controlsRef.current = loopCtrl;
      },
    });
    controlsRef.current = ctrl;
  };

  // Kick off / restart when size or base speed changes
  useEffect(() => {
    const size = direction === "horizontal" ? width : height;
    if (size === 0) return;
    currentSpeedRef.current = speed;
    startLoop(speed, size);
    return () => controlsRef.current?.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height, gap, direction, reverse, speed]);

  const hoverProps = speedOnHover
    ? {
        onHoverStart: () => {
          const size = direction === "horizontal" ? width : height;
          if (size === 0) return;
          currentSpeedRef.current = speedOnHover;
          startLoop(speedOnHover, size);
        },
        onHoverEnd: () => {
          const size = direction === "horizontal" ? width : height;
          if (size === 0) return;
          currentSpeedRef.current = speed;
          startLoop(speed, size);
        },
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        ref={ref}
        className="flex w-max"
        style={{
          ...(direction === "horizontal"
            ? { x: translation }
            : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
