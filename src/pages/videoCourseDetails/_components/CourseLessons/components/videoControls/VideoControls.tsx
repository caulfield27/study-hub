import {
  // QUALITIES,
  // QUALITY_BADGES,
  useVideoPlayer,
} from "@/shared/hooks/useVideoPlayer";
import { useGlobalStore } from "@/shared/store";
import { cn } from "@/shared/utils/clx";
import {
  MaximizeIcon,
  Pause,
  Play,
  // SettingsIcon,
  SkipBackIcon,
  SkipForwardIcon,
  VolumeIcon,
  VolumeOffIcon,
} from "lucide-react";
// import { useEffect, useState } from "react";
import { useEffect } from "react";

interface Props {
  onFullScreen: () => void;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  showControls: boolean;
  activeLessonPath: string;
  videoProgress: number;
}

export const VideoControls = ({
  videoRef,
  onFullScreen,
  showControls,
  activeLessonPath,
  videoProgress,
}: Props) => {
  const {
    playing,
    togglePlay,
    progress,
    currentTime,
    duration,
    seek,
    skip,
    volume,
    setVolume,
    muted,
    toggleMute,
    // quality,
    // setQuality,
    speed,
    cycleSpeed,
    fmt,
    reset,
  } = useVideoPlayer(videoRef, activeLessonPath);
  // const [qualityOpen, setQualityOpen] = useState(false);
  const isAuthed = useGlobalStore((state) => state.isAuthed);
  const volIconSize = 18;

  useEffect(() => {
    reset();
  }, [activeLessonPath]);

  return (
    <>
      <div
        className={cn(
          "opacity-0 duration-500 ease-in-out transition-opacity flex absolute left-0 bottom-0 w-full flex-col bg-neutral-800/70 gap-2 px-3.5 py-2.5",
          showControls && "opacity-100",
        )}
      >
        {/* Progress bar */}
        <div className="flex items-center gap-2.5">
          <span className="min-w-9 text-right text-xs tabular-nums text-neutral-300">
            {fmt(currentTime)}
          </span>

          <div
            className={cn(
              "group relative flex h-1 flex-1 cursor-pointer items-center rounded-full bg-neutral-600",
              !isAuthed && "disabled",
            )}
            onClick={seek}
            role="slider"
            aria-label="Прогресс видео"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-neutral-400 transition-none"
              style={{ width: `${videoProgress}%` }}
            />
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-(--primary-color) transition-none"
              style={{ width: `${progress * 100}%` }}
            />
            <div
              className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white bg-(--primary-color) opacity-0 transition-opacity group-hover:opacity-100"
              style={{ left: `calc(${progress * 100}% - 6px)` }}
            />
          </div>

          <span className="min-w-9 text-xs tabular-nums text-neutral-300">
            {fmt(duration)}
          </span>
        </div>

        {/* Buttons row */}
        <div className="flex items-center gap-0.5">
          {/* Volume */}
          <div className="ml-1 flex items-center gap-1.5">
            <button
              onClick={toggleMute}
              className={cn(
                "rounded-lg p-1.5 text-neutral-300 transition-colors hover:bg-white/8 hover:text-white",
                !isAuthed && "disabled",
              )}
              aria-label={muted ? "Включить звук" : "Выключить звук"}
            >
              {muted || volume === 0 ? (
                <VolumeOffIcon size={volIconSize} />
              ) : (
                <VolumeIcon size={volIconSize} />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className={cn(
                "h-1 w-16 cursor-pointer appearance-none rounded-full bg-neutral-600 accent-(--primary-color)",
                !isAuthed && "disabled",
              )}
              aria-label="Громкость"
            />
          </div>

          <div className="flex-1" />

          {/* Speed */}
          <button
            onClick={cycleSpeed}
            className={cn(
              "cursor-pointer rounded-md px-2 py-1 text-[11px] font-medium text-neutral-300 transition-colors hover:bg-white/8 hover:text-white",
              !isAuthed && "disabled",
            )}
            aria-label={`Скорость воспроизведения ${speed}x`}
          >
            {speed}×
          </button>

          {/* Quality */}
          {/* <div className="relative">
            <button
              onClick={() => setQualityOpen((v) => !v)}
              className={cn(
                "cursor-pointer flex items-center gap-1 rounded-md border border-white/10 bg-white/8 px-2 py-1 text-[11px] font-medium text-white transition-colors hover:bg-white/14",
                !isAuthed && "disabled",
              )}
              aria-label="Выбор качества"
              aria-expanded={qualityOpen}
            >
              <SettingsIcon size={12} aria-hidden />
              {quality}
            </button>

            {qualityOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setQualityOpen(false)}
                />
                <div className="absolute bottom-[calc(100%+6px)] right-0 z-20 min-w-24 overflow-hidden rounded-xl border border-white/10 bg-[#262626]">
                  {QUALITIES.map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setQuality(q);
                        setQualityOpen(false);
                      }}
                      className={cn(
                        "flex cursor-pointer w-full items-center justify-between gap-2 px-3 py-1.5 text-[13px] transition-colors hover:bg-[#111111]",
                        q === quality
                          ? "text-(--primary-color)"
                          : "text-neutral-300",
                      )}
                    >
                      {q}
                      {QUALITY_BADGES[q] && (
                        <span className="rounded px-1 py-px text-[10px] bg-(--primary-color-dark)/15 text-(--primary-color)">
                          {QUALITY_BADGES[q]}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div> */}

          {/* Fullscreen */}
          <button
            onClick={onFullScreen}
            className={cn(
              "cursor-pointer rounded-lg p-1.5 text-neutral-300 transition-colors hover:bg-white/8 hover:text-white",
              !isAuthed && "disabled",
            )}
            aria-label="Полный экран"
          >
            <MaximizeIcon size={18} />
          </button>
        </div>
      </div>
      <div
        className={cn(
          "opacity-100 transition-opacity duration-500 ease-in-out absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row justify-center items-center gap-5",
          !showControls && playing && "opacity-0",
        )}
      >
        <button
          onClick={() => skip(-10)}
          className={cn(
            "cursor-pointer flex flex-row justify-center items-center gap-1 rounded-lg bg-neutral-900/50 p-1.5 text-neutral-300",
            !isAuthed && "disabled",
          )}
          aria-label="Назад 10 секунд"
        >
          <span className="sm:mb-1">-10</span>
          <SkipBackIcon size={18} />
        </button>
        <button
          onClick={togglePlay}
          className={cn(
            "cursor-pointer text-white bg-(--primary-color) w-15 h-15 rounded-full flex justify-center items-center",
            !isAuthed && "disabled",
          )}
          aria-label={playing ? "Пауза" : "Воспроизвести"}
        >
          {playing ? <Pause /> : <Play />}
        </button>
        <button
          onClick={() => skip(10)}
          className={cn(
            "cursor-pointer flex flex-row justify-center items-center gap-1 rounded-lg bg-neutral-900/50 p-1.5 text-neutral-300",
            !isAuthed && "disabled",
          )}
          aria-label="Вперёд 10 секунд"
        >
          <SkipForwardIcon size={18} />
          <span className="sm:mb-1">+10</span>
        </button>
      </div>
    </>
  );
};
