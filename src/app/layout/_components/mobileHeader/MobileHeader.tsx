import logo from "/sh_logo_white.png";
import { useGlobalStore } from "@/shared/store";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router";
import { ProfileDropdown } from "../profileDropdown/ProfileDropdown";
import { GlobalSearch } from "../sidebar/_components";
import { LanguageSelect } from "@/shared/ui/LanguageSelect/LanguageSelect";
import { ThemeToggle } from "@/shared/ui/ThemeToggle/ThemeToggle";
import { useI18n } from "@/shared/i18n";

export const MobileHeader = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const isAuthed = useGlobalStore((state) => state.isAuthed);
  return (
    <header className="w-full p-4 flex flex-row justify-between items-center gap-3">
      <img src={logo} alt="logo" className="w-13 theme-logo" />
      <div className="flex flex-row gap-2 justify-center items-center">
        <LanguageSelect compact className="w-20" />
        <ThemeToggle compact className="w-20" />
        <GlobalSearch/>
        {!isAuthed ? (
          <Button onPress={() => navigate("/auth")} color="primary">
            {t("mobileHeader.signIn")}
          </Button>
        ) : (
          <ProfileDropdown />
        )}
      </div>
    </header>
  );
};
