import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Clock3, Globe2, MessageSquare } from "lucide-react";
import { Rating } from "@/shared/ui/Rating/Rating";
import { CourseLessons, CourseReviews } from "./_components";
import { videoCoursesMock } from "../videoCourses/videoCourses.data";
import {
  getLocalizedCategoryLabel,
  getLocalizedCourseLanguageLabel,
  useI18n,
} from "@/shared/i18n";

function VideoCourseDetails() {
  const { t } = useI18n();
  const { slug } = useParams();
  const course = useMemo(() => videoCoursesMock.find((item) => item.slug === slug), [slug]);
  const [activeLessonId, setActiveLessonId] = useState(course?.lessons[0]?.id ?? 0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    if (course?.lessons[0]) {
      setActiveLessonId(course.lessons[0].id);
    }
  }, [course]);

  if (!course) {
    return <Navigate to="/video-courses" replace />;
  }

  return (
    <div className="space-y-8">
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link to="/video-courses">{t("nav.videos")}</Link>
        </BreadcrumbItem>
        <BreadcrumbItem isDisabled>{course.name}</BreadcrumbItem>
      </Breadcrumbs>

      <Card className="theme-surface overflow-hidden border max-sm:border-0 max-sm:bg-transparent! max-sm:shadow-none!">
        <div className="grid gap-0 xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className="relative min-h-70">
            <Image
              removeWrapper
              src={course.poster}
              alt={course.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-6 p-6 md:p-8 max-sm:px-0">
            <div className="flex flex-wrap gap-2">
              {course.categories.map((category) => (
                <Chip key={category} color="primary" variant="flat">
                  {getLocalizedCategoryLabel(category, t)}
                </Chip>
              ))}
              <Chip color={course.is_free ? "success" : "warning"} variant="solid">
                {course.is_free ? t("common.free") : `$${course.price}`}
              </Chip>
            </div>

            <div className="space-y-3">
              <h1 className="theme-text text-3xl font-bold md:text-5xl">{course.name}</h1>
              <p className="theme-text-muted max-w-4xl text-lg leading-8">{course.description}</p>
            </div>

            <div className="theme-text-muted flex flex-wrap items-center gap-5 text-sm">
              <div className="flex items-center gap-2">
                <Rating rating={course.rating_avg} />
                <span className="theme-text font-medium">{course.rating_avg.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{t("courses.reviews", { count: course.reviews_count })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe2 className="h-4 w-4" />
                <span>{getLocalizedCourseLanguageLabel(course.language, t)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock3 className="h-4 w-4" />
                <span>{t("courses.totalHours", { count: course.duration })}</span>
              </div>
            </div>

            <Divider className="theme-border" />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Card className="theme-surface-soft border p-4">
                <div className="flex justify-start items-center gap-3">
                  <div>
                    <p className="theme-text-muted text-sm">{t("common.lessons")}</p>
                    <p className="theme-text font-semibold">{course.lessons_count}</p>
                  </div>
                </div>
              </Card>
              <Card className="theme-surface-soft border p-4">
                <div className="flex justify-start items-center gap-3">
                  <div>
                    <p className="theme-text-muted text-sm">{t("common.author")}</p>
                    <p className="theme-text font-semibold">{course.author}</p>
                  </div>
                </div>
              </Card>
              <Card className="theme-surface-soft border p-4">
                <div className="flex justify-start items-center gap-3">
                  <div>
                    <p className="theme-text-muted text-sm">{t("common.added")}</p>
                    <p className="theme-text font-semibold">{course.dateAdded}</p>
                  </div>
                </div>
              </Card>
            </div>

            <Button
              color="primary"
              variant="shadow"
              className="w-full sm:w-fit"
              onPress={() => {
                const lessonsSection = document.getElementById("course-lessons");
                lessonsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              {t("courses.startWatching")}
            </Button>
          </div>
        </div>
      </Card>

      <section id="course-lessons" className="space-y-4">
        <div>
          <h2 className="theme-text text-2xl font-semibold">{t("courses.lessonsTitle")}</h2>
        </div>

        <CourseLessons
          lessons={course.lessons}
          activeLessonId={activeLessonId}
          onSelect={setActiveLessonId}
        />
      </section>

      <CourseReviews initialReviews={course.reviews} />
    </div>
  );
}

export default VideoCourseDetails;
