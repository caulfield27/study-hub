import type { IQuiz } from "@/shared/types/types";

export interface Props {
  result: number;
  quiz: IQuiz;
  userSelects: string[];
}