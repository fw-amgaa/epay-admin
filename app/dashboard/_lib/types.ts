export type DashboardApiResponse = {
  totalTransactions: number;
  matchedTransactions: number;
  unmatchedTransactions: number;
  byClients: {
    command: string;
    rowCount: number;
    oid: null;
    rows: {
      debitor_code: string;
      total_count: string;
      approved_count: string;
      total_amount: number;
      approved_amount: number;
    }[];
    fields: {
      name: string;
      tableID: number;
      columnID: number;
      dataTypeID: number;
      dataTypeSize: number;
      dataTypeModifier: number;
      format: string;
    }[];
  };
};
