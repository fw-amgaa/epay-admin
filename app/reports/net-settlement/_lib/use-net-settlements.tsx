"use client";

import { useMutation } from "@tanstack/react-query";
import { useQueryStates } from "nuqs";
import { getNetSettlements } from "./queries";
import { netSettlementSearchParams } from "./validations";
import { useState } from "react";
import { NetSettlementApiResponse } from "./types";

export function useNetSettlements() {
  const [{ from, to, operatorCodes }, setQueryStates] = useQueryStates(
    netSettlementSearchParams
  );

  const [netSettlements, setNetSettlements] = useState<
    NetSettlementApiResponse["data"]
  >([]);

  const canMutate = Boolean(from && to && operatorCodes.length > 0);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await getNetSettlements({ from, to, operatorCodes });
      setNetSettlements(response.data);
      return response.data;
    },
    onError: () => {
      setNetSettlements([]);
    },
  });

  console.log("naniiii", netSettlements);

  return {
    data: netSettlements,
    mutate: mutation.mutate,
    canMutate: canMutate,
    isPending: mutation.isPending,
    setQueryStates: setQueryStates,
    queryParams: { from, to, operatorCodes },
  };
}
