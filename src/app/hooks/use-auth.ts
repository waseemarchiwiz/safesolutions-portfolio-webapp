"use client";

import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAccessToken, setUserAccessToken] = useState<string | null>(null);

  // Only run in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      setUserAccessToken(token);

      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, []); // run only once

  const emptyAuthState = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      setUserAccessToken(null);
      setIsLoggedIn(false);
    }
  };

  return { isLoggedIn, userAccessToken, emptyAuthState };
};
