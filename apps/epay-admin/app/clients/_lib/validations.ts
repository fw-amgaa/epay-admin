import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString, parseAsStringEnum } from 'nuqs/server';
import * as z from 'zod';

import { getFiltersStateParser, getSortingStateParser } from '@/lib/parsers';
import { Client } from './types';

export const searchParamsCache = createSearchParamsCache({
    flags: parseAsArrayOf(z.enum(['advancedTable', 'floatingBar'])).withDefault([]),
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    sort: getSortingStateParser<Client>().withDefault([{ id: 'created_at', desc: true }]),
    title: parseAsString.withDefault(''),
    status: parseAsArrayOf(z.enum(['opt1', 'opt2'])).withDefault([]),
    priority: parseAsArrayOf(z.enum(['opt1', 'opt2'])).withDefault([]),
    from: parseAsString.withDefault(''),
    to: parseAsString.withDefault(''),
    // advanced filter
    filters: getFiltersStateParser().withDefault([]),
    joinOperator: parseAsStringEnum(['and', 'or']).withDefault('and'),
});
