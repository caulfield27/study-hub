import { useMemo, useState } from "react";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { Chip } from "@heroui/chip";
import { Filter } from "lucide-react";
import { CourseCard, CoursesFilters } from "./_components";
import type { CourseFiltersState, CourseSortKey } from "./VideoCoursesTypes";
import { videoCoursesMock } from "./videoCourses.data";
import { cn } from "@/shared/utils/clx";

const sortOptions: { key: CourseSortKey; label: string }[] = [
  { key: "popularity", label: "Popularity" },
  { key: "rating", label: "Rating" },
  { key: "dateAdded", label: "Date Added" },
];

const initialFilters: CourseFiltersState = {
  categories: [],
  price: "all",
  rating: "all",
  language: "all",
};

function VideoCourses() {
  const [sortBy, setSortBy] = useState<CourseSortKey>("popularity");
  const [filters, setFilters] = useState<CourseFiltersState>(initialFilters);
  const [showFilters, setShowFilters] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = useMemo(
    () => [...new Set(videoCoursesMock.flatMap((course) => course.categories))],
    [],
  );

  const filteredCourses = useMemo(() => {
    const result = videoCoursesMock.filter((course) => {
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.some((category) => course.categories.includes(category));
      const matchesPrice =
        filters.price === "all" || (filters.price === "free" ? course.is_free : !course.is_free);
      const matchesRating = filters.rating === "all" || course.rating_avg >= Number(filters.rating);
      const matchesLanguage = filters.language === "all" || course.language === filters.language;

      return matchesCategory && matchesPrice && matchesRating && matchesLanguage;
    });

    return result.sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating_avg - a.rating_avg;
      }
      if (sortBy === "dateAdded") {
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      }
      return b.popularity - a.popularity;
    });
  }, [filters, sortBy]);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-3">
            <Chip
              color="primary"
              variant="flat"
              className="border border-orange-500/20 bg-(--primary-color)/10 text-(--primary-color)"
            >
              Video courses
            </Chip>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white md:text-4xl">
                Выберите курс и начните обучение в удобном темпе
              </h1>
              <p className="max-w-3xl text-neutral-300">
                Подборка практических видео-курсов по frontend, backend, DevOps, mobile и
                data-направлениям.
              </p>
            </div>
          </div>

          <Card className="border border-neutral-800 bg-neutral-900/80 px-5 py-4">
            <p className="text-sm text-neutral-400">Доступно сейчас</p>
            <p className="text-2xl font-semibold text-white">{filteredCourses.length} курсов</p>
          </Card>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/80 p-4">
        <div className="flex w-full flex-col gap-2 sm:w-auto">
          <span className="text-sm text-neutral-400">Sort by</span>
          <Select
            aria-label="Sort courses"
            selectedKeys={[sortBy]}
            className="w-full min-w-[220px] sm:w-[220px]"
            onSelectionChange={(keys) => {
              const nextKey = Array.from(keys)[0];
              if (typeof nextKey === "string") {
                setSortBy(nextKey as CourseSortKey);
              }
            }}
          >
            {sortOptions.map((option) => (
              <SelectItem key={option.key}>{option.label}</SelectItem>
            ))}
          </Select>
        </div>

        <Button
          variant={showFilters ? "solid" : "bordered"}
          color="primary"
          startContent={<Filter className="h-4 w-4" />}
          className="hidden lg:inline-flex"
          onPress={() => setShowFilters((prev) => !prev)}
        >
          {showFilters ? "Hide filters" : "Show filters"}
        </Button>

        <Button
          variant="solid"
          color="primary"
          startContent={<Filter className="h-4 w-4" />}
          className="lg:hidden"
          onPress={() => setMobileFiltersOpen(true)}
        >
          Show filters
        </Button>
      </div>

      <div
        className={cn(
          "grid gap-6",
          showFilters ? "lg:grid-cols-[300px_minmax(0,1fr)]" : "grid-cols-1",
        )}
      >
        {showFilters && (
          <div className="hidden lg:block">
            <CoursesFilters
              categories={categories}
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters(initialFilters)}
            />
          </div>
        )}

        <section className="space-y-4">
          <p className="text-sm text-neutral-400">Найдено {filteredCourses.length} курсов</p>

          <div
            className={cn(
              "grid grid-cols-1 items-stretch gap-5",
              showFilters ? "xl:grid-cols-2" : "lg:grid-cols-2 xl:grid-cols-3",
            )}
          >
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </div>

      <Modal
        isOpen={mobileFiltersOpen}
        onOpenChange={setMobileFiltersOpen}
        placement="bottom"
        scrollBehavior="inside"
        size="full"
        classNames={{
          wrapper: "z-[9999]",
        }}
      >
        <ModalContent className="bg-neutral-950">
          <ModalHeader className="border-b border-neutral-800">Фильтры курсов</ModalHeader>
          <ModalBody className="py-4">
            <CoursesFilters
              categories={categories}
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters(initialFilters)}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default VideoCourses;
