import { Select, SelectItem } from "@heroui/select";
import type { CourseFiltersState } from "../../../../VideoCoursesTypes";
import { useI18n } from "@/shared/i18n";

interface Props {
  value: CourseFiltersState["language"];
  onChange: (value: CourseFiltersState["language"]) => void;
}

export const LanguageFilter = ({ value, onChange }: Props) => {
  const { t } = useI18n();
  const languageOptions = [
    { key: "all", label: t("courses.anyLanguage") },
    { key: "en", label: t("locales.en") },
    { key: "ru", label: t("locales.ru") },
    { key: "tg", label: t("locales.tg") },
  ] as const;

  return (
    <section className="space-y-3">
      <h3 className="theme-text-muted text-sm font-semibold uppercase tracking-wide">
        {t("common.language")}
      </h3>
      <Select
        aria-label="Course language"
        selectedKeys={[value]}
        classNames={{
          trigger: "theme-surface-soft",
          label: "theme-text-muted",
          value: "theme-text",
          popoverContent: "theme-surface",
        }}
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
