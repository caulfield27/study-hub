import { Radio, RadioGroup } from "@heroui/radio";
import type { CourseFiltersState } from "../../../../VideoCoursesTypes";
import { useI18n } from "@/shared/i18n";

interface Props {
  value: CourseFiltersState["price"];
  onChange: (value: CourseFiltersState["price"]) => void;
}

export const PriceFilter = ({ value, onChange }: Props) => {
  const { t } = useI18n();
  return (
    <section className="space-y-3">
      <h3 className="theme-text-muted text-sm font-semibold uppercase tracking-wide">
        {t("courses.price")}
      </h3>
      <RadioGroup
        value={value}
        onValueChange={(next) => onChange(next as CourseFiltersState["price"])}
        classNames={{ label: "theme-text-muted" }}
      >
        <Radio value="all">{t("courses.anyCourse")}</Radio>
        <Radio value="free">{t("courses.freeOnly")}</Radio>
        <Radio value="paid">{t("courses.paidOnly")}</Radio>
      </RadioGroup>
    </section>
  );
};
