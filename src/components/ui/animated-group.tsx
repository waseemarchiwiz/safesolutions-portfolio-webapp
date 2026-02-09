"use client";

import React, { ReactNode, useMemo } from "react";
import { motion, Variants } from "framer-motion";

export type PresetType =
  | "fade"
  | "slide"
  | "scale"
  | "blur"
  | "blur-slide"
  | "zoom"
  | "flip"
  | "bounce"
  | "rotate"
  | "swing";

export type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  preset?: PresetType;
  as?: React.ElementType;
};

const defaultContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const presetVariants: Record<PresetType, Variants> = {
  fade: {},
  slide: { hidden: { y: 20 }, visible: { y: 0 } },
  scale: { hidden: { scale: 0.9 }, visible: { scale: 1 } },
  blur: { hidden: { filter: "blur(6px)" }, visible: { filter: "blur(0px)" } },
  "blur-slide": {
    hidden: { filter: "blur(6px)", y: 20 },
    visible: { filter: "blur(0px)", y: 0 },
  },
  zoom: {
    hidden: { scale: 0.6 },
    visible: { scale: 1, transition: { type: "spring", stiffness: 300 } },
  },
  flip: {
    hidden: { rotateX: -90 },
    visible: { rotateX: 0 },
  },
  bounce: {
    hidden: { y: -40 },
    visible: { y: 0, transition: { type: "spring", stiffness: 400 } },
  },
  rotate: {
    hidden: { rotate: -180 },
    visible: { rotate: 0 },
  },
  swing: {
    hidden: { rotate: -10 },
    visible: { rotate: 0 },
  },
};

function mergeVariants(base: Variants, extra?: Variants): Variants {
  return {
    hidden: { ...base.hidden, ...extra?.hidden },
    visible: { ...base.visible, ...extra?.visible },
  };
}

export function AnimatedGroup({
  children,
  className,
  variants,
  preset,
  as: Component = "div",
}: AnimatedGroupProps) {
  const containerVariants = mergeVariants(
    defaultContainerVariants,
    variants?.container,
  );

  const itemVariants = mergeVariants(
    defaultItemVariants,
    preset ? presetVariants[preset] : variants?.item,
  );

  const MotionComponent = useMemo(() => motion(Component), [Component]);

  return (
    <MotionComponent
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </MotionComponent>
  );
}
