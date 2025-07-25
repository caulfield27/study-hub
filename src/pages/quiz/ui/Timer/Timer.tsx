import { useEffect, useRef, useState } from "react";
import styles from "./Timer.module.css";

interface Props {
  mintes: number;
  seconds: number;
  onTimeOver: ()=> void;
}

export function Timer({ mintes, seconds, onTimeOver }: Props) {
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
      };
      toggleUpdate(prev=> !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.timer_wrap} ${sec.current < 31 && min.current === 0 ? styles.warning : ""}`}>
      <span>0{min.current}</span> :{" "}
      <span>{sec.current < 10 ? `0${sec.current}` : sec.current}</span>
    </div>
  );
}
