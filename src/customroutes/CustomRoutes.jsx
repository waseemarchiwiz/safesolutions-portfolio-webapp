import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
// import AdminLayout from "../layout/AdminLayout";

// Lazy load the pages
const Home = React.lazy(() => import("../pages/Home"));
const About = React.lazy(() => import("../pages/About"));
const Services = React.lazy(() => import("../pages/Services"));
const Careers = React.lazy(() => import("../pages/Careers"));
const Contactus = React.lazy(() => import("../pages/Contactus"));
const LoadingPage = React.lazy(() => import("../pages/LoadingPage"));
const BlogDetails = React.lazy(() => import("../pages/BlogDetails"));


const CustomRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "about",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <About />
            </Suspense>
          ),
        },
        {
          path: "careers",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <Careers />
            </Suspense>
          ),
        },
        {
          path: "services",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <Services />
            </Suspense>
          ),
        },
        {
          path: "contact",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <Contactus />
            </Suspense>
          ),
        },
        {
          path: "blog/:id",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <BlogDetails />
            </Suspense>
          ),
        },
        // {
        //   path: "admin/dashboard",
        //   element: (
        //     <Suspense fallback={<LoadingPage />}>
        //       <AdminLayout />
        //     </Suspense>
        //   ),
        // },
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
