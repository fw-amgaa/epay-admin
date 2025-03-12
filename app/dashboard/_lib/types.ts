export type DashboardApiResponse = {
  totalTransactions: number;
  matchedTransactions: number;
  unmatchedTransactions: number;
  byClients: {
    debitor_code: string;
    total_count: string;
    approved_count: string;
    total_amount: number;
    approved_amount: number;
  }[];
};
