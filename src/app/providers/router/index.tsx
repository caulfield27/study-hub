import { createBrowserRouter } from "react-router";
import Layout from "../../layout/layout";
import { Auth, Book, Home, Library, Quiz, Quizes, VideoCourses } from "../../lazy";
import { GuestRoutes } from "../accessProviders/GuestRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/quizes",
        element: <Quizes />,
      },
      {
        path: "/quizes/:id",
        element: <Quiz />,
      },
      {
        path: "/library",
        element: <Library />,
      },
      {
        path: "/library/:id",
        element: <Book />,
      },
      {
        path: "/video-courses",
        element: <VideoCourses />,
      },
      {
        path: "/auth",
        element: (
          <GuestRoutes>
            <Auth />
          </GuestRoutes>
        ),
      },
    ],
  },
]);
