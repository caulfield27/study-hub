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
  getLocalizedCourseLanguageLabel,
  useI18n,
} from "@/shared/i18n";
import { getFile } from "@/shared/utils/getFile";
import { cn } from "@/shared/utils/clx";

interface Props {
  course: ICourse;
  isRow?: boolean
}

export const CourseCard = ({ course, isRow }: Props) => {
  const { t } = useI18n();
  return (
    <Card className={cn("theme-surface overflow-hidden border", isRow && 'max-w-125 shrink-0 shadow-none!')}>
      <div className="flex flex-col">
        <div className="relative h-75 overflow-hidden">
          <Image
            removeWrapper
            src={getFile(course.poster)}
            alt={course.name}
            className="h-full w-full object-cover rounded-none"
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2 z-10">
            <Chip className="text-white" color={course.is_free ? "success" : "warning"} variant="solid">
              {course.is_free ? t("common.free") : `$${course.price}`}
            </Chip>
          </div>
        </div>

        <div className="flex flex-col p-5 max-sm:p-4">
          <div className="flex flex-wrap gap-2">
            {course.categories.map((category) => (
              <Chip key={category.id} variant="flat" color="primary">
                {category.name}
              </Chip>
            ))}
          </div>

          <div className="mt-4 space-y-3 h-20">
            <Link to={`/video-courses/${course.slug}`} className="inline-block">
              <h2 className="theme-text line-clamp-2 text-2xl font-semibold transition-colors hover:text-(--primary-color)">
                {course.name}
              </h2>
            </Link>
          </div>

          <div className="theme-text-muted mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Rating rating={course.rating_avg} />
              <span className="theme-text font-medium">{course.rating_avg}</span>
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
