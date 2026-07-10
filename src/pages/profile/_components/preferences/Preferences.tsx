import { Card, CardBody, CardHeader } from "@heroui/card";
import { Sparkles } from "lucide-react";
import { LanguageSelect } from "@/shared/ui/LanguageSelect/LanguageSelect";
import { ThemeToggle } from "@/shared/ui/ThemeToggle/ThemeToggle";
import { useI18n } from "@/shared/i18n";

export const Preferences = () => {
  const { t } = useI18n();

  return (
    <Card
      classNames={{
        base: "theme-surface-soft overflow-visible transition-shadow duration-300 hover:shadow-lg hover:shadow-(--primary-color)/5 max-sm:border-0 max-sm:bg-transparent! max-sm:shadow-none! max-sm:hover:shadow-none!",
        body: "overflow-visible",
      }}
    >
      <CardHeader className="flex flex-row items-center gap-3 px-6 pt-6 max-sm:px-0 max-sm:pt-0">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-(--primary-color)/10 text-(--primary-color) ring-1 ring-(--primary-color)/20">
          <Sparkles size={18} />
        </span>
        <div className="flex flex-col items-start gap-1">
          <h2 className="theme-text text-lg font-semibold">
            {t("profile.preferences")}
          </h2>
          <p className="theme-text-muted text-sm">
            {t("profile.preferencesSubtitle")}
          </p>
        </div>
      </CardHeader>
      <CardBody className="px-6 pb-6 max-sm:px-0 max-sm:pb-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LanguageSelect className="w-full" />
          <ThemeToggle className="w-full" />
        </div>
      </CardBody>
    </Card>
  );
};
