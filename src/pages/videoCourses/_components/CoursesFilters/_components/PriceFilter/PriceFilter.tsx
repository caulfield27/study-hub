import { Radio, RadioGroup } from "@heroui/radio";
import { useI18n } from "@/shared/i18n";
import { useFilters } from "@/pages/videoCourses/VideoCoursesStore";

export const PriceFilter = () => {
  const { t } = useI18n();
  const price = useFilters((state) => state.filters.price);
  const updateFilters = useFilters((state) => state.updateFilters);
  return (
    <section className="space-y-3">
      <h3 className="theme-text-muted text-sm font-semibold uppercase tracking-wide">
        {t("courses.price")}
      </h3>
      <RadioGroup
        value={price}
        onValueChange={(next) => updateFilters("price", next)}
        classNames={{ label: "theme-text-muted" }}
      >
        <Radio value="all">{t("courses.any")}</Radio>
        <Radio value="free">{t("courses.freeOnly")}</Radio>
        <Radio value="paid">{t("courses.paidOnly")}</Radio>
      </RadioGroup>
    </section>
  );
};
