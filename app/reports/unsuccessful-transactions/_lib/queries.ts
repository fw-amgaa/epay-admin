"use server";

import { auth } from "@/auth";
import { GetSuccessfulTransactionsParams } from "./validations";
import { SuccessfulTransactionsApiResponse } from "../../successful-transactions/_lib/types";

const buildNetSettlementQueryString = (
  params: GetSuccessfulTransactionsParams
): string => {
  const queryParts: string[] = [];

  if (params.from)
    queryParts.push(`startDate=${params.from} ` + "00:00:00.000");
  if (params.to) queryParts.push(`endDate=${params.to} ` + "23:59:59.999");
  if (params.operatorCodes.length > 0)
    queryParts.push(`operatorCodes=${params.operatorCodes.join(",")}`);

  return queryParts.length ? `${queryParts.join("&")}` : "";
};

export async function getUnsuccessfulTransactions(
  input: GetSuccessfulTransactionsParams
): Promise<SuccessfulTransactionsApiResponse> {
  const session = await auth();

  if (
    !input.from ||
    !input.to ||
    !input.operatorCodes ||
    input.operatorCodes.length === 0
  )
    return {
      res: "error",
      data: [],
    };

  try {
    const requestUrl = `${
      process.env.API_URL
    }/reports/monthly-transaction?${buildNetSettlementQueryString(
      input
    )}&transactionStatus=false`;

    const response = await fetch(requestUrl, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + session?.user.jwt,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data as SuccessfulTransactionsApiResponse;
  } catch (error) {
    console.error(error);
    return {
      res: "error",
      data: [],
    };
  }
}
