import 'server-only';
import { unstable_cache } from '@/lib/unstable-cache';
import { GetTransactionsParams } from './validations';
import { auth } from '@/auth';
import { TransactionListApiResponse } from './types';

export async function getTransactions(input: GetTransactionsParams): Promise<TransactionListApiResponse> {
    const session = await auth();

  return await unstable_cache(
    async () => {
      try {
        const queryParams = new URLSearchParams();

        // Pagination
        queryParams.append("pagination[page]", input.page.toString());
        queryParams.append("pagination[pageSize]", input.perPage.toString());

        // Sorting
        input.sort.forEach(({ id, desc }: { id: string; desc: boolean }) => {
          queryParams.append(`sort`, `${id}:${desc ? "desc" : "asc"}`);
        });

        // Date range filtering
        if (input.from && input.to) {
          queryParams.append("filters[transaction_date][$gte]", input.from);
          queryParams.append("filters[transaction_date][$lte]", input.to);
        }

        // Dynamic filters
        input.filters.forEach(({ id, value, operator }: { id: string; value: string | string[]; operator: string }) => {
          if (Array.isArray(value)) {
            // Multi-select (e.g., filters[debitor_code][$in]=0005&filters[debitor_code][$in]=0015)
            value.forEach((v) => queryParams.append(`filters[${id}][$in]`, v));
          } else {
            // Text-based filters
            switch (operator) {
              case "eq":
                queryParams.append(`filters[${id}][$eq]`, value);
                break;
              case "iLike":
                queryParams.append(`filters[${id}][$containsi]`, value);
                break;
              default:
                break;
            }
          }
        });

        console.log("🚀 ~ input.filters.forEach ~ queryParams:", queryParams)

        // Fetch transactions from Strapi
        const response = await fetch(`${process.env.API_URL}/transactions?${queryParams.toString()}`, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + session?.user.jwt,
          },
        });


        return await response.json() as TransactionListApiResponse;
      } catch {
        return { data: [], meta: {
          pagination: {
            total: 0,
            page: 1,
            pageSize: 10,
            pageCount: 0
          }
        } };
      }
    },
    [JSON.stringify(input)],
    {
      revalidate: 3600,
      tags: ["tasks"],
    },
  )();
}
