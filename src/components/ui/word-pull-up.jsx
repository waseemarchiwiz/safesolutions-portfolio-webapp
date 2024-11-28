import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export default function WordPullUp({
  words,

  wrapperFramerProps = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Decreased the stagger time for faster effect
      },
    },
  },

  framerProps = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.3 } }, // Reduced duration for faster animation
  },

  className,
}) {
  return (
    <motion.h1
      variants={wrapperFramerProps}
      initial="hidden"
      animate="show"
      className={cn(
        "font-display text-4xl font-bold tracking-normal drop-shadow-sm",
        className
      )}
    >
      {words.split("").map((word, i) => (
        <motion.span
          key={i}
          variants={framerProps}
          style={{ display: "inline-block", paddingRight: "8px" }}
        >
          {word === "" ? <span>&nbsp;</span> : word}
        </motion.span>
      ))}
    </motion.h1>
  );
}
