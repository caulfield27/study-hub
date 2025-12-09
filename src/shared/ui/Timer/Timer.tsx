import { useEffect, useRef, useState } from "react";
import type { Props } from "./Timer.types";


export function Timer({ mintes, seconds, onTimeOver, startTimerTrigger }: Props) {
  const [_, toggleUpdate] = useState(false);
  const min = useRef(mintes);
  const sec = useRef(seconds);

  useEffect(() => {
    const interval = setInterval(() => {
      sec.current = sec.current > 0 ? sec.current - 1 : sec.current;
      if (sec.current === 0 && min.current > 0) {
        min.current = min.current - 1;
        sec.current = 59;
      }

      if (sec.current === 0 && min.current === 0) {
        clearInterval(interval);
        min.current = mintes;
        sec.current = seconds;
        onTimeOver();
      }
      toggleUpdate((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTimerTrigger]);

  return (
    <div
      className={`
      flex justify-center items-center w-[62px] h-[62px]
      border rounded-full
      ${
        sec.current < 31 && min.current === 0
          ? "text-red-500 border-red-500"
          : "border-white"
      }
    `}
    >
      <span className="tracking-[2px] font-semibold">0{min.current}</span>
      <span className="mx-1">:</span>
      <span className="tracking-[2px] font-semibold">
        {sec.current < 10 ? `0${sec.current}` : sec.current}
      </span>
    </div>
  );
}
