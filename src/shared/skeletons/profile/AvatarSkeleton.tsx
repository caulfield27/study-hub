import { Skeleton } from "@heroui/skeleton"

export const AvatarSkeleton = () => {
    return <div className="flex flex-row gap-1 items-center justify-start p-4">
        <Skeleton className="rounded-full w-10 h-10"/>
        <div className="flex flex-col gap-2 justify-center items-start">
            <Skeleton className="rounded-2xl w-30 h-2"/>
            <Skeleton className="rounded-2xl w-25 h-1.5"/>
        </div>
    </div>
}