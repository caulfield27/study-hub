
import { Skeleton } from "@heroui/skeleton";
import { Card, CardHeader, CardBody } from "@heroui/card";

export function AccountFormSkeleton() {
  return (
    <Card className="theme-surface-soft max-sm:border-0 max-sm:bg-transparent! max-sm:shadow-none!">
      <CardHeader className="flex flex-col items-start gap-2 px-6 pt-6 max-sm:px-0 max-sm:pt-0">
        {/* title */}
        <Skeleton className="h-6 w-40 rounded-lg" />
        {/* subtitle */}
        <Skeleton className="h-4 w-64 max-w-full rounded-lg" />
      </CardHeader>

      <CardBody className="px-6 pb-6 max-sm:px-0 max-sm:pb-0">
        <div className="flex flex-col gap-6">
          {/* avatar row */}
          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <Skeleton className="h-20 w-20 rounded-full" />
              {/* camera badge, positioned like the real button */}
              <Skeleton className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full" />
            </div>
            {/* avatar hint */}
            <Skeleton className="h-4 w-48 max-w-full rounded-lg" />
          </div>

          {/* username field: label + input */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 rounded-lg" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>

          {/* email field: label + input */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 rounded-lg" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>

          {/* submit button */}
          <Skeleton className="h-10 w-28 rounded-xl max-sm:w-full" />
        </div>
      </CardBody>
    </Card>
  );
}