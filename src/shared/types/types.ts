export interface IQuestion {
  id: number;
  question: string;
  variants: string[];
  correct: string;
}

export interface IQuizResponse {
  id: number;
  name: string;
  complexity: number;
  img: string;
  questions: IQuestion[];
}

export interface IQuizeDetails {
  complexity: number;
  quiz: IQuizResponse;
}

export interface IQuiz {
  name: string;
  quizes: IQuizeDetails[];
}

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface IBook {
  id: number;
  name: string;
  author: string;
  image: string;
  pdf: string;
  rating_avg: number | null;
  released: string;
  description: string;
  reviews_count: number;
}
