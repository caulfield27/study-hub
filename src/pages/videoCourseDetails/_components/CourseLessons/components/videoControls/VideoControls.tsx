import {
  QUALITIES,
  QUALITY_BADGES,
  useVideoPlayer,
} from "@/shared/hooks/useVideoPlayer";
import { cn } from "@/shared/utils/clx";
import {
  MaximizeIcon,
  PauseIcon,
  PlayIcon,
  SettingsIcon,
  SkipBackIcon,
  SkipForwardIcon,
  VolumeIcon,
  VolumeOffIcon,
} from "lucide-react";
import { useCallback, useState } from "react";

export const VideoControls = ({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) => {
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
    quality,
    setQuality,
    speed,
    cycleSpeed,
    fmt,
  } = useVideoPlayer(videoRef);
  const [qualityOpen, setQualityOpen] = useState(false);

  const handleFullscreen = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else v.requestFullscreen?.();
  }, [videoRef]);

  const volIconSize = 18;

  return (
    <div className="flex flex-col gap-2 bg-(--surface-strong) px-3.5 py-2.5">
      {/* Progress bar */}
      <div className="flex items-center gap-2.5">
        <span className="min-w-9 text-right text-xs tabular-nums text-(--muted-foreground)">
          {fmt(currentTime)}
        </span>

        <div
          className="group relative flex h-1 flex-1 cursor-pointer items-center rounded-full bg-(--video-slider-bg)"
          onClick={seek}
          role="slider"
          aria-label="Прогресс видео"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full rounded-full bg-(--primary-color) transition-none"
            style={{ width: `${progress * 100}%` }}
          />
          <div
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white bg-(--primary-color) opacity-0 transition-opacity group-hover:opacity-100"
            style={{ left: `calc(${progress * 100}% - 6px)` }}
          />
        </div>

        <span className="min-w-9 text-xs tabular-nums text-(--muted-foreground)">
          {fmt(duration)}
        </span>
      </div>

      {/* Buttons row */}
      <div className="flex items-center gap-0.5">
        {/* Play/Pause */}
        {/* <button
          onClick={togglePlay}
          className="ctrl-btn rounded-lg p-1.5 text-(--muted-foreground) transition-colors hover:bg-white/8 hover:text-(--foreground)"
          aria-label={playing ? "Пауза" : "Воспроизвести"}
        >
          {playing ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
        </button> */}

        {/* Skip back */}
        {/* <button
          onClick={() => setVolume(-10)}
          className="rounded-lg p-1.5 text-(--muted-foreground) transition-colors hover:bg-white/8 hover:text-(--foreground)"
          aria-label="Назад 10 секунд"
        >
          <SkipBackIcon size={18} />
        </button> */}

        {/* Skip forward */}
        {/* <button
          onClick={() => skip(10)}
          className="rounded-lg p-1.5 text-(--muted-foreground) transition-colors hover:bg-white/8 hover:text-(--foreground)"
          aria-label="Вперёд 10 секунд"
        >
          <SkipForwardIcon size={18} />
        </button> */}

        {/* Volume */}
        <div className="ml-1 flex items-center gap-1.5">
          <button
            onClick={toggleMute}
            className="rounded-lg p-1.5 text-(--muted-foreground) transition-colors hover:bg-white/8 hover:text-(--foreground)"
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
            className="h-1 w-16 cursor-pointer appearance-none rounded-full bg-(--video-slider-bg) accent-(--primary-color)"
            aria-label="Громкость"
          />
        </div>

        <div className="flex-1" />

        {/* Speed */}
        <button
          onClick={cycleSpeed}
          className="cursor-pointer rounded-md px-2 py-1 text-[11px] font-medium text-(--muted-foreground) transition-colors hover:bg-white/8 hover:text-(--foreground)"
          aria-label={`Скорость воспроизведения ${speed}x`}
        >
          {speed}×
        </button>

        {/* Quality */}
        <div className="relative">
          <button
            onClick={() => setQualityOpen((v) => !v)}
            className="cursor-pointer flex items-center gap-1 rounded-md border border-white/10 bg-white/8 px-2 py-1 text-[11px] font-medium text-(--foreground) transition-colors hover:bg-white/14"
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
              <div className="absolute bottom-[calc(100%+6px)] right-0 z-20 min-w-24 overflow-hidden rounded-xl border border-white/10 bg-(--surface-soft)">
                {QUALITIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setQuality(q);
                      setQualityOpen(false);
                    }}
                    className={cn(
                      "flex cursor-pointer w-full items-center justify-between gap-2 px-3 py-1.5 text-[13px] transition-colors hover:bg-(--surface-strong)",
                      q === quality
                        ? "text-(--primary-color)"
                        : "text-(--muted-foreground)",
                    )}
                  >
                    {q}
                    {QUALITY_BADGES[q] && (
                      <span className="rounded px-1 py-px text-[10px] bg-orange-500/15 text-(--primary-color)">
                        {QUALITY_BADGES[q]}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Fullscreen */}
        <button
          onClick={handleFullscreen}
          className="cursor-pointer rounded-lg p-1.5 text-(--muted-foreground) transition-colors hover:bg-white/8 hover:text-(--foreground)"
          aria-label="Полный экран"
        >
          <MaximizeIcon size={18} />
        </button>
      </div>
    </div>
  );
};
