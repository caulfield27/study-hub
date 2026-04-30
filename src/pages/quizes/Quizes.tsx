import useSwr from "swr";
import { apiRoutes } from "@/shared/api/api.routes";
import { api } from "@/shared/api/api.handlers";
import type { IQuizResponse } from "@/shared/types/types";
import { useMemo } from "react";
import { getQuizes } from "./Quizes.utils";
import { QuizCard } from "./_components";
import { QuizesSkeleton } from "@/shared/skeletons/quizes/QuizesSkeleton";
import { PageHeader } from "@/shared/ui/PageHeader/PageHeader";
import { GraduationCap } from "lucide-react";

function Quizes() {
  const swrKey = {
    method: "get",
    url: apiRoutes.quizes.get,
  };
  const { data, isLoading } = useSwr<IQuizResponse[]>([swrKey, "public"], api.sendRequest, {
    revalidateOnFocus: false,
  });
  const quizes = useMemo(() => getQuizes(data ?? []), [data]);

  return isLoading ? (
    <QuizesSkeleton size={8} />
  ) : (
    <div className="flex flex-col gap-10 max-sm:gap-4">
      <PageHeader
        Icon={GraduationCap}
        label="Тесты и практика"
        title="Проверьте свои знания и закрепите навыки на практике"
        description="Интерактивные тесты по ключевым направлениям разработки помогут оценить уровень
            подготовки, выявить пробелы и уверенно двигаться к профессиональному росту."
      />
      <div className="w-full flex flex-wrap justify-center items-start gap-8 max-sm:gap-5">
        {quizes ? quizes.map((quiz) => <QuizCard key={quiz.name} quizes={quiz.quizes} />) : null}
      </div>
    </div>
  );
}

export default Quizes;
