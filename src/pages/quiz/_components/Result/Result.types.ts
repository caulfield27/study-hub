import type { IQuizResponse } from "@/shared/types/types";

export interface Props {
  result: number;
  quiz: IQuizResponse;
  userSelects: string[];
}