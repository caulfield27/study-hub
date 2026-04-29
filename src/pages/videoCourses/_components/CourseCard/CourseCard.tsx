import { Link } from "react-router";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { Clock3, Globe2, MessageSquare, PlayCircle, User } from "lucide-react";
import { Rating } from "@/shared/ui/Rating/Rating";
import type { ICourse } from "../../VideoCoursesTypes";

interface Props {
  course: ICourse;
}

const languageLabel: Record<ICourse["language"], string> = {
  en: "English",
  ru: "Русский",
  kz: "Қазақша",
};

export const CourseCard = ({ course }: Props) => {
  return (
    <Card className="h-full overflow-hidden border border-neutral-800 bg-neutral-900/80">
      <div className="flex h-full flex-col">
        <div className="relative aspect-video overflow-hidden">
          <Image
            removeWrapper
            src={course.poster}
            alt={course.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <Chip color={course.is_free ? "success" : "warning"} variant="solid">
              {course.is_free ? "Free" : `$${course.price}`}
            </Chip>
            <Chip variant="flat" className="border border-white/10 bg-black/35 text-white">
              {course.lessons_count} lessons
            </Chip>
          </div>
        </div>

        <div className="flex h-full flex-col p-5">
          <div className="flex flex-wrap gap-2">
            {course.categories.map((category) => (
              <Chip key={category} variant="flat" color="primary">
                {category}
              </Chip>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            <Link to={`/video-courses/${course.slug}`} className="inline-block">
              <h2 className="text-2xl font-semibold text-white transition-colors hover:text-(--primary-color)">
                {course.name}
              </h2>
            </Link>
            <p className="line-clamp-2 text-sm leading-6 text-neutral-300">
              {course.shortDescription}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-neutral-300 sm:grid-cols-2">
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
              <span>{course.duration}h</span>
            </div>
          </div>

          <Divider className="my-5 bg-neutral-800" />

          <p className="line-clamp-3 min-h-[72px] text-sm leading-6 text-neutral-400">
            {course.description}
          </p>

          <div className="mt-auto flex flex-col gap-4 pt-5">
            <div className="flex items-start gap-2 text-sm text-neutral-300">
              <User className="mt-0.5 h-4 w-4 shrink-0" />
              <div className="min-w-0">
                <p className="truncate font-medium text-white">{course.author}</p>
                <p className="line-clamp-1 text-neutral-500">{course.authorRole}</p>
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
              Open course
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
