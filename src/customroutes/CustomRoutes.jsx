import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

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
const BlogDetails = React.lazy(() => import("../pages/Client/BlogDetails"));

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
      path: "/login",
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
          <AdminLayout />
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
              <BlogDetails />
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
          path: "*",
          element: <h2>404 Not Found</h2>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default CustomRoutes;
