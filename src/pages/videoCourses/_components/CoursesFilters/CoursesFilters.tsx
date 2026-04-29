import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import type { CourseCategory, CourseFiltersState } from "../../VideoCoursesTypes";
import {
  CategoryFilter,
  LanguageFilter,
  PriceFilter,
  RatingFilter,
} from "./_components";

interface Props {
  categories: CourseCategory[];
  filters: CourseFiltersState;
  onChange: (next: CourseFiltersState) => void;
  onReset: () => void;
}

export function CoursesFilters({ categories, filters, onChange, onReset }: Props) {
  return (
    <aside className="lg:sticky lg:top-6">
      <Card className="space-y-6 border border-neutral-800 bg-neutral-900/80 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">Фильтры</h2>
            <p className="text-sm text-neutral-400">Сузьте подборку под свой запрос</p>
          </div>
          <Button variant="light" color="primary" onPress={onReset}>
            Reset
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
