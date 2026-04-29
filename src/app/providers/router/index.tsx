import { createBrowserRouter } from "react-router";
import Layout from "../../layout/layout";
import {
  Auth,
  Book,
  Home,
  Library,
  Quiz,
  Quizes,
  Search,
  VideoCourseDetails,
  VideoCourses,
} from "../../lazy";
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
        path: "/video-courses/:slug",
        element: <VideoCourseDetails />,
      },
      {
        path: "/search",
        element: <Search/>
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
