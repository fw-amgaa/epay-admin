import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { DateRangePicker } from "@/components/date-range-picker";
import { Shell } from "@/components/ui/shell";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { TransactionsTable } from "./_components/transactions-table";
import { FeatureFlagsProvider } from "@/components/data-table/data-table-feature-flags";
import { getTransactions } from "./_lib/queries";
import { getValidFilters } from "@/lib/data-table";
import { searchParamsCache } from "./_lib/validations";
import { SearchParams } from "@/types/data-table";
// import { Button } from "@/components/ui/button";
// import { SearchIcon } from "lucide-react";
// import { revalidatePath } from "next/cache";

interface Props {
  searchParams: Promise<SearchParams>;
}

export default async function Page(props: Props) {
  const searchParams = await props.searchParams;
  const search = searchParamsCache.parse(searchParams);

  const validFilters = getValidFilters(search.filters);

  const promises = Promise.all([
    getTransactions({
      ...search,
      filters: validFilters,
    }),
  ]);

  return (
    <Shell className="gap-2">
      <FeatureFlagsProvider>
        <React.Suspense fallback={<Skeleton className="h-7 w-52" />}>
          <div className="flex items-center space-x-2">
            <DateRangePicker
              triggerSize="sm"
              triggerClassName="w-56 sm:w-60"
              shallow={false}
            />

            {/* <Button
              size={"sm"}
              onClick={() => {
                revalidatePath("/transactions");
              }}
            >
              <SearchIcon /> Хайх
            </Button> */}
          </div>
        </React.Suspense>
        <React.Suspense
          fallback={
            <DataTableSkeleton
              columnCount={6}
              searchableColumnCount={1}
              filterableColumnCount={2}
              cellWidths={["10rem", "40rem", "12rem", "12rem", "8rem", "8rem"]}
              shrinkZero
            />
          }
        >
          <TransactionsTable promises={promises} />
        </React.Suspense>
      </FeatureFlagsProvider>
    </Shell>
  );
}
