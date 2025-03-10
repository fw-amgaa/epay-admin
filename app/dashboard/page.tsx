import { Shell } from "@/components/ui/shell";
import { getDashboardData } from "./_lib/queries";
import { Suspense } from "react";
import Dashboard from "./_components/dashboard";
import { DashboardSkeleton } from "./_components/dashboard-skeleton";

export default async function Page() {
  const dashboardPromise = getDashboardData({
    from: "2024-12-01",
    to: "2024-12-31",
  });

  return (
    <Shell className="gap-2">
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard dashboard={dashboardPromise} />
      </Suspense>
    </Shell>
  );
}
