import { Card, CardHeader, CardBody } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export function PreferencesSkeleton() {
  return (
    <Card
      classNames={{
        base: "theme-surface-soft overflow-visible max-sm:border-0 max-sm:bg-transparent! max-sm:shadow-none!",
        body: "overflow-visible",
      }}
    >
      <CardHeader className="flex flex-col items-start gap-2 px-6 pt-6 max-sm:px-0 max-sm:pt-0">
        {/* title */}
        <Skeleton className="h-6 w-40 rounded-lg" />
        {/* subtitle */}
        <Skeleton className="h-4 w-64 max-w-full rounded-lg" />
      </CardHeader>

      <CardBody className="px-6 pb-6 max-sm:px-0 max-sm:pb-0">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* LanguageSelect */}
          <Skeleton className="h-12 w-full rounded-xl" />
          {/* ThemeToggle */}
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </CardBody>
    </Card>
  );
}