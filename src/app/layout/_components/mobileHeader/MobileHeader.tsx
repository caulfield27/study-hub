import logo from "/sh_logo_white.png";
import { useGlobalStore } from "@/shared/store";
import { Button } from "@heroui/button";
import { Avatar } from "@heroui/avatar";
import { useNavigate } from "react-router";

export const MobileHeader = () => {
  const navigate = useNavigate();
  const { isAuthed, user } = useGlobalStore();
  return (
    <header className="w-full p-4 flex flex-row justify-between items-center">
      <img src={logo} alt="logo" className="w-13" />
      {!isAuthed ? (
        <Button onPress={() => navigate("/auth")} color="primary">
          Войти
        </Button>
      ) : (
        <Avatar color="primary" name={user?.username ?? ""} />
      )}
    </header>
  );
};
