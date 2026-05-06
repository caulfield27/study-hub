import { QuizCard } from "@/pages/quizes/_components";
import { getQuizes } from "@/pages/quizes/Quizes.utils";
import { api } from "@/shared/api/api.handlers";
import { apiRoutes } from "@/shared/api/api.routes";
import { useI18n } from "@/shared/i18n";
import { QuizesSkeleton } from "@/shared/skeletons/quizes/QuizesSkeleton";
import type { IQuizResponse } from "@/shared/types/types";
import { Button } from "@heroui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import useSwr from "swr";

const cardWidth = 250 + 24;

export const RecomendedQuizes = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showControls, setShowControls] = useState(false);
  //api
  const swrParams = {
    method: "get",
    url: apiRoutes.quizes.getRecommended,
  };
  const { data, isLoading } = useSwr<IQuizResponse[]>(
    [swrParams, "public"],
    api.sendRequest,
  );
  const quizes = getQuizes(data ?? []);

  useEffect(() => {
    if (isLoading) return;
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      console.log(container.clientWidth, container.scrollWidth);

      if (container.clientWidth >= container.scrollWidth) {
        setShowControls(false);
      } else {
        setShowControls(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoading]);

  function onNext() {
    const container = containerRef.current;
    if (!container) return;

    container.scrollBy({
      left: cardWidth * 2,
      behavior: "smooth",
    });
  }

  function onPrev() {
    const container = containerRef.current;
    if (!container) return;

    container.scrollBy({
      left: -(cardWidth * 2),
      behavior: "smooth",
    });
  }

  return (
    <section className="flex flex-col gap-6">
      <div className="w-full flex flex-row items-center justify-between">
        <h2 className="theme-text text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
          {t("home.recommendedQuizzes")}
        </h2>
        <div className="flex flex-row gap-7 items-center">
          {showControls && (
            <div className="max-sm:hidden flex flex-row gap-3 mt-1">
              <button
                onClick={onPrev}
                className="cursor-pointer rounded-full p-1.5 bg-(--surface-soft) flex justify-center items-center hover:bg-(--surface-strong)"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={onNext}
                className="cursor-pointer rounded-full p-1.5 bg-(--surface-soft) flex justify-center items-center hover:bg-(--surface-strong)"
              >
                <ChevronRight size={32} />
              </button>
            </div>
          )}
          <Button
            size="lg"
            color="primary"
            onClick={() => navigate("/quizes")}
            variant="light"
          >
            {t("home.allQuizzes")}
          </Button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex flex-row flex-nowrap gap-6 overflow-x-auto no-scrollbar"
      >
        {isLoading ? (
          <QuizesSkeleton size={4} isScrollable />
        ) : (
          quizes.map((quiz) => (
            <QuizCard key={quiz.name} quizes={quiz.quizes} isScrollable />
          ))
        )}
      </div>
    </section>
  );
};
