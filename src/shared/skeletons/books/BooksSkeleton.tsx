import { cn } from "@/shared/utils/clx";
import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export const BooksSkeleton = ({ size, isScrollable }: { size: number; isScrollable?: boolean }) => {
  return (
    <div
      className={cn(
        "flex flex-row flex-wrap gap-5 justify-center items-start",
        isScrollable && "flex-nowrap justify-start items-start overflow-x-auto no-scrollbar"
      )}
    >
      {Array.from({ length: size }).map((_, idx) => {
        return (
          <Card
            key={idx}
            className={cn("w-[270px] h-[450px] space-y-5 p-4", isScrollable && "max-sm:w-full")}
            radius="lg"
          >
            <Skeleton className="rounded-lg">
              <div className="h-[330px] rounded-lg" />
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg" />
              </Skeleton>
              <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg" />
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg" />
              </Skeleton>
              <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-full rounded-lg" />
              </Skeleton>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
