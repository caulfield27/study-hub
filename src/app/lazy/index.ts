import { lazy } from "react";

export const Library = lazy(() => import("../../pages/library/Library"));

export const Book = lazy(() => import("../../pages/book/Book"));

export const Quizes = lazy(() => import("../../pages/quizes/Quizes"));

export const Quiz = lazy(() => import("../../pages/quiz/Quiz"));

export const Home = lazy(() => import("../../pages/home/Home"));

export const VideoCourses = lazy(
  () => import("../../pages/videoCourses/VideoCourses")
);

export const Search = lazy(() => import("../../pages/search/Search"));

export const Auth = lazy(() => import("../../pages/auth/Auth"));