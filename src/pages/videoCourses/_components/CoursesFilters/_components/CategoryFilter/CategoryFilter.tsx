import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import type { CourseCategory } from "../../../../VideoCoursesTypes";
import { getLocalizedCategoryLabel, useI18n } from "@/shared/i18n";

interface Props {
  categories: CourseCategory[];
  selected: CourseCategory[];
  onChange: (value: CourseCategory[]) => void;
}

export const CategoryFilter = ({ categories, selected, onChange }: Props) => {
  const { t } = useI18n();
  const toggleCategory = (category: CourseCategory) => {
    if (selected.includes(category)) {
      onChange(selected.filter((item) => item !== category));
      return;
    }

    onChange([...selected, category]);
  };

  return (
    <section className="space-y-3">
      <h3 className="theme-text-muted text-sm font-semibold uppercase tracking-wide">
        {t("courses.category")}
      </h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const active = selected.includes(category);

          return (
            <Button
              key={category}
              size="sm"
              variant={active ? "solid" : "bordered"}
              color={active ? "primary" : "default"}
              onPress={() => toggleCategory(category)}
              className="justify-start"
            >
              <Chip
                size="sm"
                variant="light"
                color={active ? "warning" : "default"}
              >
                {getLocalizedCategoryLabel(category, t)}
              </Chip>
            </Button>
          );
        })}
      </div>
    </section>
  );
};
