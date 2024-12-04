import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scroll to the top
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // No need to render anything in this component
};

export default ScrollToTop;
