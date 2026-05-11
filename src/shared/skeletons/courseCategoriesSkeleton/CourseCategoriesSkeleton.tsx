import { Skeleton } from "@heroui/skeleton";

export const CourseCategoriesSkeleton = () => {
  return (
    <section className="space-y-3">
      {/* Заголовок */}
      <Skeleton className="h-4 w-40 rounded-md" />

      {/* Кнопки */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-16 rounded-full" />
        ))}
      </div>
    </section>
  );
};
