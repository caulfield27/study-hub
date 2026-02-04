import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Select, SelectItem } from "@heroui/select";
import { Filter, ArrowUpDown, X } from "lucide-react";

export type Filters = {
  technology: string;
  difficulty: string;
  duration: string;
  pricing: string;
};

export type SortOption = "popularity" | "newest" | "duration" | "alphabetical";

interface FilterControlsProps {
  filters: Filters;
  sortBy: SortOption;
  onFilterChange: (filters: Filters) => void;
  onSortChange: (sort: SortOption) => void;
  technologies: string[];
}

export function FilterControls({
  filters,
  onFilterChange,
  technologies,
}: FilterControlsProps) {
  const hasActiveFilters = Object.values(filters).some((v) => v !== "all");

  const clearFilters = () => {
    onFilterChange({
      technology: "all",
      difficulty: "all",
      duration: "all",
      pricing: "all",
    });
  };

  return (
    <Card className="p-6 max-sm:p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="text-neutral-100" size={20} />
          <h2 className="text-lg font-semibold text-neutral-100">Фильтры</h2>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" onPress={clearFilters}>
            <X size={16} />
            Очистить фильтры
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div>
          <Select
            color="secondary"
            value={filters.technology}
            className="max-w-xs max-sm:max-w-full"
            labelPlacement="outside"
            label="Технология"
            onSelectionChange={() => {}}
          >
            {technologies.map((tech) => (
              <SelectItem textValue={tech} key={tech}>
                {tech}
              </SelectItem>
            ))}
          </Select>
        </div>

        <div>
          <Select
            color="secondary"
            value={filters.difficulty}
            className="max-w-xs max-sm:max-w-full"
            labelPlacement="outside"
            label="Сложность"
            onSelectionChange={() => {}}
          >
            <SelectItem textValue={"all"}>{"Все"}</SelectItem>
            <SelectItem textValue={"begginer"}>{"Начинающий"}</SelectItem>
            <SelectItem textValue={"intermediate"}>{"Средний"}</SelectItem>
            <SelectItem textValue={"advanced"}>{"Продвинутый"}</SelectItem>
          </Select>
        </div>

        <div>
          <Select
            color="secondary"
            value={filters.difficulty}
            className="max-w-xs max-sm:max-w-full"
            labelPlacement="outside"
            label="Продолжительность"
            onSelectionChange={() => {}}
          >
            <SelectItem textValue={"all"}>{"Все"}</SelectItem>
            <SelectItem textValue={"short"}>{"Короткие"}</SelectItem>
            <SelectItem textValue={"medium"}>{"Средник"}</SelectItem>
            <SelectItem textValue={"long"}>{"Длинные"}</SelectItem>
          </Select>
        </div>

        <div>
            <Select
            color="secondary"
            value={filters.difficulty}
            className="max-w-xs max-sm:max-w-full"
            labelPlacement="outside"
            label="Цена"
            onSelectionChange={() => {}}
          >
            <SelectItem textValue={"all"}>{"Все курсы"}</SelectItem>
            <SelectItem textValue={"paid"}>{"Платные"}</SelectItem>
            <SelectItem textValue={"free"}>{"Бесплатные"}</SelectItem>
          </Select>
        </div>
      </div>

      <Divider className="bg-neutral-700"/>

      <div className="pt-4">
        <div className="flex items-center gap-2 mb-2">
          <ArrowUpDown className="text-neutral-100" size={18} />
          <h2 className="text-lg font-semibold text-neutral-100">Сортировка по</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { value: "popularity", label: "Самые популярные" },
            { value: "newest", label: "Новые" },
            { value: "duration", label: "Продолжительность"},
            { value: "alphabetical", label: "А-Я" },
          ].map((option) => (
            <Chip color={option.value === 'popularity' ? 'primary' : 'default'} key={option.value} size="lg">{option.label}</Chip>
          ))}
        </div>
      </div>
    </Card>
  );
}
