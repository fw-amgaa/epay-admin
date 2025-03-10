import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {/* Top Statistics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4 shadow-sm">
            <Skeleton className="h-6 w-40" /> {/* Title */}
            <Skeleton className="mt-2 h-10 w-28" /> {/* Value */}
            <Skeleton className="mt-1 h-4 w-24" /> {/* Percentage Change */}
          </div>
        ))}
      </div>

      {/* Donut Chart Placeholder */}
      <div className="rounded-lg border p-4 shadow-sm">
        <Skeleton className="h-6 w-48" /> {/* Title */}
        <div className="flex items-center justify-center py-8">
          <Skeleton className="size-40 rounded-full" /> {/* Donut Chart */}
        </div>
        <Skeleton className="mt-2 h-4 w-40 mx-auto" /> {/* Subtitle */}
      </div>

      {/* Bar Chart Placeholder */}
      <div className="rounded-lg border p-4 shadow-sm">
        <Skeleton className="h-6 w-48" /> {/* Title */}
        <div className="flex items-center justify-center py-8">
          <Skeleton className="h-32 w-full" /> {/* Bar Chart */}
        </div>
      </div>
    </div>
  );
}
