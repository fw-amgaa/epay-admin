"use server";

import { auth } from "@/auth";
import { GetMonthlyBillParams } from "./validations";
import { MonthlyBillApiResponse } from "./types";

const buildQueryString = (params: GetMonthlyBillParams): string => {
  const queryParts: string[] = [];

  if (params.from)
    queryParts.push(`startDate=${params.from} ` + "00:00:00.000");
  if (params.to) queryParts.push(`endDate=${params.to} ` + "23:59:59.999");
  if (params.operatorCodes.length > 0)
    queryParts.push(`operatorCodes=${params.operatorCodes.join(",")}`);

  return queryParts.length ? `${queryParts.join("&")}` : "";
};

export async function getMonthlyBills(
  input: GetMonthlyBillParams
): Promise<MonthlyBillApiResponse> {
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
    }/reports/monthly-billing?${buildQueryString(input)}`;

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
    return data as MonthlyBillApiResponse;
  } catch (error) {
    console.error(error);
    return {
      res: "error",
      data: [],
    };
  }
}
