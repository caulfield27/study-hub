import { cn } from "@/shared/utils/clx";
import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export const QuizesSkeleton = ({ size, isScrollable }: { size: number; isScrollable?: boolean }) => {
  return (
    <div
      className={cn(
        "w-full flex flex-wrap justify-center items-start gap-8 max-sm:gap-5",
        isScrollable && "flex-nowrap"
      )}
    >
      {Array.from({ length: size }).map((_, idx) => {
        return (
          <Card
            key={idx}
            className={cn(
              "w-[250px] h-[412px] space-y-5 p-4 shrink-0",
              !isScrollable && "max-sm:w-full"
            )}
            radius="lg"
          >
            <Skeleton className="rounded-lg">
              <div className="h-64 rounded-lg" />
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
