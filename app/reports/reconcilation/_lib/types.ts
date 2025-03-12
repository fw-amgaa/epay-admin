export type ReconcilationApiResponse = {
  res: "ok" | "error";
  data: {
    data: {
      debit_count: string;
      credit_count: string;
      debit_amount: number;
      credit_amount: number;
      is_approved: false;
    }[];
    operatorCode: string;
  }[];
};
