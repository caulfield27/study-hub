import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export const BooksSkeleton = ({ size }: { size: number }) => {
  return (
    <div className="flex flex-row flex-wrap gap-5 mb-[50px] justify-center items-start">
      {Array.from({ length: size }).map((_, idx) => {
        return (
          <Card key={idx} className="w-48 h-96 max-sm:w-full space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
              <div className="h-64 rounded-lg" />
            </Skeleton>
            <div className="space-y-3">
              <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg"/>
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
