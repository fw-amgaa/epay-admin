"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { getReconcilations } from "./queries";
import { reconcilationSearchParams } from "./validations";
import { useState } from "react";
import { ReconcilationApiResponse } from "./types";

export function useReconcilation() {
  const [{ from, to, operatorCodes }, setQueryStates] = useQueryStates(
    reconcilationSearchParams
  );

  const [reconcilation, setReconcilation] = useState<
    ReconcilationApiResponse["data"]
  >([]);

  const canMutate = Boolean(from && to && operatorCodes.length > 0);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await getReconcilations({ from, to, operatorCodes });
      setReconcilation(response.data);
      return response.data;
    },
    onError: () => {
      setReconcilation([]);
    },
  });

  return {
    data: reconcilation,
    mutate: mutation.mutate,
    canMutate: canMutate,
    isPending: mutation.isPending,
    setQueryStates: setQueryStates,
    queryParams: { from, to, operatorCodes },
  };
}
