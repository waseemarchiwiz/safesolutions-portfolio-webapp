"use client";

import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  // button visibility state
  const [showButton, setshowButton] = useState<boolean>(false);

  // Function to handle scroll to top
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleVisibility = () => {
    if (window.scrollY > 100) {
      setshowButton(true);
    } else {
      setshowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleToggleVisibility);
    return () => {
      window.removeEventListener("scroll", handleToggleVisibility);
    };
  }, [showButton]);

  // Render the button only when the visibility state is true
  if (showButton) {
    return (
      <Button
        variant="outline"
        className="dark:bg-sky-600 dark:hover:bg-sky-700 cursor-pointer bg-sky-600 hover:bg-sky-700 hover:text-white border-0 text-white fixed bottom-16 right-10"
        onClick={handleScrollToTop}
      >
        <ChevronUp />
      </Button>
    );
  }
};

export default ScrollToTop;
