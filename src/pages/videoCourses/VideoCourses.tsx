import { useMemo, useState } from "react";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { FilePlay, Filter } from "lucide-react";
import { CourseCard, CoursesFilters } from "./_components";
import type { CourseFiltersState, CourseSortKey } from "./VideoCoursesTypes";
import { videoCoursesMock } from "./videoCourses.data";
import { cn } from "@/shared/utils/clx";
import { PageHeader } from "@/shared/ui/PageHeader/PageHeader";
import { useI18n } from "@/shared/i18n";

const initialFilters: CourseFiltersState = {
  categories: [],
  price: "all",
  rating: "all",
  language: "all",
};

function VideoCourses() {
  const { t } = useI18n();
  const [sortBy, setSortBy] = useState<CourseSortKey>("popularity");
  const [filters, setFilters] = useState<CourseFiltersState>(initialFilters);
  const [showFilters, setShowFilters] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const categories = useMemo(
    () => [...new Set(videoCoursesMock.flatMap((course) => course.categories))],
    [],
  );
  const sortOptions: { key: CourseSortKey; label: string }[] = [
    { key: "popularity", label: t("courses.sortPopularity") },
    { key: "rating", label: t("courses.sortRating") },
    { key: "dateAdded", label: t("courses.sortDateAdded") },
  ];

  const filteredCourses = useMemo(() => {
    const result = videoCoursesMock.filter((course) => {
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.some((category) =>
          course.categories.includes(category),
        );
      const matchesPrice =
        filters.price === "all" ||
        (filters.price === "free" ? course.is_free : !course.is_free);
      const matchesRating =
        filters.rating === "all" || course.rating_avg >= Number(filters.rating);
      const matchesLanguage =
        filters.language === "all" || course.language === filters.language;

      return (
        matchesCategory && matchesPrice && matchesRating && matchesLanguage
      );
    });

    return result.sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating_avg - a.rating_avg;
      }
      if (sortBy === "dateAdded") {
        return (
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
      }
      return b.popularity - a.popularity;
    });
  }, [filters, sortBy]);

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <PageHeader
            Icon={FilePlay}
            label={t("courses.label")}
            title={t("courses.title")}
            description={t("courses.description")}
          />
        </div>
      </section>

      <div className="theme-surface flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-4">
        <div className="flex w-full flex-col gap-2 sm:w-auto">
          <span className="theme-text-muted text-sm">
            {t("courses.sortBy")}
          </span>
          <Select
            color="secondary"
            aria-label="Sort courses"
            selectedKeys={[sortBy]}
            className="w-full min-w-55 sm:w-55"
            onSelectionChange={(keys) => {
              const nextKey = Array.from(keys)[0];
              if (typeof nextKey === "string") {
                setSortBy(nextKey as CourseSortKey);
              }
            }}
            classNames={{
              label: "theme-text-muted",
              value: "theme-text",
              popoverContent: "theme-surface",
              selectorIcon: "text-(--muted-foreground)",
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
          {showFilters ? t("courses.hideFilters") : t("courses.showFilters")}
        </Button>

        <Button
          variant="solid"
          color="primary"
          startContent={<Filter className="h-4 w-4" />}
          className="lg:hidden"
          onPress={() => setMobileFiltersOpen(true)}
        >
          {t("courses.showFilters")}
        </Button>
      </div>

      <div
        className={"flex flex-row gap-5"}
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
          <p className="theme-text-muted text-sm">
            {t("common.foundCourses", { count: filteredCourses.length })}
          </p>

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
        <ModalContent className="theme-surface">
          <ModalHeader className="theme-border border-b">
            {t("courses.filtersModal")}
          </ModalHeader>
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
