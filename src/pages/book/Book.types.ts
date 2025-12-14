import type { IBook } from "@/shared/types/types";

export interface IReview {
  id: number;
  book_id: number;
  user_id: number;
  rating: number;
  comment: string | null;
  created_at: string;
  username: string;
}

export type BookDetails = IBook & {
  reviews: IReview[];
};
