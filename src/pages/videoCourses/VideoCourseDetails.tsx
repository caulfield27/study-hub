import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import {
  Clock3,
  Globe2,
  MessageSquare,
  PlayCircle,
  Star,
  UserRound,
} from "lucide-react";
import { Rating } from "@/shared/ui/Rating/Rating";
import { CourseLessons, CourseReviews } from "./_components";
import { videoCoursesMock } from "./videoCourses.data";

const languageLabel = {
  en: "English",
  ru: "Русский",
  kz: "Қазақша",
};

function VideoCourseDetails() {
  const { slug } = useParams();
  const course = useMemo(
    () => videoCoursesMock.find((item) => item.slug === slug),
    [slug]
  );
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
      <Breadcrumbs color="secondary">
        <BreadcrumbItem>
          <Link to="/video-courses">Video courses</Link>
        </BreadcrumbItem>
        <BreadcrumbItem isDisabled>{course.name}</BreadcrumbItem>
      </Breadcrumbs>

      <Card className="overflow-hidden border border-neutral-800 bg-neutral-900/80">
        <div className="grid gap-0 xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className="relative min-h-[280px]">
            <Image
              removeWrapper
              src={course.poster}
              alt={course.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-950/10 to-transparent" />
          </div>

          <div className="space-y-6 p-6 md:p-8">
            <div className="flex flex-wrap gap-2">
              {course.categories.map((category) => (
                <Chip key={category} color="primary" variant="flat">
                  {category}
                </Chip>
              ))}
              <Chip color={course.is_free ? "success" : "warning"} variant="solid">
                {course.is_free ? "Free" : `$${course.price}`}
              </Chip>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-white md:text-5xl">{course.name}</h1>
              <p className="max-w-4xl text-lg leading-8 text-neutral-300">
                {course.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-sm text-neutral-300">
              <div className="flex items-center gap-2">
                <Rating rating={course.rating_avg} />
                <span className="font-medium text-white">{course.rating_avg.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>{course.reviews_count} reviews</span>
              </div>
              <div className="flex items-center gap-1">
                <Globe2 className="h-4 w-4" />
                <span>{languageLabel[course.language]}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock3 className="h-4 w-4" />
                <span>{course.duration}h total</span>
              </div>
            </div>

            <Divider className="bg-neutral-800" />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <Card className="border border-neutral-800 bg-neutral-950/50 p-4">
                <div className="flex items-center gap-3">
                  <PlayCircle className="h-5 w-5 text-(--primary-color)" />
                  <div>
                    <p className="text-sm text-neutral-400">Lessons</p>
                    <p className="font-semibold text-white">{course.lessons_count}</p>
                  </div>
                </div>
              </Card>
              <Card className="border border-neutral-800 bg-neutral-950/50 p-4">
                <div className="flex items-center gap-3">
                  <UserRound className="h-5 w-5 text-(--primary-color)" />
                  <div>
                    <p className="text-sm text-neutral-400">Author</p>
                    <p className="font-semibold text-white">{course.author}</p>
                  </div>
                </div>
              </Card>
              <Card className="border border-neutral-800 bg-neutral-950/50 p-4">
                <div className="flex items-center gap-3">
                  <Star className="h-5 w-5 text-(--primary-color)" />
                  <div>
                    <p className="text-sm text-neutral-400">Track</p>
                    <p className="font-semibold text-white">{course.authorRole}</p>
                  </div>
                </div>
              </Card>
              <Card className="border border-neutral-800 bg-neutral-950/50 p-4">
                <div>
                  <p className="text-sm text-neutral-400">Added</p>
                  <p className="font-semibold text-white">{course.dateAdded}</p>
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
              Start watching
            </Button>
          </div>
        </div>
      </Card>

      <section id="course-lessons" className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold text-white">Lessons and player</h2>
          <p className="text-neutral-400">
            Смотрите уроки прямо на странице и переключайтесь между темами курса.
          </p>
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
