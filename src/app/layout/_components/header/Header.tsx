import logo from "/sh_logo_white.png";
import logo_black from "/sh_logo.png";
import { useNavigate } from "react-router";
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import { useGlobalStore } from "@/shared/store";
import { useI18n } from "@/shared/i18n";
import { useTheme } from "@/shared/theme";
import { LanguageSelect } from "@/shared/ui/LanguageSelect/LanguageSelect";
import { ThemeToggle } from "@/shared/ui/ThemeToggle/ThemeToggle";
import { ProfileDropdown } from "../profileDropdown/ProfileDropdown";
import { authedNavLinks } from "../../nav-links.constants";
import { HeaderNav } from "./HeaderNav";
import { HeaderMobileNav } from "./HeaderMobileNav";

export function Header() {
  const { t } = useI18n();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isAuthed = useGlobalStore((state) => state.isAuthed);
  const meLoading = useGlobalStore((state) => state.meLoading);

  return (
    <header className="sticky top-0 z-40 w-full max-sm:hidden theme-surface-soft border-b theme-border">
      <div className="flex items-center justify-between gap-4 px-6 py-3">
        <div className="flex justify-center items-center gap-4">
          <div
            role="button"
            className="cursor-pointer shrink-0"
            onClick={() => navigate("/")}
          >
            <img
              src={theme === "light" ? logo_black : logo}
              alt="logo"
              className="w-13"
            />
          </div>
          <HeaderMobileNav links={authedNavLinks} className="lg:hidden" />
        </div>

        <HeaderNav
          links={authedNavLinks}
          className="hidden lg:flex flex-1 pl-4"
        />

        <div className="flex items-center gap-2 shrink-0">
          <LanguageSelect compact />
          <ThemeToggle compact />
          {!isAuthed ? (
            <Button onPress={() => navigate("/auth")} color="primary">
              {t("mobileHeader.signIn")}
            </Button>
          ) : meLoading ? (
            <Skeleton className="w-10 h-10 rounded-full" />
          ) : (
            <ProfileDropdown />
          )}
        </div>
      </div>
    </header>
  );
}
