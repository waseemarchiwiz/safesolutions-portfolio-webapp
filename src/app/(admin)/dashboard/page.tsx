"use client";
import { useAuth } from "@/app/hooks/use-auth";

export default function Main() {
  const { isLoggedIn, emptyAuthState } = useAuth();
  console.log("auth:----", isLoggedIn);

  return (
    <div className="">
      <h1>Dashboard {isLoggedIn && "|| user is logged in"}</h1>
      <button type="button" onClick={emptyAuthState}>
        logout
      </button>
    </div>
  );
}
