import type { ICourseLesson } from "@/pages/videoCourses/VideoCoursesTypes";
import { cn } from "@/shared/utils/clx";
import { CheckIcon } from "lucide-react";

export const LessonItem = ({
  lesson,
  index,
  active,
  done,
  onSelect,
}: {
  lesson: ICourseLesson;
  index: number;
  active: boolean;
  done?: boolean;
  onSelect: () => void;
}) => (
  <button
    onClick={onSelect}
    disabled={active}
    className={cn(
      "cursor-pointer flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors",
      active
        ? "border-(--primary-color-dark) bg-(--primary-color)/10 pointer-events-none"
        : "border-transparent hover:bg-(--surface-soft)",
    )}
  >
    <div
      className={cn(
        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors",
        active
          ? "bg-(--primary-color) text-white"
          : done
            ? "bg-(--surface-soft) text-green-400"
            : "bg-(--surface-soft) text-(--muted-foreground)",
      )}
    >
      {done && !active ? <CheckIcon size={13} /> : index + 1}
    </div>

    <div className="min-w-0 flex-1">
      <p
        className={cn(
          "mb-0.5 text-[10px] uppercase tracking-wider text-(--muted-foreground)",
        )}
      >
        Урок {index + 1}
      </p>
      <p
        className={cn(
          "truncate text-[13px]",
          active ? "font-medium text-(--primary-color)" : "text-(--foreground)",
        )}
      >
        {lesson.name}
      </p>
    </div>

    {active ? (
      <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-(--primary-color)" />
    ) : (
      <span className="shrink-0 text-[11px] text-(--muted-foreground)">
        {lesson.duration}
      </span>
    )}
  </button>
);
