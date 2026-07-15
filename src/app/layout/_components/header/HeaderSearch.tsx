import { cn } from "@/shared/utils/clx";
import { Input } from "@heroui/input";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useI18n } from "@/shared/i18n";

interface Props {
  className?: string;
}

const isMac =
  typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/.test(navigator.platform);

export function HeaderSearch({ className }: Props) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    if (!value.trim()) return;
    navigate(`/search?q=${value}`);
    inputRef.current?.blur();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (isShortcut) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className={cn("min-w-0", className)}>
      <Input
        ref={inputRef}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(event) => {
          if (event.key === "Enter") handleSearch();
          if (event.key === "Escape") inputRef.current?.blur();
        }}
        aria-label={t("search.placeholder")}
        placeholder={t("search.placeholder")}
        color="secondary"
        startContent={
          <Search size={16} className="text-(--muted-foreground) shrink-0" />
        }
        endContent={
          !isFocused && !value ? (
            <kbd
              className="hidden md:inline-flex items-center gap-0.5 shrink-0 rounded-md border theme-border theme-text-muted px-1.5 py-0.5 text-[10px] font-medium"
              aria-hidden="true"
            >
              {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
          ) : undefined
        }
        classNames={{
          input: "placeholder:text-(--muted-foreground) text-(--foreground)",
          inputWrapper: [
            "bg-(--surface)",
            "border border-(--border-color)",
            "hover:bg-(--surface-soft)",
            "transition-[background-color,border-color,box-shadow] duration-200 motion-reduce:transition-none",
            "focus-within:border-(--primary-color)/50 focus-within:ring-2 focus-within:ring-(--primary-color)/50",
          ],
        }}
      />
    </div>
  );
}
