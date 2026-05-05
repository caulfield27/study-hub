import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import type { ICourseLesson } from "../../../videoCourses/VideoCoursesTypes";
import { cn } from "@/shared/utils/clx";
import { useI18n } from "@/shared/i18n";

interface Props {
  lessons: ICourseLesson[];
  activeLessonId: number;
  onSelect: (lessonId: number) => void;
}

export const CourseLessons = ({ lessons, activeLessonId, onSelect }: Props) => {
  const { t } = useI18n();
  const activeLesson = lessons.find((lesson) => lesson.id === activeLessonId) ?? lessons[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_360px]">
      <Card className="theme-surface border p-4 max-sm:p-0 max-sm:bg-transparent! max-sm:border-0">
        <div className="overflow-hidden rounded-2xl border theme-border">
          <iframe
            title={activeLesson.title}
            src={activeLesson.preview}
            className="aspect-video w-full bg-black"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="mt-4 space-y-2">
          <p className="theme-text-muted text-sm">{t("courses.nowPlaying")}</p>
          <h3 className="theme-text text-xl font-semibold">{activeLesson.title}</h3>
          <p className="theme-text-muted">{activeLesson.description}</p>
        </div>
      </Card>

      <Card className="theme-surface border p-4">
        <div className="mb-4">
          <h3 className="theme-text text-lg font-semibold">{t("courses.courseLessons")}</h3>
          <p className="theme-text-muted text-sm">{t("courses.chooseLesson")}</p>
        </div>

        <div className="space-y-3">
          {lessons.map((lesson, index) => {
            const active = lesson.id === activeLessonId;

            return (
              <Button
                key={lesson.id}
                variant={active ? "solid" : "flat"}
                color={active ? "primary" : "default"}
                className={cn("h-auto w-full justify-start p-4 text-left", active && 'pointer-events-none')}
                onPress={() => onSelect(lesson.id)}
              >
                <div className="theme-text flex w-full items-start justify-between gap-4">
                  <div>
                    <p className={cn("theme-text-muted text-xs uppercase tracking-wide", active && 'text-white!')}>
                      {t("courses.lesson", { index: index + 1 })}
                    </p>
                    <p className={cn("text-sm font-medium", active && 'text-white!')}>{lesson.title}</p>
                  </div>
                  <span className={cn("theme-text-muted text-xs", active && 'text-white!')}>{lesson.duration}</span>
                </div>
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
