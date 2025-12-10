import {House, BookOpenText, CircleQuestionMark, GraduationCap, type LucideIcon, LogIn} from 'lucide-react'

interface ILinks {
  path: string;
  name: string;
  icon: LucideIcon;
}

export const authedNavLinks: ILinks[] = [
  {
    path: "/",
    name: "Главная",
    icon: House,
  },
  {
    path: "/library",
    name: "Библиотека",
    icon: BookOpenText,
  },
  {
    path: "/quizes",
    name: "Тесты",
    icon: CircleQuestionMark,
  },
  {
    path: "/video-courses",
    name: "Видеоуроки",
    icon: GraduationCap,
  }
];

export const publicNavLinks: ILinks[] = [
  {
    path: "/",
    name: "Главная",
    icon: House,
  },
  {
    path: "/library",
    name: "Библиотека",
    icon: BookOpenText,
  },
  {
    path: "/quizes",
    name: "Тесты",
    icon: CircleQuestionMark,
  },
  {
    path: "/video-courses",
    name: "Видеоуроки",
    icon: GraduationCap,
  },
  {
    path: "/auth",
    name: "Войти",
    icon: LogIn
  }
];