import CustomButton from "@/globals/CustomButton";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="bg-gradient-to-r  min-h-screen flex items-center justify-center">
      <div className="w-11/12 md:w-9/12 bg-white shadow overflow-hidden sm:rounded-lg pb-8">
        <div className="border-t border-gray-200 text-center pt-8">
          <h1 className="text-9xl font-bold text-[#1e67b1]">404</h1>
          <h1 className="text-4xl font-medium py-8">Oops! Page not found</h1>
          <p className="text-xl pb-8 px-12 text-gray-500">
            Oops! The page you are looking for does not exist. It might have
            been moved or deleted.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
