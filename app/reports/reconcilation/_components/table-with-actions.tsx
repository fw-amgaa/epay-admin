"use client";

import { Button } from "@/components/ui/button";
import { useReconcilation } from "../_lib/use-reconcilation";
import { ReconcilationTables } from "./reconcilation-tables";

export function TableWithActions() {
  const { mutate, isPending, canMutate, setQueryStates, data } =
    useReconcilation();

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

      <ReconcilationTables datas={data} />
    </>
  );
}
