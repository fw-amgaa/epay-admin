"use client";

import { Button } from "@/components/ui/button";
import { useMonthlyBill } from "../_lib/use-monthly-bill";
import { MonthlyBillTables } from "./monthly-bill-tables";

export function TableWithActions() {
  const { mutate, isPending, canMutate, setQueryStates, data } =
    useMonthlyBill();

  return (
    <>
      <div className="flex gap-2">
        <Button
          size={"sm"}
          onClick={() => mutate()}
          loading={isPending}
          disabled={!canMutate || isPending}
        >
          Хайх
        </Button>

        <Button
          size={"sm"}
          onClick={() =>
            setQueryStates({ from: "", to: "", operatorCodes: [] })
          }
          variant={"outline"}
        >
          Цэвэрлэх
        </Button>
      </div>

      <MonthlyBillTables datas={data} />
    </>
  );
}
