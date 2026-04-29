export type CourseLanguage = "en" | "ru" | "kz";

export type CourseCategory =
  | "Frontend"
  | "Backend"
  | "DevOps"
  | "Mobile"
  | "Data Science"
  | "Career";

export interface ICourseLesson {
  id: number;
  title: string;
  duration: string;
  preview: string;
  description: string;
}

export interface ICourseReview {
  id: number;
  username: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface ICourse {
  id: number;
  slug: string;
  poster: string;
  name: string;
  author: string;
  authorRole: string;
  description: string;
  shortDescription: string;
  reviews_count: number;
  rating_avg: number;
  language: CourseLanguage;
  duration: number;
  lessons_count: number;
  is_free: boolean;
  price: number | null;
  categories: CourseCategory[];
  dateAdded: string;
  popularity: number;
  lessons: ICourseLesson[];
  reviews: ICourseReview[];
}

export type CourseSortKey = "popularity" | "rating" | "dateAdded";

export interface CourseFiltersState {
  categories: CourseCategory[];
  price: "all" | "free" | "paid";
  rating: "all" | "4" | "4.5";
  language: "all" | CourseLanguage;
}
