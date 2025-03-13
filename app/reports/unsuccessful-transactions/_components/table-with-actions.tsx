"use client";

import { Button } from "@/components/ui/button";
import { useUnsuccessfulTransactions } from "../_lib/use-unsuccessful-transactions";
import { FinancialTables } from "./financial-tables";

export function TableWithActions() {
  const { mutate, isPending, canMutate, setQueryStates, data } =
    useUnsuccessfulTransactions();

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
      <FinancialTables bankData={data} />
    </>
  );
}
