import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import type { CourseCategory } from "../../../../VideoCoursesTypes";
import { useI18n } from "@/shared/i18n";
import { CourseCategoriesSkeleton } from "@/shared/skeletons/courseCategoriesSkeleton/CourseCategoriesSkeleton";
import { useFilters } from "@/pages/videoCourses/VideoCoursesStore";

interface Props {
  categories: CourseCategory[] | undefined;
  isLoading: boolean;
}

export const CategoryFilter = ({ categories, isLoading }: Props) => {
  const { t } = useI18n();
  const category = useFilters((state) => state.filters.category);
  const updateFilters = useFilters((state) => state.updateFilters);
  const toggleCategory = (cat: string) => {
    if (category.includes(cat)) {
      const updatedCategories = category.filter((c) => c !== cat);
      updateFilters("category", updatedCategories);
      return;
    }
    updateFilters("category", [...category, cat]);
  };

  return isLoading || !categories ? (
    <CourseCategoriesSkeleton />
  ) : (
    <section className="space-y-3">
      <h3 className="theme-text-muted text-sm font-semibold uppercase tracking-wide">
        {t("courses.category")}
      </h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => {
          const active = category.includes(c.name);

          return (
            <Button
              key={c.id}
              size="sm"
              variant={active ? "solid" : "bordered"}
              color={active ? "primary" : "default"}
              onPress={() => toggleCategory(c.name)}
              className="justify-start"
            >
              <Chip
                size="sm"
                variant="light"
              >
                {c.name}
              </Chip>
            </Button>
          );
        })}
      </div>
    </section>
  );
};
