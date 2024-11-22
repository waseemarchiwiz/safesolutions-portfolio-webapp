import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Careers from "../pages/Careers";

const CustomRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "careers",
          element:<Careers />
        },
        {
          path: "services",
          element: <Services />
        },
        {
          path: "*",
          element: <h2>404 Not Found</h2>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default CustomRoutes;
