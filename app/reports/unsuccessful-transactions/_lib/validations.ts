import { bankOptions } from "@/lib/bank-codes";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
} from "nuqs/server";
import { z } from "zod";

export const successfulTransactionsSearchParams = {
  from: parseAsString.withDefault(""),
  to: parseAsString.withDefault(""),
  operatorCodes: parseAsArrayOf(
    z.enum(bankOptions.map((otp) => otp.value) as [string, ...string[]])
  ).withDefault([]),
};

export const searchParamsCache = createSearchParamsCache(
  successfulTransactionsSearchParams
);

export type GetSuccessfulTransactionsParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
