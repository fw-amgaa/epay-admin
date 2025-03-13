export type MonthlyBillApiResponse = {
  res: "ok" | "error";
  data: {
    incoming: {
      data: {
        transaction_day: string;
        debit_count: string;
        debit_amount: number;
        fee_epay: number;
      }[];
      total: {
        total_count: string;
        total_amount: number;
        total_fee: number;
      }[];
    };
    outgoing: {
      data: {
        transaction_day: string;
        creditor_count: string;
        creditor_amount: number;
        fee_epay: number;
      }[];
      total: {
        total_count: string;
        total_amount: number;
        total_fee: number;
      }[];
    };
    operatorCode: string;
  }[];
};
