import { bankOptions } from "@/lib/bank-codes";
import {
  createSearchParamsCache,
  parseAsArrayOf,
  parseAsString,
} from "nuqs/server";
import { z } from "zod";

export const monthlyBillSearchParams = {
  from: parseAsString.withDefault(""),
  to: parseAsString.withDefault(""),
  operatorCodes: parseAsArrayOf(
    z.enum(bankOptions.map((otp) => otp.value) as [string, ...string[]])
  ).withDefault([]),
};

export const searchParamsCache = createSearchParamsCache(
  monthlyBillSearchParams
);

export type GetMonthlyBillParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
