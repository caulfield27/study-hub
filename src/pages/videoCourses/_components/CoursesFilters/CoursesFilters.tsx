import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import type { CourseCategory } from "../../VideoCoursesTypes";
import {
  CategoryFilter,
  LanguageFilter,
  PriceFilter,
  RatingFilter,
} from "./_components";
import { useI18n } from "@/shared/i18n";
import { useFilters } from "../../VideoCoursesStore";

interface Props {
  categories: CourseCategory[] | undefined;
  isCategoriesPending: boolean;
}

export function CoursesFilters({ categories, isCategoriesPending }: Props) {
  const { t } = useI18n();
  const reset = useFilters((state) => state.reset);
  return (
    <aside className="lg:sticky lg:top-6 min-w-3xs h-[90svh] overflow-y-auto custom-scrollbar">
      <Card className="theme-surface space-y-6 border p-5 max-sm:p-0 max-sm:border-0 max-sm:bg-transparent! shadow-none!">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="theme-text text-lg font-semibold">
              {t("courses.filtersTitle")}
            </h2>
          </div>
          <Button variant="light" color="primary" onPress={reset}>
            {t("common.reset")}
          </Button>
        </div>

        <CategoryFilter
          isLoading={isCategoriesPending}
          categories={categories}
        />
        <PriceFilter />
        <RatingFilter />
        <LanguageFilter />
      </Card>
    </aside>
  );
}
