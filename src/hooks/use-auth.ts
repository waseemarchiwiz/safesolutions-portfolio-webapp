"use client";

import { apiClient } from "@/lib/api-config/client";
import { ReturnPayload } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
  // is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // router
  const router = useRouter();

  const CheckProtectedRoute = async () => {
    try {
      const result: ReturnPayload = await apiClient.get("/admin/dashboard");
      if (result?.success) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const LogoutUser = async () => {
    try {
      const result: ReturnPayload = await apiClient.post(
        "/admin/logout",
        {},
        { withCredentials: true }
      );
      console.log("result: ", result);

      if (result?.success) {
        setIsLoggedIn(false);
        router.push("/signin");
      } else {
        console.log("failed to logout");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Only run in the browser
  useEffect(() => {
    CheckProtectedRoute();
  }, []); // run only once

  const logout = () => {
    LogoutUser();
  };

  return { isLoggedIn, logout };
};
