import { Radio, RadioGroup } from "@heroui/radio";
import { useI18n } from "@/shared/i18n";
import { useFilters } from "@/pages/videoCourses/VideoCoursesStore";
import { Rating } from "@/shared/ui/Rating/Rating";

export const RatingFilter = () => {
  const { t } = useI18n();
  const rating = useFilters((state) => state.filters.rating);
  const updateFilters = useFilters((state) => state.updateFilters);
  return (
    <section className="space-y-3">
      <h3 className="theme-text-muted text-sm font-semibold uppercase tracking-wide">
        {t("courses.sortRating")}
      </h3>
      <RadioGroup
        value={rating.toString()}
        onValueChange={(next) => updateFilters("rating", next)}
        classNames={{ label: "theme-text-muted" }}
      >
        <Radio value="all">{t("courses.any")}</Radio>
        <Radio value="3">
          <div className="flex flex-row justify-center items-center gap-2">
            <Rating rating={3} />
            {`3 ${t("courses.andMore")}`}
          </div>
        </Radio>
        <Radio value="3.5">
          <div className="flex flex-row justify-center items-center gap-2">
            <Rating rating={3.5} />
            {`3.5 ${t("courses.andMore")}`}
          </div>
        </Radio>
        <Radio value="4">
          <div className="flex flex-row justify-center items-center gap-2">
            <Rating rating={4} />
            {`4 ${t("courses.andMore")}`}
          </div>
        </Radio>
        <Radio value="4.5">
          <div className="flex flex-row justify-center items-center gap-2">
            <Rating rating={4.5} />
            {`4.5 ${t("courses.andMore")}`}
          </div>
        </Radio>
      </RadioGroup>
    </section>
  );
};
