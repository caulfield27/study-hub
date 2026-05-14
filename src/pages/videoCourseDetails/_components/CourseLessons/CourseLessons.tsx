import { Card } from "@heroui/card";
import type { ICourseLesson } from "../../../videoCourses/VideoCoursesTypes";
import { useI18n } from "@/shared/i18n";
import { getVideo } from "@/shared/utils/getFile";
import { LessonItem, VideoControls } from "./components";
import { useCallback, useRef, useState } from "react";

interface Props {
  lessons: ICourseLesson[];
  activeLessonId: string;
  onSelect: (lessonId: string) => void;
}

export const CourseLessons = ({ lessons, activeLessonId, onSelect }: Props) => {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [showControls, setShowControls] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const activeLesson =
    lessons.find((lesson) => lesson.path === activeLessonId) ?? lessons[0];

  const handleFullscreen = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else player.requestFullscreen?.();
  }, [playerRef]);

  const onMouseMove = () => {
    setShowControls(true);

    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2000);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_360px]">
      <Card className="theme-surface border max-sm:bg-transparent! max-sm:border-0">
        <div
          ref={playerRef}
          onClick={() => setShowControls(true)}
          onMouseMove={onMouseMove}
          onMouseLeave={() => setShowControls(false)}
          className="overflow-hidden relative"
        >
          <video
            ref={videoRef}
            key={activeLesson.path}
            src={getVideo(activeLesson.path)}
            className="aspect-video w-full bg-black"
            preload="metadata"
            title={activeLesson.name}
          />
          <VideoControls
            showControls={showControls}
            onFullScreen={handleFullscreen}
            videoRef={videoRef}
          />
        </div>

        <div className="p-4 max-sm:p-3">
          <h3 className="text-xl font-semibold theme-text">
            {activeLesson.name}
          </h3>
        </div>
      </Card>

      <Card className="theme-surface flex flex-col border p-0 overflow-hidden">
        <div className="border-b px-4 py-4 theme-border">
          <h3 className="text-[15px] font-medium theme-text">
            {t("courses.courseLessons")}
          </h3>
          <p className="mt-0.5 text-xs text-[--muted-foreground]">
            {0} из {lessons.length} завершено
          </p>
        </div>

        <div
          className="custom-scrollbar flex flex-col gap-1 overflow-y-auto p-3"
          style={{ maxHeight: "450px" }}
        >
          {lessons.map((lesson, index) => (
            <LessonItem
              key={lesson.path}
              lesson={lesson}
              index={index}
              active={lesson.path === activeLessonId}
              done={false}
              onSelect={() => onSelect(lesson.path)}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};
