import { useGlobalStore } from "@/shared/store";
import { ProfileDropdown } from "../../../profileDropdown/ProfileDropdown";

export const Profile = () => {
  const user = useGlobalStore((state) => state.user);
  return (
    <div className="flex flex-row items-center justify-between px-5 max-[940px]:justify-center">
      <div className="flex flex-row justify-center items-center  gap-2">
        <ProfileDropdown />
        <div className="flex flex-col max-[940px]:hidden">
          <div className="flex flex-col">
            <span className="font-semibold">{user?.username ?? ""}</span>
            <span className="font-light text-neutral-400">{user?.email ?? ""}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
