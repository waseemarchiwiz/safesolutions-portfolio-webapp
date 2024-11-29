import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

const ProjectsComponent = () => {
  return (
    <div className="px-10 flex justify-center items-center ">
      <div className="container mt-20 ">
        

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-center text-neutral-800 dark:text-white mt-10">
            Our Projects
          </h1>
          <p className=" font-light text-[26px] leading-[50px]  text-center  w-auto   ">
            At Safe Solution, we pride ourselves on delivering impactful
            solutions tailored to our clients' unique needs. With a focus on
            innovation, precision, and excellence, we have successfully
            completed a diverse range of projects
          </p>
        </div>

        <div className="my-20 flex justify-center items-center">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectsComponent;

const testimonials = [
  {
    quote:
      "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote:
      "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote:
      "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote:
      "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
