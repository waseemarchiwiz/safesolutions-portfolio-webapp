import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";
import ProtectedRoutes from "./ProtectedRoutes";
import ErrorPage from "@/pages/ErrorPage";
import Project from "@/pages/Client/projectsdetails/Project";
import Blog from "@/pages/Client/BlogDetails/Blogs";

// Lazy loading for layouts
const ClientLayout = React.lazy(() => import("../layout/Layout"));
const AdminLayout = React.lazy(() => import("../layout/AdminLayout"));

// Lazy loading for client pages
const Home = React.lazy(() => import("../pages/Client/Home"));
const About = React.lazy(() => import("../pages/Client/About"));
const Services = React.lazy(() => import("../pages/Client/Services"));
const BlogsPage = React.lazy(() => import("../pages/Client/Blogs"));
const Careers = React.lazy(() => import("../pages/Client/Careers"));
const Contactus = React.lazy(() => import("../pages/Client/Contactus"));
const BlogDetails = React.lazy(() => import("../pages/Client/BlogDetails/BlogDetails"));

// Lazy loading for admin pages
const AdminBlogs = React.lazy(() => import("../pages/Admin/AdminBlogs"));
const AdminCareers = React.lazy(() => import("../pages/Admin/AdminCareers"));
const AdminProjects = React.lazy(() => import("../pages/Admin/AdminProjects"));
const AdminTeams = React.lazy(() => import("../pages/Admin/AdminTeams"));
const AdminTestemonial = React.lazy(() =>
  import("../pages/Admin/AdminTestemonial")
);
const Signin = React.lazy(() => import("../pages/Admin/Signin"));
const AdminFaqs = React.lazy(() => import("../pages/Admin/AdminFaqs"));
const AdminServices = React.lazy(() => import("../pages/Admin/AdminServices"));
const AdminDashboard = React.lazy(() =>
  import("../pages/Admin/AdminDashboard")
);

const CustomRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/admin/login",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Signin />
        </Suspense>
      ),
    },
    {
      path: "/admin",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <ProtectedRoutes>
            <AdminLayout />
          </ProtectedRoutes>
        </Suspense>
      ),
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
              <AdminBlogs />
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
        {
          path: "teams",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminTeams />
            </Suspense>
          ),
        },
        {
          path: "testimonials",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminTestemonial />
            </Suspense>
          ),
        },
        {
          path: "faqs",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminFaqs />
            </Suspense>
          ),
        },
        {
          path: "services",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <AdminServices />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <ClientLayout />
        </Suspense>
      ),
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
              <Blog />
            </Suspense>
          ),
        },
        {
          path: "blogs",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <BlogsPage />
            </Suspense>
          ),
        },
        {
          path: "/project/:project",
          element: (
            <Suspense fallback={<LoadingPage />}>
              <Project />
            </Suspense>
          ),
        },
        // {
        //   path: "/portaldetails",
        //   element: (
        //     <Suspense fallback={<LoadingPage />}>
        //       <PortalDetails />
        //     </Suspense>
        //   ),
        // },
        {
          path: "*",
          element: <ErrorPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default CustomRoutes;
