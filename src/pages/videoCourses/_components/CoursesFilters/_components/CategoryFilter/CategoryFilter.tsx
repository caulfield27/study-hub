import { Button } from "@heroui/button";
import { Chip } from "@heroui/chip";
import type { CourseCategory } from "../../../../VideoCoursesTypes";

interface Props {
  categories: CourseCategory[];
  selected: CourseCategory[];
  onChange: (value: CourseCategory[]) => void;
}

export const CategoryFilter = ({ categories, selected, onChange }: Props) => {
  const toggleCategory = (category: CourseCategory) => {
    if (selected.includes(category)) {
      onChange(selected.filter((item) => item !== category));
      return;
    }

    onChange([...selected, category]);
  };

  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
        Categories
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
                {category}
              </Chip>
            </Button>
          );
        })}
      </div>
    </section>
  );
};
