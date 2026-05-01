import {House, BookOpenText, CircleQuestionMark, GraduationCap, type LucideIcon, LogIn} from 'lucide-react'

interface ILinks {
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
  },
  {
    path: "/auth",
    labelKey: "nav.auth",
    icon: LogIn
  }
];
