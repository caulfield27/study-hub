import { Link, useParams } from "react-router";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import {
  ChevronDown,
  CirclePlay,
  Clock3,
  Globe2,
  MessageSquare,
} from "lucide-react";
import { Rating } from "@/shared/ui/Rating/Rating";
import { CourseLessons, CourseReviews } from "./_components";
import { getLocalizedCourseLanguageLabel, useI18n } from "@/shared/i18n";
import { apiRoutes } from "@/shared/api/api.routes";
import { api } from "@/shared/api/api.handlers";
import type { ICourse } from "../videoCourses/VideoCoursesTypes";
import useSwr from "swr";
import CoursePageSkeleton from "@/shared/skeletons/courses/CoursePageSkeleton";
import { useEffect, useState } from "react";
import { getFile } from "@/shared/utils/getFile";
import { formatDate } from "@/shared/utils/formateDate";
import { cn } from "@/shared/utils/clx";

function VideoCourseDetails() {
  const { locale, t } = useI18n();
  const { slug } = useParams();
  const swrKey = {
    method: "get",
    url: apiRoutes.courses.getBySlug(slug ?? ""),
  };
  const {
    data: course,
    isLoading,
    mutate,
  } = useSwr<ICourse>([swrKey, "public"], api.sendRequest);

  const [activeLessonId, setActiveLessonId] = useState(
    course?.lessons[0]?.path ?? "",
  );
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (course?.lessons) {
      setActiveLessonId(course.lessons[0].path);
    }
  }, [course]);

  return isLoading || !course ? (
    <CoursePageSkeleton />
  ) : (
    <div className="space-y-8">
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link to="/video-courses">{t("nav.videos")}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem isDisabled>{course.name}</BreadcrumbItem>
      </Breadcrumbs>

      <Card className="theme-surface overflow-hidden border max-sm:border-0 max-sm:bg-transparent! max-sm:shadow-none!">
        <div className="grid gap-0 xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className="flex flex-col gap-5 p-2 max-sm:p-0 xl:sticky xl:top-4 self-start">
            <div className="overflow-hidden rounded-xl">
              <Image
                removeWrapper
                src={getFile(course.poster)}
                alt={course.name}
                className="aspect-video w-full object-cover"
              />
            </div>

            <Button
              color="primary"
              variant="shadow"
              className="w-full py-6.5 text-xl font-semibold flex items-center justify-center gap-2.5"
              onPress={() => {
                const lessonsSection =
                  document.getElementById("course-lessons");

                lessonsSection?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            >
              <CirclePlay />
              {t("courses.startWatching")}
            </Button>
          </div>

          <div className="space-y-6 p-6 md:p-8 max-sm:px-0">
            <div className="flex flex-wrap gap-2">
              {course.categories.map((category) => (
                <Chip key={category.id} color="primary" variant="flat">
                  {category.name}
                </Chip>
              ))}
              <Chip
                color={course.is_free ? "success" : "warning"}
                variant="solid"
                className="text-white"
              >
                {course.is_free ? t("common.free") : `$${course.price}`}
              </Chip>
            </div>

            <div className="space-y-3">
              <h1 className="theme-text text-3xl font-bold md:text-5xl">
                {course.name}
              </h1>

              <div className="relative">
                <p
                  className={cn(
                    "theme-text-muted text-lg leading-8 transition-all duration-300",
                    expanded ? "" : "line-clamp-5",
                  )}
                >
                  {course.description}
                </p>

                {!expanded && (
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-background to-transparent"
                  />
                )}
              </div>

              {course.description.length > 250 && (
                <button
                  onClick={() => setExpanded((prev) => !prev)}
                  className="cursor-pointer theme-text-muted hover:theme-text inline-flex items-center gap-2 text-sm font-medium transition-colors"
                >
                  {expanded ? "Скрыть" : "Показать всё"}

                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      expanded && "rotate-180",
                    )}
                  />
                </button>
              )}
            </div>

            <div className="theme-text-muted flex flex-wrap items-center gap-5 text-sm">
              <div className="flex items-center gap-2">
                <Rating rating={course.rating_avg} />
                <span className="theme-text font-medium">
                  {course.rating_avg}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>
                  {t("courses.reviews", { count: course.reviews_count })}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Globe2 className="h-4 w-4" />
                <span>
                  {getLocalizedCourseLanguageLabel(course.language, t)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock3 className="h-4 w-4" />
                <span>
                  {t("courses.totalHours", { count: course.duration })}
                </span>
              </div>
            </div>

            <Divider className="theme-border" />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Card className="theme-surface-soft border p-4 max-sm:border-0 max-sm:shadow-none">
                <div className="flex justify-start items-center gap-3">
                  <div>
                    <p className="theme-text-muted text-sm">
                      {t("common.lessons")}
                    </p>
                    <p className="theme-text font-semibold">
                      {course.lessons.length}
                    </p>
                  </div>
                </div>
              </Card>
              <Card className="theme-surface-soft border p-4 max-sm:border-0 max-sm:shadow-none">
                <div className="flex justify-start items-center gap-3">
                  <div>
                    <p className="theme-text-muted text-sm">
                      {t("common.author")}
                    </p>
                    <p className="theme-text font-semibold">{course.author}</p>
                  </div>
                </div>
              </Card>
              <Card className="theme-surface-soft border p-4 max-sm:border-0 max-sm:shadow-none">
                <div className="flex justify-start items-center gap-3">
                  <div>
                    <p className="theme-text-muted text-sm">
                      {t("common.added")}
                    </p>
                    <p className="theme-text font-semibold">
                      {formatDate(course.created_at, locale, t)}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Card>

      <section id="course-lessons" className="space-y-4">
        <div>
          <h2 className="theme-text text-2xl font-semibold">
            {t("courses.lessonsTitle")}
          </h2>
        </div>

        <CourseLessons
          lessons={course.lessons}
          activeLessonId={activeLessonId}
          onSelect={setActiveLessonId}
        />
      </section>

      <CourseReviews
        course_id={course.id}
        onSuccess={() => mutate()}
        reviews={course.reviews}
      />
    </div>
  );
}

export default VideoCourseDetails;
