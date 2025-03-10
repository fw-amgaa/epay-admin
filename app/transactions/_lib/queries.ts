import "server-only";

import { GetTransactionsParams } from "./validations";
import { auth } from "@/auth";
import { TransactionListApiResponse } from "./types";
import { buildStrapiQueryParams } from "./build-strapi-query";

export async function getTransactions(
  input: GetTransactionsParams
): Promise<TransactionListApiResponse> {
  const session = await auth();
  const queryParams = buildStrapiQueryParams(input);

  try {
    const response = await fetch(
      `${process.env.API_URL}/transactions?${queryParams.toString()}`,
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
    return data as TransactionListApiResponse;
  } catch {
    return {
      data: [],
      meta: {
        pagination: {
          total: 0,
          page: 1,
          pageSize: 10,
          pageCount: 0,
        },
      },
    };
  }
}
