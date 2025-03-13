"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { getMonthlyBills } from "./queries";
import { monthlyBillSearchParams } from "./validations";
import { useState } from "react";
import { MonthlyBillApiResponse } from "./types";

export function useMonthlyBill() {
  const [{ from, to, operatorCodes }, setQueryStates] = useQueryStates(
    monthlyBillSearchParams
  );

  const [monthlyBill, setMonthlyBill] = useState<
    MonthlyBillApiResponse["data"]
  >([]);

  const canMutate = Boolean(from && to && operatorCodes.length > 0);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await getMonthlyBills({ from, to, operatorCodes });
      setMonthlyBill(response.data);
      return response.data;
    },
    onError: () => {
      setMonthlyBill([]);
    },
  });

  return {
    data: monthlyBill,
    mutate: mutation.mutate,
    canMutate: canMutate,
    isPending: mutation.isPending,
    setQueryStates: setQueryStates,
    queryParams: { from, to, operatorCodes },
  };
}
