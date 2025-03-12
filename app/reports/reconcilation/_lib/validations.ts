import { bankOptions } from "@/lib/bank-codes";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
} from "nuqs/server";
import { z } from "zod";

export const reconcilationSearchParams = {
  from: parseAsString.withDefault(""),
  to: parseAsString.withDefault(""),
  operatorCodes: parseAsArrayOf(
    z.enum(bankOptions.map((otp) => otp.value) as [string, ...string[]])
  ).withDefault([]),
};

export const searchParamsCache = createSearchParamsCache(
  reconcilationSearchParams
);

export type GetReconcilationParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
