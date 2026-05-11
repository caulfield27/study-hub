import { Select, SelectItem } from "@heroui/select";
import { useI18n } from "@/shared/i18n";
import { useFilters } from "@/pages/videoCourses/VideoCoursesStore";

export const LanguageFilter = () => {
  const { t } = useI18n();
  const lang = useFilters((state) => state.filters.lang);
  const updateFilters = useFilters((state) => state.updateFilters);
  const languageOptions = [
    { key: "all", label: t("courses.any") },
    { key: "en", label: t("locales.en") },
    { key: "ru", label: t("locales.ru") },
  ] as const;

  return (
    <section className="space-y-3">
      <h3 className="theme-text-muted text-sm font-semibold uppercase tracking-wide">
        {t("common.language")}
      </h3>
      <Select
        aria-label="Course language"
        selectedKeys={[lang]}
        classNames={{
          trigger: "theme-surface-soft",
          label: "theme-text-muted",
          value: "theme-text",
          popoverContent: "theme-surface",
        }}
        onSelectionChange={(keys) => {
          const nextKey = Array.from(keys)[0];
          if (typeof nextKey === "string") {
            updateFilters("lang", nextKey);
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
