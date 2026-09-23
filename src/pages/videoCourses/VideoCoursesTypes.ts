export type CourseLanguage = "en" | "ru" | "tg";

export type CourseCategory = {
  id: number;
  name: string;
}

export interface ICourseLesson {
  name: string;
  duration: string;
  path: string;
}

export interface ICourseReview {
  id: number;
  username: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface ICoursesResponse{
  data: ICourse[]
}

export interface ICourse {
  id: number;
  slug: string;
  poster: string;
  name: string;
  author: string;
  description: string;
  reviews_count: number;
  rating_avg: number;
  language: CourseLanguage;
  duration: string;
  is_free: boolean;
  price: number | null;
  categories: CourseCategory[];
  created_at: string;
  lessons: ICourseLesson[];
  reviews: ICourseReview[];
}

export type CourseSortKey = "popularity" | "rating" | "created_at";

export interface CourseFiltersState {
  category: string[];
  price: 'all' | 'free' | 'paid';
  rating: number | 'all';
  lang: 'all' | 'en' | 'ru';
  sort: CourseSortKey;
}
