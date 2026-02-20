import { useInView, motion } from "framer-motion";
import { useRef } from "react";

const SectionWithReveal = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { rotateX: -15, scale: 0.9, opacity: 0, y: 50 },
    visible: {
      rotateX: 0,
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6, // make the transition faster
        ease: [0.25, 0.1, 0.25, 1] as const,
        when: "beforeChildren",
        staggerChildren: 0.05, // reduce stagger (very small)
        // no delayChildren or delay
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
        overflow: "hidden",
      }}
    >
      <motion.div variants={childVariants}>{children}</motion.div>
    </motion.div>
  );
};

export default SectionWithReveal;
