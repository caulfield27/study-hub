import { Link } from "react-router";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Clock3, Globe2, MessageSquare, PlayCircle, User } from "lucide-react";
import { Rating } from "@/shared/ui/Rating/Rating";
import type { ICourse } from "../../VideoCoursesTypes";
import {
  getLocalizedCategoryLabel,
  getLocalizedCourseLanguageLabel,
  useI18n,
} from "@/shared/i18n";

interface Props {
  course: ICourse;
}

export const CourseCard = ({ course }: Props) => {
  const { t } = useI18n();
  return (
    <Card className="theme-surface h-full overflow-hidden border">
      <div className="flex h-full flex-col">
        <div className="relative overflow-hidden">
          <Image
            removeWrapper
            src={course.poster}
            alt={course.name}
            className="h-full w-full object-cover rounded-none"
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2 z-10">
            <Chip color={course.is_free ? "success" : "warning"} variant="solid">
              {course.is_free ? t("common.free") : `$${course.price}`}
            </Chip>
            <Chip variant="flat" className="border theme-border bg-black/35 text-white backdrop-blur-sm">
              {t("common.lessonsCount", { count: course.lessons_count })}
            </Chip>
          </div>
        </div>

        <div className="flex h-full flex-col p-5 max-sm:p-4">
          <div className="flex flex-wrap gap-2">
            {course.categories.map((category) => (
              <Chip key={category} variant="flat" color="primary">
                {getLocalizedCategoryLabel(category, t)}
              </Chip>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            <Link to={`/video-courses/${course.slug}`} className="inline-block">
              <h2 className="theme-text text-2xl font-semibold transition-colors hover:text-(--primary-color)">
                {course.name}
              </h2>
            </Link>
            <p className="theme-text-muted line-clamp-2 text-sm leading-6">
              {course.shortDescription}
            </p>
          </div>

          <div className="theme-text-muted mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
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

          <Divider className="theme-border my-5" />

          <p className="theme-text-muted line-clamp-3 min-h-18 text-sm leading-6">
            {course.description}
          </p>

          <div className="mt-auto flex flex-col gap-4 pt-5">
            <div className="theme-text-muted flex items-start gap-2 text-sm">
              <User className="mt-0.5 h-4 w-4 shrink-0" />
              <div className="min-w-0">
                <p className="theme-text truncate font-medium">{course.author}</p>
                <p className="theme-text-muted line-clamp-1">{course.authorRole}</p>
              </div>
            </div>

            <Button
              as={Link}
              to={`/video-courses/${course.slug}`}
              color="primary"
              variant="shadow"
              startContent={<PlayCircle className="h-4 w-4" />}
              className="w-full"
            >
              {t("courses.openCourse")}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
