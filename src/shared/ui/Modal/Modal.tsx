import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

interface Props {
  onClose: () => void;
  children: ReactNode;
  classes?: string;
}

export function Modal({ children, onClose, classes }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    if (containerRef.current) {
      const handleClickOutside = (event: MouseEvent) => {
        if (!containerRef.current?.contains(event.target as Node)) {
          onClose();
        }
      };

      const timeout = setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 0);

      return () => {
        clearTimeout(timeout);
        document.removeEventListener("click", handleClickOutside);
        document.body.style.overflow = "";
      };
    }
  }, []);

  return createPortal(
    <div className={styles.modal_container}>
      <div ref={containerRef} className={`${styles.modal_content} ${classes ?? ""}`}>{children}</div>
    </div>,
    document.body
  );
}
