import { useGlobalStore } from "@/shared/store";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { LogOut, Settings } from "lucide-react";
import { logout } from "@/shared/utils/auth";
import { useI18n } from "@/shared/i18n";
import { useNavigate } from "react-router";
import { getFile } from "@/shared/utils/getFile";

export const ProfileDropdown = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const user = useGlobalStore((state) => state.user);
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            src={getFile(user?.avatar ?? '') ?? undefined}
            as="button"
            color="primary"
            name={user?.username ?? "u"}
            className="transition-transform cursor-pointer"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem
            role="button"
            onPress={() => navigate('/profile')}
            key="settings"
            color="primary"
            endContent={<Settings size={15}/>}
          >
            {t("common.settings")}
          </DropdownItem>
          <DropdownItem
            role="button"
            onPress={logout}
            key="logout"
            color="danger"
            endContent={<LogOut size={15}/>}
          >
            {t("common.logout")}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
