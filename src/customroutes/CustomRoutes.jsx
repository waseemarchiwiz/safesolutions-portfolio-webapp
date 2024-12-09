import Blogs from "@/pages/Admin/AdminBlogs";
import LoadingPage from "../pages/LoadingPage";
import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminCareers from "@/pages/Admin/AdminCareers";
import AdminProjects from "@/pages/Admin/AdminProjects";

const ClientLayout = React.lazy(() => import("../layout/Layout"));
const AdminLayout = React.lazy(() => import("../layout/AdminLayout"));

const Home = React.lazy(() => import("../pages/Client/Home"));
const About = React.lazy(() => import("../pages/Client/About"));
const Services = React.lazy(() => import("../pages/Client/Services"));
const Careers = React.lazy(() => import("../pages/Client/Careers"));
const Contactus = React.lazy(() => import("../pages/Client/Contactus"));
const BlogDetails = React.lazy(() => import("../pages/Client/BlogDetails"));
const AdminDashboard = React.lazy(() =>
  import("../pages/Admin/AdminDashboard")
);

const CustomRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "dashboard",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminDashboard />
            </Suspense>
          ),
        },
        {
          path: "blogs",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <Blogs />
            </Suspense>
          ),
        },
        {
          path: "careers",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminCareers />
            </Suspense>
          ),
        },
        {
          path: "projects",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminProjects />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <ClientLayout />,
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
