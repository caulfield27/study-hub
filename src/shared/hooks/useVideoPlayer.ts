import { useState, useEffect, type RefObject } from "react";
import { useGlobalStore } from "../store";

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];
// export const QUALITIES = ["4K", "1080p", "720p", "480p", "360p"];
// export const QUALITY_BADGES: Record<string, string> = {
//   "4K": "UHD",
//   "1080p": "HD",
// };

export const useVideoPlayer = (
  videoRef: RefObject<HTMLVideoElement | null>,
  activeLessonPath: string,
) => {
  const isAuthed = useGlobalStore((state) => state.isAuthed);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [muted, setMuted] = useState(false);
  // const [quality, setQuality] = useState("1080p");
  const [speedIdx, setSpeedIdx] = useState(2);

  const speed = SPEEDS[speedIdx];

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !isAuthed) return;

    const onTime = () => {
      setCurrentTime(v.currentTime);
      setProgress(v.duration ? v.currentTime / v.duration : 0);
    };
    const onMeta = () => setDuration(v.duration);
    const onEnded = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        togglePlay();
        return;
      }

      if (e.key === "ArrowLeft") {
        skip(-10);
        return;
      }

      if (e.key === "ArrowRight") {
        skip(10);
      }
    };

    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("ended", onEnded);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("ended", onEnded);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isAuthed, activeLessonPath]);

  const reset = () => {
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setVolume(0.8);
    setMuted(false);
    // setQuality("1080p");
    setSpeedIdx(2);

    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.pause();
    v.volume = 0.8;
    v.muted = false;
    v.playbackRate = 1;
  };

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.paused ? v.play() : v.pause();
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime =
      Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)) * duration;
    v.play();
  };

  const skip = (seconds: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(duration, v.currentTime + seconds));
    v.play();
  };

  const setVolume = (val: number) => {
    const v = videoRef.current;
    if (!v) return;
    v.volume = val;
    setVolumeState(val);
    if (val === 0) setMuted(true);
    else {
      setMuted(false);
      v.muted = false;
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  const cycleSpeed = () => {
    const next = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(next);
    if (videoRef.current) videoRef.current.playbackRate = SPEEDS[next];
  };

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return {
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
  };
};
