import { Card, CardHeader, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export function PasswordFormSkeleton() {
  return (
    <Card className="theme-surface-soft max-sm:border-0 max-sm:bg-transparent! max-sm:shadow-none!">
      <CardHeader className="flex flex-col items-start gap-2 px-6 pt-6 max-sm:px-0 max-sm:pt-0">
        {/* title */}
        <Skeleton className="h-6 w-44 rounded-lg" />
        {/* subtitle */}
        <Skeleton className="h-4 w-64 max-w-full rounded-lg" />
      </CardHeader>

      <CardBody className="px-6 pb-6 max-sm:px-0 max-sm:pb-0">
        <div className="flex flex-col gap-6">
          {/* current password: label + input */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-28 rounded-lg" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>

          {/* new password: label + input */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-lg" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>

          {/* confirm password: label + input */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 rounded-lg" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>

          {/* submit button */}
          <Skeleton className="h-10 w-28 rounded-xl max-sm:w-full" />
        </div>
      </CardBody>
    </Card>
  );
}