import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

const ScrollToTop = () => {
  const pathname = usePathname();
  useEffect(() => {
    // Smooth scroll to the top
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // No need to render anything in this component
};

export default ScrollToTop;
