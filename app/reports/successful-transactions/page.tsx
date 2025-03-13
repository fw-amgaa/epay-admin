import { DateRangePicker } from "@/components/date-range-picker";
import { FacetedFilter } from "@/components/faceted-filter";
import { Shell } from "@/components/ui/shell";
import { bankOptions } from "@/lib/bank-codes";
import { TableWithActions } from "./_components/table-with-actions";

export default async function SuccessfulTransactions() {
  return (
    <Shell className="gap-4">
      <div className="flex gap-2 flex-wrap">
        <DateRangePicker
          triggerSize="sm"
          triggerClassName="w-56 sm:w-60"
          shallow={false}
          showClear={false}
        />
        <FacetedFilter
          title="Банкууд"
          value="operatorCodes"
          options={bankOptions.map((bank) => {
            return {
              label: bank.label,
              value: bank.value,
            };
          })}
        />
      </div>

      <TableWithActions />
    </Shell>
  );
}
