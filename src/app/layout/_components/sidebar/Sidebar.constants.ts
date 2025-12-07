import {House, BookOpenText, CircleQuestionMark, GraduationCap, type LucideIcon} from 'lucide-react'

interface ILinks {
  path: string;
  name: string;
  icon: LucideIcon;
}

export const navLinks: ILinks[] = [
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