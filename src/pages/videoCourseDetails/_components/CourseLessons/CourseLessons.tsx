import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import type { ICourseLesson } from "../../../videoCourses/VideoCoursesTypes";
import { cn } from "@/shared/utils/clx";
import { useI18n } from "@/shared/i18n";
import { getVideo } from "@/shared/utils/getFile";

interface Props {
  lessons: ICourseLesson[];
  activeLessonId: string;
  onSelect: (lessonId: string) => void;
}

export const CourseLessons = ({ lessons, activeLessonId, onSelect }: Props) => {
  const { t } = useI18n();
  const activeLesson =
    lessons.find((lesson) => lesson.path === activeLessonId) ?? lessons[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_360px]">
      <Card className="theme-surface border p-4 max-sm:p-0 max-sm:bg-transparent! max-sm:border-0">
        <div className="overflow-hidden rounded-2xl border theme-border">
          <video
            title={activeLesson.name}
            src={getVideo(activeLesson.path)}
            className="aspect-video w-full bg-black"
            controls
          />
        </div>

        <div className="mt-4 space-y-2">
          <p className="theme-text-muted text-sm">{t("courses.nowPlaying")}</p>
          <h3 className="theme-text text-xl font-semibold">
            {activeLesson.name}
          </h3>
        </div>
      </Card>

      <Card className="theme-surface border p-4">
        <div className="mb-4">
          <h3 className="theme-text text-lg font-semibold">
            {t("courses.courseLessons")}
          </h3>
          <p className="theme-text-muted text-sm">
            {t("courses.chooseLesson")}
          </p>
        </div>

        <div className="space-y-3 h-112.5 overflow-y-auto custom-scrollbar">
          {lessons.map((lesson, index) => {
            const active = lesson.path === activeLessonId;

            return (
              <Button
                key={lesson.path}
                variant={active ? "solid" : "flat"}
                color={active ? "primary" : "default"}
                className={cn(
                  "h-auto w-full justify-start p-4 text-left",
                  active && "pointer-events-none",
                )}
                onPress={() => onSelect(lesson.path)}
              >
                <div className="theme-text flex w-full items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "theme-text-muted text-xs uppercase tracking-wide",
                        active && "text-white!",
                      )}
                    >
                      {t("courses.lesson", { index: index + 1 })}
                    </p>

                    <p
                      className={cn(
                        "truncate text-sm font-medium",
                        active && "text-white!",
                      )}
                    >
                      {lesson.name}
                    </p>
                  </div>

                  <span
                    className={cn(
                      "theme-text-muted shrink-0 text-xs",
                      active && "text-white!",
                    )}
                  >
                    {lesson.duration}
                  </span>
                </div>
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
