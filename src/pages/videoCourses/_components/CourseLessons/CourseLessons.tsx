import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import type { ICourseLesson } from "../../VideoCoursesTypes";

interface Props {
  lessons: ICourseLesson[];
  activeLessonId: number;
  onSelect: (lessonId: number) => void;
}

export const CourseLessons = ({ lessons, activeLessonId, onSelect }: Props) => {
  const activeLesson = lessons.find((lesson) => lesson.id === activeLessonId) ?? lessons[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_360px]">
      <Card className="border border-neutral-800 bg-neutral-900/80 p-4">
        <div className="overflow-hidden rounded-2xl border border-neutral-800">
          <iframe
            title={activeLesson.title}
            src={activeLesson.preview}
            className="aspect-video w-full bg-black"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-sm text-neutral-400">Now playing</p>
          <h3 className="text-xl font-semibold text-white">{activeLesson.title}</h3>
          <p className="text-neutral-300">{activeLesson.description}</p>
        </div>
      </Card>

      <Card className="border border-neutral-800 bg-neutral-900/80 p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">Уроки курса</h3>
          <p className="text-sm text-neutral-400">Выберите урок для просмотра</p>
        </div>

        <div className="space-y-3">
          {lessons.map((lesson, index) => {
            const active = lesson.id === activeLessonId;

            return (
              <Button
                key={lesson.id}
                variant={active ? "solid" : "flat"}
                color={active ? "primary" : "default"}
                className="h-auto w-full justify-start p-4 text-left"
                onPress={() => onSelect(lesson.id)}
              >
                <div className="flex w-full items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wide opacity-70">
                      Lesson {index + 1}
                    </p>
                    <p className="text-sm font-medium">{lesson.title}</p>
                  </div>
                  <span className="text-xs opacity-70">{lesson.duration}</span>
                </div>
              </Button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
