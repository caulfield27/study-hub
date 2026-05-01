import { Radio, RadioGroup } from "@heroui/radio";
import type { CourseFiltersState } from "../../../../VideoCoursesTypes";
import { useI18n } from "@/shared/i18n";

interface Props {
  value: CourseFiltersState["rating"];
  onChange: (value: CourseFiltersState["rating"]) => void;
}

export const RatingFilter = ({ value, onChange }: Props) => {
  const { t } = useI18n();
  return (
    <section className="space-y-3">
      <h3 className="theme-text-muted text-sm font-semibold uppercase tracking-wide">
        {t("courses.sortRating")}
      </h3>
      <RadioGroup
        value={value}
        onValueChange={(next) => onChange(next as CourseFiltersState["rating"])}
        classNames={{ label: "theme-text-muted" }}
      >
        <Radio value="all">{t("courses.anyRating")}</Radio>
        <Radio value="4">{t("courses.fromFour")}</Radio>
        <Radio value="4.5">{t("courses.fromFourAndHalf")}</Radio>
      </RadioGroup>
    </section>
  );
};
