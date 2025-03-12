export type NetSettlementApiResponse = {
  res: "ok" | "error";
  data: {
    operatorCode: string;
    credit_amount: number;
    debit_amount: number;
  }[];
};
