import { Moon, SunMedium } from "lucide-react";
import { useTheme } from "@/shared/theme";
import { useI18n } from "@/shared/i18n";
import { cn } from "@/shared/utils/clx";

interface Props {
  compact?: boolean;
  className?: string;
}

export function ThemeToggle({ compact = false, className }: Props) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      aria-label={isLight ? t("common.darkTheme") : t("common.lightTheme")}
      onClick={toggleTheme}
      className={cn(
        "group cursor-pointer flex items-center justify-between gap-3 rounded-xl border px-3 py-2 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary-color)/50",
        "theme-surface theme-text hover:bg-(--surface-soft)",
        compact ? "min-w-0" : "w-full",
        className,
      )}
    >
      <span className="flex items-center gap-3">
        <span className="text-(--primary-color)">
          {isLight ? <Moon size={18} /> : <SunMedium size={18} />}
        </span>
        {!compact && (
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium">
              {t("common.theme")}
            </span>
            <span className="theme-text-muted block truncate text-xs">
              {isLight ? t("common.lightTheme") : t("common.darkTheme")}
            </span>
          </span>
        )}
      </span>

      {compact && (
        <span className="theme-text-muted text-xs">
          {isLight ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
}
