import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useI18n, type Locale } from "@/shared/i18n";
import { cn } from "@/shared/utils/clx";
import { Radio, RadioGroup } from "@heroui/radio";

interface Props {
  compact?: boolean;
  className?: string;
}

const localeOptions: Array<{
  code: Locale;
  flag: string;
  shortLabel: string;
}> = [
  { code: "ru", flag: "🇷🇺", shortLabel: "RU" },
  { code: "tg", flag: "🇹🇯", shortLabel: "TJ" },
  { code: "en", flag: "🇺🇸", shortLabel: "EN" },
];

export function LanguageSelect({ compact = false, className }: Props) {
  const { locale, setLocale, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const activeOption =
    localeOptions.find((option) => option.code === locale) ?? localeOptions[0];

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useLayoutEffect(() => {
    if (!isOpen || !containerRef.current || !menuRef.current) {
      return;
    }

    const triggerRect = containerRef.current.getBoundingClientRect();
    const menuHeight = menuRef.current.getBoundingClientRect().height;
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    setOpenUpward(spaceBelow < menuHeight + 12 && spaceAbove > spaceBelow);
  }, [isOpen]);

  return (
    <>
      <div className={cn("hidden relative max-sm:block", className)}>
        <RadioGroup
          value={locale}
          onValueChange={(next) => setLocale(next as Locale)}
          classNames={{ label: "theme-text-muted" }}
        >
          {localeOptions.map((option) => (
            <Radio key={option.code} value={option.code}>
              {t(`locales.${option.code}`)}
              {`(${option.flag})`}
            </Radio>
          ))}
        </RadioGroup>
      </div>
      <div
        ref={containerRef}
        className={cn("relative block max-sm:hidden", className)}
      >
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={t("common.language")}
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "group cursor-pointer flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left transition duration-200 hover:bg-(--surface-soft) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary-color)/50 theme-surface theme-text",
            compact && "min-w-0 px-2.5 py-2",
            isOpen && "border-(--primary-color)/45 bg-(--surface-soft)",
          )}
        >
          <span className="flex min-w-0 items-center gap-3">
            <span
              className={cn("text-lg leading-none mb-0.5", compact && "text-base")}
            >
              {activeOption.flag}
            </span>

            <span className="min-w-0">
              <span
                className={cn(
                  "block truncate text-sm font-medium",
                  compact && "text-xs tracking-[0.18em]",
                )}
              >
                {compact
                  ? activeOption.shortLabel
                  : t(`locales.${activeOption.code}`)}
              </span>
            </span>
          </span>

          <ChevronDown
            size={18}
            className={cn(
              "shrink-0 theme-text-muted transition duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {isOpen && (
          <div
            ref={menuRef}
            className={cn(
              "absolute left-0 z-50 w-full overflow-hidden rounded-xl border p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.2)] theme-surface",
              openUpward ? "bottom-full mb-2" : "top-full mt-2",
            )}
          >
            <div
              role="listbox"
              aria-label={t("common.language")}
              className="flex flex-col gap-1"
            >
              {localeOptions.map((option) => {
                const isActive = option.code === locale;

                return (
                  <button
                    key={option.code}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    onClick={() => {
                      setLocale(option.code);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left transition duration-200",
                      isActive
                        ? "bg-(--surface-strong) theme-text"
                        : "theme-text-muted hover:bg-(--surface-soft) hover:text-(--foreground)",
                    )}
                  >
                    <span className="text-lg leading-none mb-0.5">{option.flag}</span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {t(`locales.${option.code}`)}
                      </span>
                    </span>

                    <span
                      className={cn(
                        "flex h-5 w-5 items-center justify-center transition duration-200",
                        isActive
                          ? "text-(--primary-color)"
                          : "text-transparent",
                      )}
                    >
                      <Check size={14} />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
