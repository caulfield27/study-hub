import HomeIcon from "@mui/icons-material/Home";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import QuizIcon from "@mui/icons-material/Quiz";
import SchoolIcon from "@mui/icons-material/School";
// import PersonIcon from "@mui/icons-material/Person";
// import LoginIcon from "@mui/icons-material/Login";
import type { ReactElement } from "react";

interface ILinks {
  path: string;
  name: string;
  icon: ReactElement;
}

export const navLinks: ILinks[] = [
  {
    path: "/",
    name: "Главная",
    icon: <HomeIcon />,
  },
  {
    path: "/library",
    name: "Библиотека",
    icon: <LocalLibraryIcon />,
  },
  {
    path: "/quizes",
    name: "Тесты",
    icon: <QuizIcon/>,
  },
  {
    path: "/video-courses",
    name: "Видеоуроки",
    icon: <SchoolIcon/>,
  },
  // {
  //     path: '/courses',
  //     name: 'Academy courses',
  // },
  // {
  //     path: '/mentors',
  //     name: 'Our mentors',
  // },
  // {
  //     path: '/auth/login',
  //     name: 'Login',
  // },
];
