import {House, BookOpenText, CircleQuestionMark, GraduationCap, type LucideIcon} from 'lucide-react'

export interface ILinks {
  path: string;
  labelKey: string;
  icon: LucideIcon;
}

export const authedNavLinks: ILinks[] = [
  {
    path: "/",
    labelKey: "nav.home",
    icon: House,
  },
  {
    path: "/library",
    labelKey: "nav.library",
    icon: BookOpenText,
  },
  {
    path: "/quizes",
    labelKey: "nav.quizzes",
    icon: CircleQuestionMark,
  },
  {
    path: "/video-courses",
    labelKey: "nav.videos",
    icon: GraduationCap,
  }
];

export const publicNavLinks: ILinks[] = [
  {
    path: "/",
    labelKey: "nav.home",
    icon: House,
  },
  {
    path: "/library",
    labelKey: "nav.library",
    icon: BookOpenText,
  },
  {
    path: "/quizes",
    labelKey: "nav.quizzes",
    icon: CircleQuestionMark,
  },
  {
    path: "/video-courses",
    labelKey: "nav.videos",
    icon: GraduationCap,
  }
];
