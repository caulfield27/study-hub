import { useState } from "react";
import { Button } from "@heroui/button";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { Select, SelectItem } from "@heroui/select";
import { FilePlay, Filter } from "lucide-react";
import { CourseCard, CoursesFilters } from "./_components";
import type {
  CourseCategory,
  CourseSortKey,
  ICoursesResponse,
} from "./VideoCoursesTypes";
import { cn } from "@/shared/utils/clx";
import { PageHeader } from "@/shared/ui/PageHeader/PageHeader";
import { useI18n } from "@/shared/i18n";
import { CoursesPageSkeleton } from "@/shared/skeletons/courses/CoursesSkeleton";
import useSWR from "swr";
import { apiRoutes } from "@/shared/api/api.routes";
import { api } from "@/shared/api/api.handlers";
import { getApiQuery, useFilters } from "./VideoCoursesStore";

function VideoCourses() {
  const { t } = useI18n();
  const { filters, updateFilters, mobileFiltersOpen, setMobileFiltersOpen } = useFilters();
  const [showFilters, setShowFilters] = useState(true);
  const query = getApiQuery(filters);

  // api
  const coursesSwrKey = {
    method: "get",
    url: apiRoutes.courses.get(query),
  };
  const categoriesSwrKey = {
    method: "get",
    url: apiRoutes.courses.getCategories,
  };
  const { data: courses, isLoading: coursesPending } = useSWR<ICoursesResponse>(
    [coursesSwrKey, "public"],
    api.sendRequest,
  );
  const { data: categories, isLoading: categoriesPending } = useSWR<
    CourseCategory[]
  >([categoriesSwrKey, "public"], api.sendRequest);

  const sortOptions: { key: CourseSortKey; label: string }[] = [
    { key: "popularity", label: t("courses.sortPopularity") },
    { key: "rating", label: t("courses.sortRating") },
    { key: "created_at", label: t("courses.sortDateAdded") },
  ];


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
            selectedKeys={[filters.sort]}
            className="w-full min-w-55 sm:w-55"
            onSelectionChange={(keys) => {
              const nextKey = Array.from(keys)[0];
              if (typeof nextKey === "string") {
                updateFilters("sort", nextKey);
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
      {coursesPending || !courses?.data ? (
        <CoursesPageSkeleton />
      ) : (
        <>
          <div className={"flex flex-row gap-5"}>
            {showFilters && (
              <div className="hidden lg:block">
                <CoursesFilters
                  categories={categories}
                  isCategoriesPending={categoriesPending}
                />
              </div>
            )}

            <section className="space-y-4">
              <p className="theme-text-muted text-sm">
                {t("common.foundCourses", { count: courses.data.length })}
              </p>

              <div
                className={cn(
                  "grid grid-cols-1 items-stretch gap-5",
                  showFilters
                    ? "xl:grid-cols-2"
                    : "lg:grid-cols-2 xl:grid-cols-3",
                )}
              >
                {courses.data.map((course) => (
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
                  isCategoriesPending={categoriesPending}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
}

export default VideoCourses;
