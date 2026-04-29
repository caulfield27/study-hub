import { Radio, RadioGroup } from "@heroui/radio";
import type { CourseFiltersState } from "../../../../VideoCoursesTypes";

interface Props {
  value: CourseFiltersState["price"];
  onChange: (value: CourseFiltersState["price"]) => void;
}

export const PriceFilter = ({ value, onChange }: Props) => {
  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
        Price
      </h3>
      <RadioGroup
        value={value}
        onValueChange={(next) => onChange(next as CourseFiltersState["price"])}
      >
        <Radio value="all">All courses</Radio>
        <Radio value="free">Free only</Radio>
        <Radio value="paid">Paid only</Radio>
      </RadioGroup>
    </section>
  );
};
