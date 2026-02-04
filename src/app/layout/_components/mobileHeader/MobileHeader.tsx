import logo from "/sh_logo_white.png";
import { useGlobalStore } from "@/shared/store";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router";
import { ProfileDropdown } from "../profileDropdown/ProfileDropdown";
import { GlobalSearch } from "../sidebar/_components";

export const MobileHeader = () => {
  const navigate = useNavigate();
  const isAuthed = useGlobalStore((state) => state.isAuthed);
  return (
    <header className="w-full p-4 flex flex-row justify-between items-center">
      <img src={logo} alt="logo" className="w-13" />
      <div className="flex flex-row gap-3 justify-center items-center">
        <GlobalSearch/>
        {!isAuthed ? (
          <Button onPress={() => navigate("/auth")} color="primary">
            Войти
          </Button>
        ) : (
          <ProfileDropdown />
        )}
      </div>
    </header>
  );
};
