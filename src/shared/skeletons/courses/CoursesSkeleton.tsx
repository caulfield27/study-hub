import { Skeleton } from "@heroui/skeleton";

export function CoursesPageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Content layout */}
      <div className="flex flex-row gap-5">
        {/* Filters */}
        <div className="hidden lg:block w-64 space-y-4">
          <Skeleton className="h-6 w-32 rounded-lg" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>

        {/* Courses */}
        <section className="space-y-4 flex-1">
          <Skeleton className="h-4 w-48 rounded-lg" />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3 rounded-2xl p-4">
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4 rounded-lg" />
                <Skeleton className="h-3 w-1/2 rounded-lg" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
