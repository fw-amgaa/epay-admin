"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { getUnsuccessfulTransactions } from "./queries";
import { useState } from "react";
import { successfulTransactionsSearchParams } from "../../successful-transactions/_lib/validations";
import { SuccessfulTransactionsApiResponse } from "../../successful-transactions/_lib/types";

export function useUnsuccessfulTransactions() {
  const [{ from, to, operatorCodes }, setQueryStates] = useQueryStates(
    successfulTransactionsSearchParams
  );

  const [unsuccessfulTransactions, setUnsuccessfulTransactions] = useState<
    SuccessfulTransactionsApiResponse["data"]
  >([]);

  const canMutate = Boolean(from && to && operatorCodes.length > 0);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await getUnsuccessfulTransactions({
        from,
        to,
        operatorCodes,
      });
      setUnsuccessfulTransactions(response.data);
      return response.data;
    },
    onError: () => {
      setUnsuccessfulTransactions([]);
    },
  });

  return {
    data: unsuccessfulTransactions,
    mutate: mutation.mutate,
    canMutate: canMutate,
    isPending: mutation.isPending,
    setQueryStates: setQueryStates,
    queryParams: { from, to, operatorCodes },
  };
}
