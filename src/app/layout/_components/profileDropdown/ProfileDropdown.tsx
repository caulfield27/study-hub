import { useGlobalStore } from "@/shared/store";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { LogOut } from "lucide-react";
import { logout } from "@/shared/utils/auth";

export const ProfileDropdown = () => {
  const user = useGlobalStore((state) => state.user);
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            as="button"
            color="primary"
            name={user?.username ?? "u"}
            className="transition-transform cursor-pointer"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem role="button" onPress={logout} key="logout" color="danger" endContent={<LogOut />}>
            Выйти
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
