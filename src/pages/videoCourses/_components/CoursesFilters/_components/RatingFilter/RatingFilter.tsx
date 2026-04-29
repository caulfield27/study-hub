import { Radio, RadioGroup } from "@heroui/radio";
import type { CourseFiltersState } from "../../../../VideoCoursesTypes";

interface Props {
  value: CourseFiltersState["rating"];
  onChange: (value: CourseFiltersState["rating"]) => void;
}

export const RatingFilter = ({ value, onChange }: Props) => {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
        Rating
      </h3>
      <RadioGroup
        value={value}
        onValueChange={(next) => onChange(next as CourseFiltersState["rating"])}
      >
        <Radio value="all">Any rating</Radio>
        <Radio value="4">4.0 and above</Radio>
        <Radio value="4.5">4.5 and above</Radio>
      </RadioGroup>
    </section>
  );
};
