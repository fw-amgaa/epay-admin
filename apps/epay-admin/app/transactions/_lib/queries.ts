import 'server-only';
import { unstable_cache } from '@/lib/unstable-cache';
import { GetTransactionsParams } from './validations';
import { auth } from '@/auth';
import { TransactionListApiResponse } from './types';

export async function getTransactions(input: GetTransactionsParams): Promise<TransactionListApiResponse> {
    const session = await auth();

    console.log('input', input);

    return await unstable_cache(
        async () => {
            try {
                // const offset = (input.page - 1) * input.perPage;
                // const fromDate = input.from ? new Date(input.from) : undefined;
                // const toDate = input.to ? new Date(input.to) : undefined;
                // const advancedTable = input.flags.includes("advancedTable");

                // const advancedWhere = filterColumns({
                //   table: tasks,
                //   filters: input.filters,
                //   joinOperator: input.joinOperator,
                // });

                // const where = advancedTable
                //   ? advancedWhere
                //   : and(
                //       input.title ? ilike(tasks.title, `%${input.title}%`) : undefined,
                //       input.status.length > 0
                //         ? inArray(tasks.status, input.status)
                //         : undefined,
                //       input.priority.length > 0
                //         ? inArray(tasks.priority, input.priority)
                //         : undefined,
                //       fromDate ? gte(tasks.createdAt, fromDate) : undefined,
                //       toDate ? lte(tasks.createdAt, toDate) : undefined,
                //     );

                // const orderBy =
                //   input.sort.length > 0
                //     ? input.sort.map((item) =>
                //         item.desc ? desc(tasks[item.id]) : asc(tasks[item.id]),
                //       )
                //     : [asc(tasks.createdAt)];

                const response = await fetch(process.env.API_URL! + '/transactions', {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + session?.user.jwt,
                    },
                });

                return (await response.json()) as TransactionListApiResponse;
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
        },
        [JSON.stringify(input)],
        {
            revalidate: 3600,
            tags: ['tasks'],
        }
    )();
}
