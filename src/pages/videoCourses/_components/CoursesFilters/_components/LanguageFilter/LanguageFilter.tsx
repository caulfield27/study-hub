import { Select, SelectItem } from "@heroui/select";
import type { CourseFiltersState } from "../../../../VideoCoursesTypes";

interface Props {
  value: CourseFiltersState["language"];
  onChange: (value: CourseFiltersState["language"]) => void;
}

const languageOptions = [
  { key: "all", label: "Any language" },
  { key: "en", label: "English" },
  { key: "ru", label: "Русский" },
  { key: "kz", label: "Қазақша" },
] as const;

export const LanguageFilter = ({ value, onChange }: Props) => {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
        Language
      </h3>
      <Select
        aria-label="Course language"
        selectedKeys={[value]}
        onSelectionChange={(keys) => {
          const nextKey = Array.from(keys)[0];
          if (typeof nextKey === "string") {
            onChange(nextKey as CourseFiltersState["language"]);
          }
        }}
      >
        {languageOptions.map((option) => (
          <SelectItem key={option.key}>{option.label}</SelectItem>
        ))}
      </Select>
    </section>
  );
};
