import type { IBook } from "@/shared/types/types";

export interface Props {
  onSuccess: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export type PostData = Omit<IBook, 'id' | 'rating_avg' | 'reviews_count'>;