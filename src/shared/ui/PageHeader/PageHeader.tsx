import { Chip } from "@heroui/chip";
import type { LucideIcon } from "lucide-react";

interface Props {
  label: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}

export const PageHeader = ({ label, title, description, Icon }: Props) => {
  return (
    <div className="space-y-3">
      <Chip
        color="primary"
        variant="flat"
        className="border border-orange-500/20 bg-(--primary-color)/10 text-(--primary-color) text-md py-4"
      >
        <div className="flex flex-row items-center justify-center gap-1.5">
          <Icon />
          {label}
        </div>
      </Chip>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white md:text-4xl">{title}</h1>
        <p className="max-w-3xl text-neutral-300">{description}</p>
      </div>
    </div>
  );
};
