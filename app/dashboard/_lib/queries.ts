"use server";

import { auth } from "@/auth";
import { GetDashboardParams } from "./validations";
import { DashboardApiResponse } from "./types";

const buildDashboardQueryString = (params: GetDashboardParams): string => {
  const query = new URLSearchParams();

  query.append("startDate", `${params.from} 00:00:00.000`);
  query.append("endDate", `${params.to} 23:59:59.999`);

  return query.toString();
};

export async function getDashboardData(
  input: GetDashboardParams
): Promise<DashboardApiResponse> {
  const session = await auth();

  try {
    const response = await fetch(
      `${process.env.API_URL}/dashboard-data?${buildDashboardQueryString(
        input
      )}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + session?.user.jwt,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data as DashboardApiResponse;
  } catch (error) {
    console.error(error);
    return {
      totalTransactions: 0,
      matchedTransactions: 0,
      unmatchedTransactions: 0,
      byClients: [],
    };
  }
}
