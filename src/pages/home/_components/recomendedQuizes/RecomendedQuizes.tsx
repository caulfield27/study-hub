import { QuizCard } from "@/pages/quizes/_components";
import { getQuizes } from "@/pages/quizes/Quizes.utils";
import { api } from "@/shared/api/api.handlers";
import { apiRoutes } from "@/shared/api/api.routes";
import { QuizesSkeleton } from "@/shared/skeletons/quizes/QuizesSkeleton";
import type { IQuizResponse } from "@/shared/types/types";
import useSwr from "swr";

export const RecomendedQuizes = () => {
  //api
  const swrParams = {
    method: "get",
    url: apiRoutes.quizes.getRecommended,
  };
  const { data, isLoading } = useSwr<IQuizResponse[]>([swrParams, "public"], api.sendRequest);
  const quizes = getQuizes(data ?? []);

  return (
    <div className="flex flex-row flex-nowrap gap-6 overflow-x-auto no-scrollbar">
      {isLoading ? (
        <QuizesSkeleton size={4} isScrollable />
      ) : (
        quizes.map((quiz) => <QuizCard key={quiz.name} quizes={quiz.quizes} isScrollable/>)
      )}
    </div>
  );
};
