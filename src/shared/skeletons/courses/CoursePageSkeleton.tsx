import { Skeleton } from "@heroui/skeleton";
import { Card } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";

export default function CoursePageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs>
        <BreadcrumbItem>
          <Skeleton className="h-4 w-24 rounded-lg" />
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Skeleton className="h-4 w-40 rounded-lg" />
        </BreadcrumbItem>
      </Breadcrumbs>
      {/* Hero Section */}
      <Card className="theme-surface overflow-hidden max-sm:bg-transparent! max-sm:shadow-none!">
        <div className="grid gap-0 xl:grid-cols-[360px_minmax(0,1fr)]">
          {/* Poster */}
          <div className="relative min-h-70">
            <Skeleton className="h-full min-h-70 w-full rounded-none xl:rounded-l-2xl" />
          </div>

          {/* Content */}
          <div className="space-y-6 p-6 md:p-8 max-sm:px-0">
            {/* Chips */}
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-7 w-24 rounded-full" />
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-28 rounded-full" />
            </div>

            {/* Title + Description */}
            <div className="space-y-3">
              <Skeleton className="h-10 w-3/4 rounded-xl md:h-14" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-[95%] rounded-lg" />
                <Skeleton className="h-4 w-[80%] rounded-lg" />
              </div>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-5">
              <Skeleton className="h-5 w-28 rounded-lg" />
              <Skeleton className="h-5 w-24 rounded-lg" />
              <Skeleton className="h-5 w-32 rounded-lg" />
              <Skeleton className="h-5 w-24 rounded-lg" />
            </div>

            <Divider className="theme-border" />

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="theme-surface-soft p-4">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-20 rounded-lg" />
                    <Skeleton className="h-6 w-28 rounded-lg" />
                  </div>
                </Card>
              ))}
            </div>

            {/* Button */}
            <Skeleton className="h-12 w-full rounded-xl sm:w-48" />
          </div>
        </div>
      </Card>

      {/* Lessons */}
      <section className="space-y-4">
        <Skeleton className="h-8 w-52 rounded-xl" />

        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-20 rounded-xl" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-2/3 rounded-lg" />
                  <Skeleton className="h-4 w-1/3 rounded-lg" />
                </div>

                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="space-y-4">
        <Skeleton className="h-8 w-40 rounded-xl" />

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="p-5">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />

                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28 rounded-lg" />
                    <Skeleton className="h-3 w-20 rounded-lg" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-[90%] rounded-lg" />
                  <Skeleton className="h-4 w-[70%] rounded-lg" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
