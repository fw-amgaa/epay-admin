"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { getSuccessfulTransactions } from "./queries";
import { successfulTransactionsSearchParams } from "./validations";
import { useState } from "react";
import { SuccessfulTransactionsApiResponse } from "./types";

export function useSuccessfulTransactions() {
  const [{ from, to, operatorCodes }, setQueryStates] = useQueryStates(
    successfulTransactionsSearchParams
  );

  const [successfulTransactions, setSuccessfulTransactions] = useState<
    SuccessfulTransactionsApiResponse["data"]
  >([]);

  const canMutate = Boolean(from && to && operatorCodes.length > 0);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await getSuccessfulTransactions({
        from,
        to,
        operatorCodes,
      });
      setSuccessfulTransactions(response.data);
      return response.data;
    },
    onError: () => {
      setSuccessfulTransactions([]);
    },
  });

  return {
    data: successfulTransactions,
    mutate: mutation.mutate,
    canMutate: canMutate,
    isPending: mutation.isPending,
    setQueryStates: setQueryStates,
    queryParams: { from, to, operatorCodes },
  };
}
