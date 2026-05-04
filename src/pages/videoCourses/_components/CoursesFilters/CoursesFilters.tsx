import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import type { CourseCategory, CourseFiltersState } from "../../VideoCoursesTypes";
import {
  CategoryFilter,
  LanguageFilter,
  PriceFilter,
  RatingFilter,
} from "./_components";
import { useI18n } from "@/shared/i18n";

interface Props {
  categories: CourseCategory[];
  filters: CourseFiltersState;
  onChange: (next: CourseFiltersState) => void;
  onReset: () => void;
}

export function CoursesFilters({ categories, filters, onChange, onReset }: Props) {
  const { t } = useI18n();
  return (
    <aside className="lg:sticky lg:top-6">
      <Card className="theme-surface space-y-6 border p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="theme-text text-lg font-semibold">{t("courses.filtersTitle")}</h2>
            <p className="theme-text-muted text-sm">{t("courses.filtersDescription")}</p>
          </div>
          <Button variant="light" color="primary" onPress={onReset}>
            {t("common.reset")}
          </Button>
        </div>

        <CategoryFilter
          selected={filters.categories}
          categories={categories}
          onChange={(nextCategories) =>
            onChange({
              ...filters,
              categories: nextCategories,
            })
          }
        />

        <PriceFilter
          value={filters.price}
          onChange={(value) =>
            onChange({
              ...filters,
              price: value,
            })
          }
        />

        <RatingFilter
          value={filters.rating}
          onChange={(value) =>
            onChange({
              ...filters,
              rating: value,
            })
          }
        />

        <LanguageFilter
          value={filters.language}
          onChange={(value) =>
            onChange({
              ...filters,
              language: value,
            })
          }
        />
      </Card>
    </aside>
  );
}
