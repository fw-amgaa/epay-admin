import { createSearchParamsCache, parseAsString } from "nuqs/server";

export const searchParamsCache = createSearchParamsCache({
  from: parseAsString.withDefault(""),
  to: parseAsString.withDefault(""),
});

export type GetDashboardParams = Awaited<
  ReturnType<typeof searchParamsCache.parse>
>;
