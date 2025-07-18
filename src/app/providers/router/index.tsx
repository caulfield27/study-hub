import { createBrowserRouter } from "react-router";
import Layout from "../../layout/layout";
import { Suspense } from "react";
import { PageLoader } from "../../../shared/ui/Loader/PageLoader";
import { Home, Library, Quiz, Quizes, VideoCourses } from "../../lazy";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/quizes",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Quizes />
          </Suspense>
        ),
      },
      {
        path: "/quizes/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Quiz />
          </Suspense>
        ),
      },
      {
        path: "/library",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Library />
          </Suspense>
        ),
      },
      {
        path: "/video-courses",
        element: (
          <Suspense fallback={<PageLoader />}>
            <VideoCourses />
          </Suspense>
        ),
      },
    ],
  },
]);
