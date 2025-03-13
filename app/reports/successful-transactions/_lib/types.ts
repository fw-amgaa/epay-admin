export type SuccessfulTransactionsApiResponse = {
  res: "ok" | "error";
  data: {
    total_data: {
      debit_count: string;
      credit_count: string;
      debit_amount: number;
      credit_amount: number;
    };
    data: {
      transaction_day: string;
      debit_count: string;
      credit_count: string;
      debit_amount: number;
      credit_amount: number;
    }[];
    operatorCode: string;
  }[];
};
