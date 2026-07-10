import logo from "/sh_logo_white.png";
import logo_black from "/sh_logo.png";
import { useGlobalStore } from "@/shared/store";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router";
import { ProfileDropdown } from "../profileDropdown/ProfileDropdown";
import { GlobalSearch } from "../sidebar/_components";
import { useI18n } from "@/shared/i18n";
import { useTheme } from "@/shared/theme";
import { Skeleton } from "@heroui/skeleton";

export const MobileHeader = () => {
  const { t } = useI18n();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const isAuthed = useGlobalStore((state) => state.isAuthed);
  const meLoading = useGlobalStore((state) => state.meLoading);
  // const { pathname } = useLocation();

  return (
    <header className="w-full p-4 flex flex-row justify-between items-center gap-3">
      <div
        role="button"
        className="cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src={theme === "light" ? logo_black : logo}
          alt="logo"
          className="w-13"
        />
      </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        <GlobalSearch />
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
    </header>
  );
};
