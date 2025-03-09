import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString, parseAsStringEnum } from 'nuqs/server';
import * as z from 'zod';

import { getFiltersStateParser, getSortingStateParser } from '@/lib/parsers';
import { Transaction } from './types';
import { bankOptions } from '@/lib/bank-codes';

export const searchParamsCache = createSearchParamsCache({
    flags: parseAsArrayOf(z.enum(['advancedTable', 'floatingBar'])).withDefault([]),
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    sort: getSortingStateParser<Transaction>().withDefault([{ id: 'createdAt', desc: true }]),
    title: parseAsString.withDefault(''),
    debitor_code: parseAsArrayOf(z.enum(bankOptions.map((otp) => otp.value) as [string, ...string[]])).withDefault([]),
    creditor_code: parseAsArrayOf(z.enum(bankOptions.map((otp) => otp.value) as [string, ...string[]])).withDefault([]),
    from: parseAsString.withDefault(''),
    to: parseAsString.withDefault(''),
    // advanced filter
    filters: getFiltersStateParser().withDefault([]),
    joinOperator: parseAsStringEnum(['and', 'or']).withDefault('and'),
});

export type GetTransactionsParams = Awaited<ReturnType<typeof searchParamsCache.parse>>;
